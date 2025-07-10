-- Recreate only the missing RLS policies that were dropped

-- Students table policies (missing)
CREATE POLICY "Admins can view all students" 
ON public.students 
FOR SELECT 
USING (get_current_user_role() = 'admin'::user_role);

CREATE POLICY "Teachers can view students in their classes" 
ON public.students 
FOR SELECT 
USING ((get_current_user_role() = 'teacher'::user_role) AND (EXISTS ( SELECT 1
   FROM ((student_classes sc
     JOIN classes c ON ((sc.class_id = c.id)))
     JOIN teachers t ON ((c.teacher_id = t.id)))
  WHERE ((sc.student_id = students.id) AND (t.user_id = auth.uid())))));

CREATE POLICY "Admins can insert students" 
ON public.students 
FOR INSERT 
WITH CHECK (get_current_user_role() = 'admin'::user_role);

CREATE POLICY "Admins can update students" 
ON public.students 
FOR UPDATE 
USING (get_current_user_role() = 'admin'::user_role);

-- Teachers table policies (missing)
CREATE POLICY "Admins can manage teachers" 
ON public.teachers 
FOR ALL 
USING (get_current_user_role() = 'admin'::user_role);

-- Classes table policies (missing)
CREATE POLICY "Admins and assigned teachers can manage classes" 
ON public.classes 
FOR ALL 
USING ((get_current_user_role() = 'admin'::user_role) OR ((get_current_user_role() = 'teacher'::user_role) AND (EXISTS ( SELECT 1
   FROM teachers
  WHERE ((teachers.user_id = auth.uid()) AND (teachers.id = classes.teacher_id))))));

-- Student classes table policies (missing - all of them)
CREATE POLICY "Admins can view all enrollments" 
ON public.student_classes 
FOR SELECT 
USING (get_current_user_role() = 'admin'::user_role);

CREATE POLICY "Teachers can view their class enrollments" 
ON public.student_classes 
FOR SELECT 
USING ((get_current_user_role() = 'teacher'::user_role) AND (EXISTS ( SELECT 1
   FROM (classes c
     JOIN teachers t ON ((c.teacher_id = t.id)))
  WHERE ((c.id = student_classes.class_id) AND (t.user_id = auth.uid())))));

CREATE POLICY "Parents can view their children's enrollments" 
ON public.student_classes 
FOR SELECT 
USING ((get_current_user_role() = 'parent'::user_role) AND (EXISTS ( SELECT 1
   FROM students s
  WHERE ((s.id = student_classes.student_id) AND (s.parent_id = auth.uid())))));

-- Attendance table policies (missing - all of them)
CREATE POLICY "Admins can manage all attendance" 
ON public.attendance 
FOR ALL 
USING (get_current_user_role() = 'admin'::user_role);

CREATE POLICY "Teachers can manage attendance for their classes" 
ON public.attendance 
FOR ALL 
USING ((get_current_user_role() = 'teacher'::user_role) AND (EXISTS ( SELECT 1
   FROM (classes c
     JOIN teachers t ON ((c.teacher_id = t.id)))
  WHERE ((c.id = attendance.class_id) AND (t.user_id = auth.uid())))));

-- Alerts table policies (missing - all of them)
CREATE POLICY "Admins can manage all alerts" 
ON public.alerts 
FOR ALL 
USING (get_current_user_role() = 'admin'::user_role);

CREATE POLICY "Teachers can manage alerts for their students" 
ON public.alerts 
FOR ALL 
USING ((get_current_user_role() = 'teacher'::user_role) AND (EXISTS ( SELECT 1
   FROM teachers
  WHERE ((teachers.user_id = auth.uid()) AND (teachers.id = alerts.teacher_id)))));

CREATE POLICY "Parents can view alerts for their children" 
ON public.alerts 
FOR SELECT 
USING ((get_current_user_role() = 'parent'::user_role) AND (EXISTS ( SELECT 1
   FROM students s
  WHERE ((s.id = alerts.student_id) AND (s.parent_id = auth.uid())))));