-- Create test accounts for debugging
-- Note: These are test accounts with simple passwords for debugging purposes

-- Insert test users into auth.users (this will trigger the profile creation)
-- Admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  confirmation_token,
  email_change_confirm_status,
  last_sign_in_at
) VALUES (
  'aaaaaaaa-bbbb-cccc-dddd-111111111111',
  'admin@edumanage.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Admin User", "role": "admin"}',
  '',
  0,
  now()
);

-- Teacher user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  confirmation_token,
  email_change_confirm_status,
  last_sign_in_at
) VALUES (
  'bbbbbbbb-cccc-dddd-eeee-222222222222',
  'teacher@edumanage.com',
  crypt('teacher123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Teacher User", "role": "teacher"}',
  '',
  0,
  now()
);

-- Parent user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  confirmation_token,
  email_change_confirm_status,
  last_sign_in_at
) VALUES (
  'cccccccc-dddd-eeee-ffff-333333333333',
  'parent@edumanage.com',
  crypt('parent123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Parent User", "role": "parent"}',
  '',
  0,
  now()
);

-- Create profiles for the test users (in case the trigger doesn't work)
INSERT INTO public.profiles (id, email, full_name, role) VALUES
('aaaaaaaa-bbbb-cccc-dddd-111111111111', 'admin@edumanage.com', 'Admin User', 'admin'),
('bbbbbbbb-cccc-dddd-eeee-222222222222', 'teacher@edumanage.com', 'Teacher User', 'teacher'),
('cccccccc-dddd-eeee-ffff-333333333333', 'parent@edumanage.com', 'Parent User', 'parent')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;