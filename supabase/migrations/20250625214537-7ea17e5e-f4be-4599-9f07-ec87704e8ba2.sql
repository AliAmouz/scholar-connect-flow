
-- Create enum types for roles and other status fields
CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'parent');
CREATE TYPE student_status AS ENUM ('active', 'inactive', 'graduated');
CREATE TYPE class_status AS ENUM ('active', 'completed', 'scheduled');
CREATE TYPE alert_type AS ENUM ('absence', 'late', 'behavior', 'academic', 'general');
CREATE TYPE alert_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Fix the profiles table role column
ALTER TABLE public.profiles ALTER COLUMN role DROP DEFAULT;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ALTER COLUMN role TYPE user_role USING role::user_role;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'parent'::user_role;

-- Students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  date_of_birth DATE,
  grade_level INTEGER,
  parent_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status student_status DEFAULT 'active',
  enrollment_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subject TEXT,
  hire_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  grade_level INTEGER,
  room_number TEXT,
  schedule TEXT,
  capacity INTEGER DEFAULT 30,
  status class_status DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student-Class enrollment junction table
CREATE TABLE public.student_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  grade DECIMAL(3,2),
  attendance_rate DECIMAL(5,2) DEFAULT 100.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, class_id)
);

-- Attendance tracking table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  present BOOLEAN DEFAULT false,
  late BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, class_id, date)
);

-- Alerts/notifications table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  alert_type alert_type NOT NULL,
  priority alert_priority DEFAULT 'medium',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for students table
CREATE POLICY "Admins can view all students" ON public.students
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Teachers can view students in their classes" ON public.students
  FOR SELECT USING (
    public.get_current_user_role() = 'teacher' AND
    EXISTS (
      SELECT 1 FROM public.student_classes sc
      JOIN public.classes c ON sc.class_id = c.id
      JOIN public.teachers t ON c.teacher_id = t.id
      WHERE sc.student_id = students.id AND t.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their own children" ON public.students
  FOR SELECT USING (parent_id = auth.uid());

CREATE POLICY "Admins can insert students" ON public.students
  FOR INSERT WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can update students" ON public.students
  FOR UPDATE USING (public.get_current_user_role() = 'admin');

-- RLS Policies for teachers table
CREATE POLICY "Everyone can view teachers" ON public.teachers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage teachers" ON public.teachers
  FOR ALL USING (public.get_current_user_role() = 'admin');

-- RLS Policies for classes table
CREATE POLICY "Everyone can view classes" ON public.classes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and assigned teachers can manage classes" ON public.classes
  FOR ALL USING (
    public.get_current_user_role() = 'admin' OR
    (public.get_current_user_role() = 'teacher' AND 
     EXISTS (SELECT 1 FROM public.teachers WHERE user_id = auth.uid() AND id = classes.teacher_id))
  );

-- RLS Policies for student_classes table
CREATE POLICY "Admins can view all enrollments" ON public.student_classes
  FOR SELECT USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Teachers can view their class enrollments" ON public.student_classes
  FOR SELECT USING (
    public.get_current_user_role() = 'teacher' AND
    EXISTS (
      SELECT 1 FROM public.classes c
      JOIN public.teachers t ON c.teacher_id = t.id
      WHERE c.id = student_classes.class_id AND t.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their children's enrollments" ON public.student_classes
  FOR SELECT USING (
    public.get_current_user_role() = 'parent' AND
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_classes.student_id AND s.parent_id = auth.uid()
    )
  );

-- RLS Policies for attendance table
CREATE POLICY "Admins can manage all attendance" ON public.attendance
  FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Teachers can manage attendance for their classes" ON public.attendance
  FOR ALL USING (
    public.get_current_user_role() = 'teacher' AND
    EXISTS (
      SELECT 1 FROM public.classes c
      JOIN public.teachers t ON c.teacher_id = t.id
      WHERE c.id = attendance.class_id AND t.user_id = auth.uid()
    )
  );

-- RLS Policies for alerts table
CREATE POLICY "Admins can manage all alerts" ON public.alerts
  FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Teachers can manage alerts for their students" ON public.alerts
  FOR ALL USING (
    public.get_current_user_role() = 'teacher' AND
    EXISTS (
      SELECT 1 FROM public.teachers WHERE user_id = auth.uid() AND id = alerts.teacher_id
    )
  );

CREATE POLICY "Parents can view alerts for their children" ON public.alerts
  FOR SELECT USING (
    public.get_current_user_role() = 'parent' AND
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = alerts.student_id AND s.parent_id = auth.uid()
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON public.alerts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for tables that need live updates
ALTER TABLE public.students REPLICA IDENTITY FULL;
ALTER TABLE public.teachers REPLICA IDENTITY FULL;
ALTER TABLE public.classes REPLICA IDENTITY FULL;
ALTER TABLE public.student_classes REPLICA IDENTITY FULL;
ALTER TABLE public.attendance REPLICA IDENTITY FULL;
ALTER TABLE public.alerts REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.teachers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.classes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_classes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
