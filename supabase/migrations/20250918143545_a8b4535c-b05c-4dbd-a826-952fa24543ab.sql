-- Remove foreign key constraint from profiles table since we removed auth
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Clear all existing data first
TRUNCATE TABLE student_classes, attendance, alerts, marks, payments, services, announcements CASCADE;
DELETE FROM students;
DELETE FROM teachers;
DELETE FROM classes;
DELETE FROM profiles;

-- Insert comprehensive teacher data
INSERT INTO teachers (first_name, last_name, email, subject, hire_date) VALUES
('Sarah', 'Johnson', 'sarah.johnson@school.edu', 'Mathematics', '2020-08-15'),
('Michael', 'Davis', 'michael.davis@school.edu', 'English Literature', '2019-01-10'),
('Emma', 'Wilson', 'emma.wilson@school.edu', 'Science', '2021-09-01'),
('James', 'Brown', 'james.brown@school.edu', 'History', '2018-08-20'),
('Lisa', 'Garcia', 'lisa.garcia@school.edu', 'Art', '2022-01-15'),
('David', 'Martinez', 'david.martinez@school.edu', 'Physical Education', '2020-03-01'),
('Rachel', 'Anderson', 'rachel.anderson@school.edu', 'Music', '2019-08-25'),
('Robert', 'Taylor', 'robert.taylor@school.edu', 'Computer Science', '2021-02-10'),
('Jennifer', 'White', 'jennifer.white@school.edu', 'French', '2020-09-12'),
('Christopher', 'Miller', 'christopher.miller@school.edu', 'Chemistry', '2019-03-18');

-- Insert parent profiles
INSERT INTO profiles (id, email, full_name, role) VALUES
(gen_random_uuid(), 'john.smith@email.com', 'John Smith', 'parent'),
(gen_random_uuid(), 'mary.johnson@email.com', 'Mary Johnson', 'parent'),
(gen_random_uuid(), 'david.williams@email.com', 'David Williams', 'parent'),
(gen_random_uuid(), 'susan.brown@email.com', 'Susan Brown', 'parent'),
(gen_random_uuid(), 'michael.davis@email.com', 'Michael Davis', 'parent'),
(gen_random_uuid(), 'jennifer.garcia@email.com', 'Jennifer Garcia', 'parent'),
(gen_random_uuid(), 'christopher.martinez@email.com', 'Christopher Martinez', 'parent'),
(gen_random_uuid(), 'amanda.anderson@email.com', 'Amanda Anderson', 'parent'),
(gen_random_uuid(), 'daniel.taylor@email.com', 'Daniel Taylor', 'parent'),
(gen_random_uuid(), 'rebecca.wilson@email.com', 'Rebecca Wilson', 'parent'),
(gen_random_uuid(), 'admin@edumanage.com', 'Admin User', 'admin');

-- Insert comprehensive student data
INSERT INTO students (first_name, last_name, email, date_of_birth, grade_level, parent_email, status, enrollment_date) VALUES
('Alex', 'Smith', 'alex.smith@student.edu', '2010-03-15', 8, 'john.smith@email.com', 'active', '2023-08-15'),
('Emily', 'Johnson', 'emily.johnson@student.edu', '2011-07-22', 7, 'mary.johnson@email.com', 'active', '2023-08-15'),
('Ryan', 'Williams', 'ryan.williams@student.edu', '2009-11-08', 9, 'david.williams@email.com', 'active', '2023-08-15'),
('Sophia', 'Brown', 'sophia.brown@student.edu', '2012-01-30', 6, 'susan.brown@email.com', 'active', '2023-08-15'),
('Ethan', 'Davis', 'ethan.davis@student.edu', '2010-09-12', 8, 'michael.davis@email.com', 'active', '2023-08-15'),
('Isabella', 'Garcia', 'isabella.garcia@student.edu', '2011-04-18', 7, 'jennifer.garcia@email.com', 'active', '2023-08-15'),
('Mason', 'Martinez', 'mason.martinez@student.edu', '2008-12-05', 10, 'christopher.martinez@email.com', 'active', '2023-08-15'),
('Olivia', 'Anderson', 'olivia.anderson@student.edu', '2013-06-25', 5, 'amanda.anderson@email.com', 'active', '2023-08-15'),
('Noah', 'Smith', 'noah.smith@student.edu', '2012-08-14', 6, 'john.smith@email.com', 'active', '2023-08-15'),
('Ava', 'Johnson', 'ava.johnson@student.edu', '2009-02-20', 9, 'mary.johnson@email.com', 'active', '2023-08-15'),
('Liam', 'Taylor', 'liam.taylor@student.edu', '2011-11-30', 7, 'daniel.taylor@email.com', 'active', '2023-08-15'),
('Mia', 'Wilson', 'mia.wilson@student.edu', '2010-05-16', 8, 'rebecca.wilson@email.com', 'active', '2023-08-15'),
('Lucas', 'Brown', 'lucas.brown@student.edu', '2013-01-08', 5, 'susan.brown@email.com', 'active', '2023-08-15'),
('Charlotte', 'Davis', 'charlotte.davis@student.edu', '2009-09-22', 9, 'michael.davis@email.com', 'active', '2023-08-15'),
('Benjamin', 'Garcia', 'benjamin.garcia@student.edu', '2012-12-03', 6, 'jennifer.garcia@email.com', 'active', '2023-08-15'),
('Grace', 'Miller', 'grace.miller@student.edu', '2011-08-19', 7, 'christopher.martinez@email.com', 'active', '2023-08-15'),
('Owen', 'Anderson', 'owen.anderson@student.edu', '2010-10-11', 8, 'amanda.anderson@email.com', 'active', '2023-08-15'),
('Zoe', 'Taylor', 'zoe.taylor@student.edu', '2013-03-26', 5, 'daniel.taylor@email.com', 'active', '2023-08-15'),
('Caleb', 'Wilson', 'caleb.wilson@student.edu', '2009-06-14', 9, 'rebecca.wilson@email.com', 'active', '2023-08-15'),
('Hannah', 'Smith', 'hannah.smith@student.edu', '2014-01-07', 4, 'john.smith@email.com', 'active', '2023-08-15');

