
-- Drop existing trigger and function to recreate them properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the function with better error handling and logging
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Log the trigger execution
  RAISE LOG 'Creating profile for user: %', NEW.id;
  RAISE LOG 'User metadata: %', NEW.raw_user_meta_data;
  
  -- Insert profile with explicit role handling
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    CASE 
      WHEN NEW.raw_user_meta_data ->> 'role' = 'admin' THEN 'admin'::user_role
      WHEN NEW.raw_user_meta_data ->> 'role' = 'teacher' THEN 'teacher'::user_role
      WHEN NEW.raw_user_meta_data ->> 'role' = 'parent' THEN 'parent'::user_role
      ELSE 'parent'::user_role
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    role = EXCLUDED.role,
    updated_at = NOW();
    
  RAISE LOG 'Profile created successfully for user: %', NEW.id;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    -- Don't block the signup process even if profile creation fails
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the get_user_role function to handle missing profiles better
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
    INSERT INTO public.profiles (id, role, email)
    VALUES (user_uuid, 'parent'::user_role, (SELECT email FROM auth.users WHERE id = user_uuid))
    ON CONFLICT (id) DO UPDATE SET role = COALESCE(profiles.role, 'parent'::user_role);
    
    RETURN 'parent'::user_role;
  END IF;
  
  RETURN user_role_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create a function to manually create profiles for existing users (if needed)
CREATE OR REPLACE FUNCTION public.create_missing_profiles()
RETURNS void AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  SELECT 
    u.id,
    u.email,
    COALESCE(u.raw_user_meta_data ->> 'full_name', ''),
    CASE 
      WHEN u.raw_user_meta_data ->> 'role' = 'admin' THEN 'admin'::user_role
      WHEN u.raw_user_meta_data ->> 'role' = 'teacher' THEN 'teacher'::user_role
      WHEN u.raw_user_meta_data ->> 'role' = 'parent' THEN 'parent'::user_role
      ELSE 'parent'::user_role
    END
  FROM auth.users u
  LEFT JOIN public.profiles p ON u.id = p.id
  WHERE p.id IS NULL
  ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Run the function to create profiles for any existing users
SELECT public.create_missing_profiles();
