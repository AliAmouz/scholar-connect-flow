
-- Update the profiles table to ensure role is not nullable and has proper constraints
ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'parent'::user_role;

-- Create an index on the role column for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Update the handle_new_user function to ensure proper role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''),
    COALESCE((new.raw_user_meta_data ->> 'role')::user_role, 'parent'::user_role)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = NOW();
  RETURN new;
END;
$$;

-- Create a function to get user role that handles edge cases
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID DEFAULT auth.uid())
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
  
  -- If no profile exists, create one with default role
  IF user_role_result IS NULL THEN
    INSERT INTO public.profiles (id, role)
    VALUES (user_uuid, 'parent'::user_role)
    ON CONFLICT (id) DO UPDATE SET role = COALESCE(profiles.role, 'parent'::user_role);
    
    RETURN 'parent'::user_role;
  END IF;
  
  RETURN user_role_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Update the get_current_user_role function to use the new function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT public.get_user_role(auth.uid());
$$ LANGUAGE SQL SECURITY DEFINER STABLE;
