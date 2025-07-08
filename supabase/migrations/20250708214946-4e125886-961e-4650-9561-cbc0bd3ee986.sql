-- Create a function to properly hash passwords and create test users
CREATE OR REPLACE FUNCTION create_test_users()
RETURNS void AS $$
BEGIN
  -- Clean up any existing test accounts
  DELETE FROM public.profiles WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');
  DELETE FROM auth.users WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');
  
  -- Create admin user with properly hashed password for 'admin123'
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'admin@edumanage.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"full_name": "Admin User", "role": "admin"}',
    'authenticated',
    'authenticated'
  );
  
  -- Create teacher user with properly hashed password for 'teacher123'
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    'bbbbbbbb-cccc-dddd-eeee-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'teacher@edumanage.com',
    crypt('teacher123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"full_name": "Teacher User", "role": "teacher"}',
    'authenticated',
    'authenticated'
  );
  
  -- Create parent user with properly hashed password for 'parent123'
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    'cccccccc-dddd-eeee-ffff-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'parent@edumanage.com',
    crypt('parent123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"full_name": "Parent User", "role": "parent"}',
    'authenticated',
    'authenticated'
  );
  
  -- Ensure profiles exist (the trigger should create them, but just in case)
  INSERT INTO public.profiles (id, email, full_name, role) VALUES
  ('aaaaaaaa-bbbb-cccc-dddd-111111111111', 'admin@edumanage.com', 'Admin User', 'admin'),
  ('bbbbbbbb-cccc-dddd-eeee-222222222222', 'teacher@edumanage.com', 'Teacher User', 'teacher'),
  ('cccccccc-dddd-eeee-ffff-333333333333', 'parent@edumanage.com', 'Parent User', 'parent')
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute the function to create the test users
SELECT create_test_users();