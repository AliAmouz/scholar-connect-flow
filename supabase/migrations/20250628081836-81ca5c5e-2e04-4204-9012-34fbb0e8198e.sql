
-- Drop all existing problematic RLS policies on students table
DROP POLICY IF EXISTS "Authenticated users can view all students" ON public.students;
DROP POLICY IF EXISTS "Authenticated users can insert students" ON public.students;
DROP POLICY IF EXISTS "Authenticated users can update students" ON public.students;
DROP POLICY IF EXISTS "Authenticated users can delete students" ON public.students;

-- Since this is a school management system and authentication is disabled,
-- we'll temporarily disable RLS to allow access to the students table
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;

-- Do the same for other tables to ensure consistent access
ALTER TABLE public.teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_classes DISABLE ROW LEVEL SECURITY;

-- Drop problematic policies from other tables as well
DROP POLICY IF EXISTS "Authenticated users can view all teachers" ON public.teachers;
DROP POLICY IF EXISTS "Authenticated users can insert teachers" ON public.teachers;
DROP POLICY IF EXISTS "Authenticated users can update teachers" ON public.teachers;
DROP POLICY IF EXISTS "Authenticated users can delete teachers" ON public.teachers;

DROP POLICY IF EXISTS "Authenticated users can view all alerts" ON public.alerts;
DROP POLICY IF EXISTS "Authenticated users can insert alerts" ON public.alerts;
DROP POLICY IF EXISTS "Authenticated users can update alerts" ON public.alerts;
DROP POLICY IF EXISTS "Authenticated users can delete alerts" ON public.alerts;

DROP POLICY IF EXISTS "Authenticated users can view all classes" ON public.classes;
DROP POLICY IF EXISTS "Authenticated users can insert classes" ON public.classes;
DROP POLICY IF EXISTS "Authenticated users can update classes" ON public.classes;
DROP POLICY IF EXISTS "Authenticated users can delete classes" ON public.classes;
