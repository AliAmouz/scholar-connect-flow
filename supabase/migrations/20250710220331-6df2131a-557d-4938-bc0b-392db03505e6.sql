-- Fix the infinite recursion issue in RLS policies
-- Drop the existing function that might be causing issues
DROP FUNCTION IF EXISTS public.get_current_user_role();
DROP FUNCTION IF EXISTS public.get_user_role(uuid);

-- Create a simpler, more reliable function to get user role
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

-- Temporarily disable RLS on profiles to break any recursion
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS and recreate policies without recursion
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;

-- Create new, simple policies for profiles table
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);