-- Fix auth schema issue by properly setting all required fields for test users
-- First, clean up existing test users completely
DELETE FROM public.profiles WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');
DELETE FROM auth.users WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');

-- Create admin user with ALL required auth fields properly set
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
    raw_app_meta_data,
    is_super_admin,
    aud,
    role,
    confirmation_sent_at,
    recovery_sent_at,
    email_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    is_sso_user,
    deleted_at,
    confirmed_at,
    is_anonymous
) VALUES (
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'admin@edumanage.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '{"full_name": "Admin User", "role": "admin"}',
    '{"provider": "email", "providers": ["email"]}',
    false,
    'authenticated',
    'authenticated',
    now(),
    now(),
    now(),
    '', -- Empty string instead of NULL
    0,
    null,
    false,
    null,
    now(),
    false
);

-- Create teacher user with ALL required auth fields properly set
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
    raw_app_meta_data,
    is_super_admin,
    aud,
    role,
    confirmation_sent_at,
    recovery_sent_at,
    email_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    is_sso_user,
    deleted_at,
    confirmed_at,
    is_anonymous
) VALUES (
    'bbbbbbbb-cccc-dddd-eeee-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'teacher@edumanage.com',
    crypt('teacher123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '{"full_name": "Teacher User", "role": "teacher"}',
    '{"provider": "email", "providers": ["email"]}',
    false,
    'authenticated',
    'authenticated',
    now(),
    now(),
    now(),
    '', -- Empty string instead of NULL
    0,
    null,
    false,
    null,
    now(),
    false
);

-- Create parent user with ALL required auth fields properly set
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
    raw_app_meta_data,
    is_super_admin,
    aud,
    role,
    confirmation_sent_at,
    recovery_sent_at,
    email_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    is_sso_user,
    deleted_at,
    confirmed_at,
    is_anonymous
) VALUES (
    'cccccccc-dddd-eeee-ffff-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'parent@edumanage.com',
    crypt('parent123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '', -- Empty string instead of NULL
    '{"full_name": "Parent User", "role": "parent"}',
    '{"provider": "email", "providers": ["email"]}',
    false,
    'authenticated',
    'authenticated',
    now(),
    now(),
    now(),
    '', -- Empty string instead of NULL
    0,
    null,
    false,
    null,
    now(),
    false
);

-- Ensure profiles exist for all test users
INSERT INTO public.profiles (id, email, full_name, role) VALUES
('aaaaaaaa-bbbb-cccc-dddd-111111111111', 'admin@edumanage.com', 'Admin User', 'admin'),
('bbbbbbbb-cccc-dddd-eeee-222222222222', 'teacher@edumanage.com', 'Teacher User', 'teacher'),
('cccccccc-dddd-eeee-ffff-333333333333', 'parent@edumanage.com', 'Parent User', 'parent')
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;