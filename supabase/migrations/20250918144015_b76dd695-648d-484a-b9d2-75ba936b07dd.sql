-- Completely disable RLS on all tables since we removed authentication
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.marks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to clean up
DROP POLICY IF EXISTS "Admins can insert students" ON public.students;
DROP POLICY IF EXISTS "Admins can update students" ON public.students;
DROP POLICY IF EXISTS "Admins can view all students" ON public.students;
DROP POLICY IF EXISTS "Parents can view their own children" ON public.students;
DROP POLICY IF EXISTS "Teachers can view students in their classes" ON public.students;

DROP POLICY IF EXISTS "Admins can manage teachers" ON public.teachers;
DROP POLICY IF EXISTS "Everyone can view teachers" ON public.teachers;

DROP POLICY IF EXISTS "Admins and assigned teachers can manage classes" ON public.classes;
DROP POLICY IF EXISTS "Everyone can view classes" ON public.classes;

DROP POLICY IF EXISTS "Admins can manage all alerts" ON public.alerts;
DROP POLICY IF EXISTS "Parents can view alerts for their children" ON public.alerts;
DROP POLICY IF EXISTS "Teachers can manage alerts for their students" ON public.alerts;

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.student_classes;
DROP POLICY IF EXISTS "Parents can view their children's enrollments" ON public.student_classes;
DROP POLICY IF EXISTS "Teachers can view their class enrollments" ON public.student_classes;

DROP POLICY IF EXISTS "Admins can manage all attendance" ON public.attendance;
DROP POLICY IF EXISTS "Teachers can manage attendance for their classes" ON public.attendance;

DROP POLICY IF EXISTS "Parents can view their children's marks" ON public.marks;
DROP POLICY IF EXISTS "Teachers can manage marks for their students" ON public.marks;

DROP POLICY IF EXISTS "Admins can manage all payments" ON public.payments;
DROP POLICY IF EXISTS "Parents can view their children's payments" ON public.payments;

DROP POLICY IF EXISTS "Admins can manage all services" ON public.services;
DROP POLICY IF EXISTS "Parents can update their children's services" ON public.services;
DROP POLICY IF EXISTS "Parents can view their children's services" ON public.services;

DROP POLICY IF EXISTS "Admins can manage announcements" ON public.announcements;
DROP POLICY IF EXISTS "Everyone can view announcements" ON public.announcements;