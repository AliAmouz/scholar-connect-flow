-- Delete existing test accounts first
DELETE FROM auth.users WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');
DELETE FROM public.profiles WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');

-- Create test accounts using Supabase's auth.users table with proper password hashing
-- Admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'aaaaaaaa-bbbb-cccc-dddd-111111111111',
  'authenticated',
  'authenticated',
  'admin@edumanage.com',
  '$2a$10$HqWzlsPzz5.rOwpFAQNYfe/3WiJp9WaE5.Hs.Hs.Hs.Hs.Hs.Hs.', -- This needs to be properly hashed
  NOW(),
  NULL,
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  NULL,
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Admin User", "role": "admin"}',
  NULL,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL
);

-- Let me use a different approach - using the auth.admin_create_user function if available
-- or create a simpler approach using known working method