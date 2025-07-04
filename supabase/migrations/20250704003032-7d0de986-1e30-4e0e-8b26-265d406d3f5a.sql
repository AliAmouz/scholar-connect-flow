
-- First, let's ensure we can properly link parents to students
-- Add a parent_email field to students table for easier parent-student matching
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS parent_email TEXT;

-- Create a function to link parents to students after account creation
CREATE OR REPLACE FUNCTION public.link_parent_to_students(parent_user_id UUID, parent_email_address TEXT)
RETURNS void AS $$
BEGIN
  -- Update students table to link parent_id where parent_email matches
  UPDATE public.students 
  SET parent_id = parent_user_id
  WHERE parent_email = parent_email_address AND parent_id IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get students by parent email (for verification during signup)
CREATE OR REPLACE FUNCTION public.get_students_by_parent_email(email_address TEXT)
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  grade_level INTEGER,
  status student_status
) AS $$
BEGIN
  RETURN QUERY
  SELECT s.id, s.first_name, s.last_name, s.grade_level, s.status
  FROM public.students s
  WHERE s.parent_email = email_address AND s.parent_id IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
