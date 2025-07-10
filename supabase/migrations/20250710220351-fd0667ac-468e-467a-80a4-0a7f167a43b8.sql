-- Fix the infinite recursion issue by recreating the function properly
-- Drop the existing function with CASCADE to remove dependencies
DROP FUNCTION IF EXISTS public.get_current_user_role() CASCADE;
DROP FUNCTION IF EXISTS public.get_user_role(uuid) CASCADE;

-- Create a simpler, more reliable function to get user role without recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
DECLARE
  user_role_result user_role;
BEGIN
  -- Get the role directly from profiles table without recursion
  SELECT role INTO user_role_result 
  FROM public.profiles 
  WHERE id = auth.uid();
  
  -- Return the role or default to 'parent' if not found
  RETURN COALESCE(user_role_result, 'parent'::user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Recreate the get_user_role function for compatibility
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid DEFAULT auth.uid())
RETURNS user_role AS $$
DECLARE
  user_role_result user_role;
BEGIN
  IF user_uuid IS NULL THEN
    RETURN NULL;
  END IF;
  
  SELECT role INTO user_role_result 
  FROM public.profiles 
  WHERE id = user_uuid;
  
  RETURN COALESCE(user_role_result, 'parent'::user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;