-- Insert classes with teacher assignments
INSERT INTO classes (name, subject, teacher_id, grade_level, room_number, schedule, capacity, status) VALUES
('Algebra I', 'Mathematics', (SELECT id FROM teachers WHERE email = 'sarah.johnson@school.edu'), 8, '101', 'MWF 9:00-10:00', 25, 'active'),
('Geometry', 'Mathematics', (SELECT id FROM teachers WHERE email = 'sarah.johnson@school.edu'), 9, '101', 'MWF 10:00-11:00', 25, 'active'),
('English Literature', 'English Literature', (SELECT id FROM teachers WHERE email = 'michael.davis@school.edu'), 9, '201', 'TTH 10:00-11:30', 30, 'active'),
('Creative Writing', 'English Literature', (SELECT id FROM teachers WHERE email = 'michael.davis@school.edu'), 8, '201', 'TTH 1:00-2:30', 25, 'active'),
('Biology', 'Science', (SELECT id FROM teachers WHERE email = 'emma.wilson@school.edu'), 10, '301', 'MWF 11:00-12:00', 20, 'active'),
('Physics', 'Science', (SELECT id FROM teachers WHERE email = 'emma.wilson@school.edu'), 9, '301', 'TTH 11:00-12:30', 22, 'active'),
('World History', 'History', (SELECT id FROM teachers WHERE email = 'james.brown@school.edu'), 7, '102', 'TTH 1:00-2:30', 28, 'active'),
('US History', 'History', (SELECT id FROM teachers WHERE email = 'james.brown@school.edu'), 8, '102', 'MWF 1:00-2:00', 25, 'active'),
('Art Studio', 'Art', (SELECT id FROM teachers WHERE email = 'lisa.garcia@school.edu'), 6, '401', 'MWF 2:00-3:00', 15, 'active'),
('Digital Art', 'Art', (SELECT id FROM teachers WHERE email = 'lisa.garcia@school.edu'), 8, '401', 'TTH 2:00-3:30', 18, 'active'),
('Physical Education', 'Physical Education', (SELECT id FROM teachers WHERE email = 'david.martinez@school.edu'), 8, 'GYM', 'Daily 3:00-4:00', 35, 'active'),
('Music Theory', 'Music', (SELECT id FROM teachers WHERE email = 'rachel.anderson@school.edu'), 7, '501', 'TTH 9:00-10:30', 20, 'active'),
('Band', 'Music', (SELECT id FROM teachers WHERE email = 'rachel.anderson@school.edu'), 9, '501', 'MWF 12:00-1:00', 25, 'active'),
('Programming Basics', 'Computer Science', (SELECT id FROM teachers WHERE email = 'robert.taylor@school.edu'), 9, '601', 'MWF 1:00-2:00', 22, 'active'),
('Web Development', 'Computer Science', (SELECT id FROM teachers WHERE email = 'robert.taylor@school.edu'), 10, '601', 'TTH 1:00-2:30', 20, 'active'),
('French I', 'French', (SELECT id FROM teachers WHERE email = 'jennifer.white@school.edu'), 6, '202', 'TTH 2:00-3:30', 25, 'active'),
('French II', 'French', (SELECT id FROM teachers WHERE email = 'jennifer.white@school.edu'), 7, '202', 'MWF 2:00-3:00', 22, 'active'),
('Chemistry', 'Chemistry', (SELECT id FROM teachers WHERE email = 'christopher.miller@school.edu'), 10, '302', 'MWF 10:00-11:00', 18, 'active');

-- Insert announcements
INSERT INTO announcements (title, content, priority, expires_at) VALUES
('Parent-Teacher Conference', 'Parent-teacher conferences are scheduled for March 15-17. Please sign up for your preferred time slot through the parent portal.', 'high', '2024-03-20'),
('Spring Break Notice', 'School will be closed from March 25-29 for Spring Break. Classes resume on April 1st.', 'normal', '2024-03-30'),
('New Computer Lab Opening', 'We are excited to announce the opening of our new computer lab with state-of-the-art equipment! Programming and computer science classes will now have access to cutting-edge technology.', 'normal', '2024-04-15'),
('Graduation Ceremony', 'The graduation ceremony for our 10th-grade students will be held on June 15th at 2:00 PM in the main auditorium. Families are invited to celebrate this milestone.', 'high', '2024-06-20'),
('Science Fair Registration', 'Registration for the annual science fair is now open! Students from grades 6-10 can participate. Registration deadline is February 28th.', 'normal', '2024-03-01'),
('Art Exhibition', 'Our student art exhibition "Young Creators" will be held in the main gallery from April 10-20. Come see the amazing work of our talented artists!', 'normal', '2024-04-25'),
('Sports Day', 'Annual sports day will be held on May 10th. All students are encouraged to participate in various athletic events.', 'normal', '2024-05-15'),
('Library Renovation', 'The library will be closed for renovation from April 1-15. Temporary study areas are available in the cafeteria.', 'high', '2024-04-16');