
-- First, let's clean up and recreate the test users with all required auth fields
DELETE FROM auth.users WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');
DELETE FROM public.profiles WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');

-- Create admin user with all required auth fields properly set
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    raw_user_meta_data,
    user_meta_data,
    is_super_admin,
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
    '',
    '',
    '',
    '',
    '{"full_name": "Admin User", "role": "admin"}',
    '{"full_name": "Admin User", "role": "admin"}',
    false,
    'authenticated',
    'authenticated'
);

-- Create teacher user with all required auth fields properly set
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    raw_user_meta_data,
    user_meta_data,
    is_super_admin,
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
    '',
    '',
    '',
    '',
    '{"full_name": "Teacher User", "role": "teacher"}',
    '{"full_name": "Teacher User", "role": "teacher"}',
    false,
    'authenticated',
    'authenticated'
);

-- Create parent user with all required auth fields properly set
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    raw_user_meta_data,
    user_meta_data,
    is_super_admin,
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
    '',
    '',
    '',
    '',
    '{"full_name": "Parent User", "role": "parent"}',
    '{"full_name": "Parent User", "role": "parent"}',
    false,
    'authenticated',
    'authenticated'
);

-- Ensure profiles exist with correct data
INSERT INTO public.profiles (id, email, full_name, role) VALUES
('aaaaaaaa-bbbb-cccc-dddd-111111111111', 'admin@edumanage.com', 'Admin User', 'admin'),
('bbbbbbbb-cccc-dddd-eeee-222222222222', 'teacher@edumanage.com', 'Teacher User', 'teacher'),
('cccccccc-dddd-eeee-ffff-333333333333', 'parent@edumanage.com', 'Parent User', 'parent')
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;
