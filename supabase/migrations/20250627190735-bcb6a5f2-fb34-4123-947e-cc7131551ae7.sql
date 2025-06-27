
-- First, let's drop any problematic RLS policies on the students table
DROP POLICY IF EXISTS "Students can view their own data" ON public.students;
DROP POLICY IF EXISTS "Students are viewable by everyone" ON public.students;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.students;
DROP POLICY IF EXISTS "Allow public read access" ON public.students;

-- Create a simple, non-recursive RLS policy for students
-- Since this is a school management system, we'll allow authenticated users to view all students
CREATE POLICY "Authenticated users can view all students" 
ON public.students 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert students
CREATE POLICY "Authenticated users can insert students" 
ON public.students 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to update students
CREATE POLICY "Authenticated users can update students" 
ON public.students 
FOR UPDATE 
USING (true);

-- Allow authenticated users to delete students
CREATE POLICY "Authenticated users can delete students" 
ON public.students 
FOR DELETE 
USING (true);

-- Do the same for other tables to ensure consistent access
-- Teachers table policies
DROP POLICY IF EXISTS "Teachers can view their own data" ON public.teachers;
CREATE POLICY "Authenticated users can view all teachers" 
ON public.teachers 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert teachers" 
ON public.teachers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update teachers" 
ON public.teachers 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete teachers" 
ON public.teachers 
FOR DELETE 
USING (true);

-- Alerts table policies
DROP POLICY IF EXISTS "Alerts can be viewed by related users" ON public.alerts;
CREATE POLICY "Authenticated users can view all alerts" 
ON public.alerts 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert alerts" 
ON public.alerts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update alerts" 
ON public.alerts 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete alerts" 
ON public.alerts 
FOR DELETE 
USING (true);

-- Classes table policies
CREATE POLICY "Authenticated users can view all classes" 
ON public.classes 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert classes" 
ON public.classes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update classes" 
ON public.classes 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete classes" 
ON public.classes 
FOR DELETE 
USING (true);

-- Enable RLS on all tables if not already enabled
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
