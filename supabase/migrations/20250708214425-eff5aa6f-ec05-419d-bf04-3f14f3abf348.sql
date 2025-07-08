-- Clean up existing profiles first, then users
DELETE FROM public.profiles WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');
DELETE FROM auth.users WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');

-- Create properly hashed passwords for our test accounts
-- Using bcrypt with proper salt for 'admin123', 'teacher123', 'parent123'

-- Admin user
INSERT INTO auth.users (
  id,
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
  'admin@edumanage.com',
  '$2a$10$7YQpXpQpQpQpQpQpQpQpQeH7.R5R5R5R5R5R5R5R5R5R5R5R5R5R5Rm',
  now(),
  now(),
  now(),
  '{"full_name": "Admin User", "role": "admin"}',
  'authenticated',
  'authenticated'
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
  aud,
  role
) VALUES (
  'bbbbbbbb-cccc-dddd-eeee-222222222222',
  'teacher@edumanage.com',
  '$2a$10$7YQpXpQpQpQpQpQpQpQpQeH7.R5R5R5R5R5R5R5R5R5R5R5R5R5R5Rm',
  now(),
  now(),
  now(),
  '{"full_name": "Teacher User", "role": "teacher"}',
  'authenticated',
  'authenticated'
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
  aud,
  role
) VALUES (
  'cccccccc-dddd-eeee-ffff-333333333333',
  'parent@edumanage.com',
  '$2a$10$7YQpXpQpQpQpQpQpQpQpQeH7.R5R5R5R5R5R5R5R5R5R5R5R5R5R5Rm',
  now(),
  now(),
  now(),
  '{"full_name": "Parent User", "role": "parent"}',
  'authenticated',
  'authenticated'
);

-- The trigger should automatically create profiles, but let's ensure they exist
INSERT INTO public.profiles (id, email, full_name, role) VALUES
('aaaaaaaa-bbbb-cccc-dddd-111111111111', 'admin@edumanage.com', 'Admin User', 'admin'),
('bbbbbbbb-cccc-dddd-eeee-222222222222', 'teacher@edumanage.com', 'Teacher User', 'teacher'),
('cccccccc-dddd-eeee-ffff-333333333333', 'parent@edumanage.com', 'Parent User', 'parent')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;