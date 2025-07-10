-- Temporarily disable RLS on all tables to isolate the schema error
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts DISABLE ROW LEVEL SECURITY;

-- Test if the accounts exist and are properly configured
SELECT email, email_confirmed_at, created_at FROM auth.users 
WHERE email IN ('admin@edumanage.com', 'teacher@edumanage.com', 'parent@edumanage.com');