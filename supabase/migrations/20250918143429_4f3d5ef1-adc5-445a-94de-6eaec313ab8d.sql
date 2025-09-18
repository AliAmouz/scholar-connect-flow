-- Clear existing data to start fresh
TRUNCATE TABLE student_classes, attendance, alerts, marks, payments, services, announcements CASCADE;
DELETE FROM students;
DELETE FROM teachers;
DELETE FROM classes;
DELETE FROM profiles WHERE role != 'admin';

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

-- Insert parent profiles using gen_random_uuid()
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
(gen_random_uuid(), 'rebecca.wilson@email.com', 'Rebecca Wilson', 'parent');

-- Insert comprehensive student data with parent relationships
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
('Benjamin', 'Garcia', 'benjamin.garcia@student.edu', '2012-12-03', 6, 'jennifer.garcia@email.com', 'active', '2023-08-15');

-- Get teacher IDs for class assignments (we'll use the first few teachers)
-- Insert classes with teacher assignments using subqueries
INSERT INTO classes (name, subject, teacher_id, grade_level, room_number, schedule, capacity, status) VALUES
('Algebra I', 'Mathematics', (SELECT id FROM teachers WHERE email = 'sarah.johnson@school.edu'), 8, '101', 'MWF 9:00-10:00', 25, 'active'),
('English Literature', 'English Literature', (SELECT id FROM teachers WHERE email = 'michael.davis@school.edu'), 9, '201', 'TTH 10:00-11:30', 30, 'active'),
('Biology', 'Science', (SELECT id FROM teachers WHERE email = 'emma.wilson@school.edu'), 10, '301', 'MWF 11:00-12:00', 20, 'active'),
('World History', 'History', (SELECT id FROM teachers WHERE email = 'james.brown@school.edu'), 7, '102', 'TTH 1:00-2:30', 28, 'active'),
('Art Studio', 'Art', (SELECT id FROM teachers WHERE email = 'lisa.garcia@school.edu'), 6, '401', 'MWF 2:00-3:00', 15, 'active'),
('Physical Education', 'Physical Education', (SELECT id FROM teachers WHERE email = 'david.martinez@school.edu'), 8, 'GYM', 'Daily 3:00-4:00', 35, 'active'),
('Music Theory', 'Music', (SELECT id FROM teachers WHERE email = 'rachel.anderson@school.edu'), 7, '501', 'TTH 9:00-10:30', 20, 'active'),
('Programming Basics', 'Computer Science', (SELECT id FROM teachers WHERE email = 'robert.taylor@school.edu'), 9, '601', 'MWF 1:00-2:00', 22, 'active'),
('French I', 'French', (SELECT id FROM teachers WHERE email = 'jennifer.white@school.edu'), 6, '202', 'TTH 2:00-3:30', 25, 'active'),
('Chemistry', 'Chemistry', (SELECT id FROM teachers WHERE email = 'christopher.miller@school.edu'), 10, '302', 'MWF 10:00-11:00', 18, 'active');

-- Insert student-class enrollments (using subqueries to get actual IDs)
INSERT INTO student_classes (student_id, class_id, enrollment_date, attendance_rate) VALUES
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), '2023-08-20', 95.5),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Physical Education'), '2023-08-20', 98.2),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), '2023-08-20', 92.1),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'Music Theory'), '2023-08-20', 88.7),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'English Literature'), '2023-08-20', 96.8),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'Programming Basics'), '2023-08-20', 94.3),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM classes WHERE name = 'Art Studio'), '2023-08-20', 90.5),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM classes WHERE name = 'French I'), '2023-08-20', 93.2),
((SELECT id FROM students WHERE email = 'ethan.davis@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), '2023-08-20', 93.7),
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), '2023-08-20', 97.2),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Biology'), '2023-08-20', 91.8),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Chemistry'), '2023-08-20', 89.4),
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), '2023-08-20', 94.6),
((SELECT id FROM students WHERE email = 'charlotte.davis@student.edu'), (SELECT id FROM classes WHERE name = 'English Literature'), '2023-08-20', 96.1);

-- Insert marks/grades for various students
INSERT INTO marks (student_id, subject, term, mark, max_mark) VALUES
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'Mathematics', 'Fall 2023', 87, 100),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'Physical Education', 'Fall 2023', 95, 100),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'History', 'Fall 2023', 92, 100),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'Music', 'Fall 2023', 88, 100),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'English Literature', 'Fall 2023', 94, 100),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'Computer Science', 'Fall 2023', 96, 100),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 'Art', 'Fall 2023', 89, 100),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 'French', 'Fall 2023', 91, 100),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Science', 'Fall 2023', 93, 100),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Chemistry', 'Fall 2023', 88, 100);

-- Insert payment records for students
INSERT INTO payments (student_id, amount, due_date, paid_date, status, description) VALUES
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 450.00, '2024-01-15', '2024-01-10', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 450.00, '2024-01-15', NULL, 'pending', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 450.00, '2024-01-15', '2024-01-12', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 475.00, '2024-01-15', '2024-01-08', 'paid', 'Tuition + Art Supplies Fee - January 2024'),
((SELECT id FROM students WHERE email = 'ethan.davis@student.edu'), 450.00, '2024-02-15', NULL, 'pending', 'Tuition Fee - February 2024'),
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), 450.00, '2024-01-15', '2024-01-14', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 500.00, '2024-01-15', '2024-01-11', 'paid', 'Tuition + Lab Fee - January 2024'),
((SELECT id FROM students WHERE email = 'olivia.anderson@student.edu'), 425.00, '2024-01-15', NULL, 'overdue', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'noah.smith@student.edu'), 450.00, '2024-02-15', NULL, 'pending', 'Tuition Fee - February 2024'),
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), 450.00, '2024-01-15', '2024-01-13', 'paid', 'Tuition Fee - January 2024');

-- Insert services for students
INSERT INTO services (student_id, service_name, monthly_fee, status) VALUES
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'After School Care', 150.00, 'active'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'School Bus', 85.00, 'active'),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'Music Lessons', 120.00, 'active'),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 'Art Supplies', 25.00, 'active'),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Advanced Tutoring', 200.00, 'active'),
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), 'School Lunch', 75.00, 'active'),
((SELECT id FROM students WHERE email = 'noah.smith@student.edu'), 'After School Care', 150.00, 'active'),
((SELECT id FROM students WHERE email = 'olivia.anderson@student.edu'), 'School Bus', 85.00, 'active'),
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), 'Sports Program', 100.00, 'active'),
((SELECT id FROM students WHERE email = 'charlotte.davis@student.edu'), 'Language Lab', 60.00, 'active');

-- Insert alerts for students and teachers
INSERT INTO alerts (student_id, teacher_id, alert_type, priority, title, message, read) VALUES
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM teachers WHERE email = 'sarah.johnson@school.edu'), 'academic', 'medium', 'Improved Performance', 'Alex has shown significant improvement in algebra this week.', false),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM teachers WHERE email = 'james.brown@school.edu'), 'absence', 'high', 'Consecutive Absences', 'Emily has been absent for 2 consecutive days. Please contact parent.', false),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM teachers WHERE email = 'michael.davis@school.edu'), 'behavior', 'low', 'Excellent Participation', 'Ryan demonstrated exceptional leadership in group discussions today.', true),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM teachers WHERE email = 'emma.wilson@school.edu'), 'academic', 'urgent', 'Assignment Missing', 'Mason has not submitted the biology project due yesterday.', false),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM teachers WHERE email = 'lisa.garcia@school.edu'), 'behavior', 'low', 'Creative Excellence', 'Sophia created an outstanding art piece that will be displayed in the school gallery.', false),
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), (SELECT id FROM teachers WHERE email = 'rachel.anderson@school.edu'), 'academic', 'medium', 'Music Talent', 'Isabella shows exceptional musical ability and should consider advanced music courses.', false),
((SELECT id FROM students WHERE email = 'olivia.anderson@student.edu'), (SELECT id FROM teachers WHERE email = 'david.martinez@school.edu'), 'late', 'medium', 'Repeated Tardiness', 'Olivia has been late to PE class 3 times this week.', false);

-- Insert announcements
INSERT INTO announcements (title, content, priority, expires_at) VALUES
('Parent-Teacher Conference', 'Parent-teacher conferences are scheduled for March 15-17. Please sign up for your preferred time slot through the parent portal.', 'high', '2024-03-20'),
('Spring Break Notice', 'School will be closed from March 25-29 for Spring Break. Classes resume on April 1st.', 'normal', '2024-03-30'),
('New Computer Lab Opening', 'We are excited to announce the opening of our new computer lab with state-of-the-art equipment! Programming and computer science classes will now have access to cutting-edge technology.', 'normal', '2024-04-15'),
('Graduation Ceremony', 'The graduation ceremony for our 10th-grade students will be held on June 15th at 2:00 PM in the main auditorium. Families are invited to celebrate this milestone.', 'high', '2024-06-20'),
('Science Fair Registration', 'Registration for the annual science fair is now open! Students from grades 6-10 can participate. Registration deadline is February 28th.', 'normal', '2024-03-01'),
('Art Exhibition', 'Our student art exhibition "Young Creators" will be held in the main gallery from April 10-20. Come see the amazing work of our talented artists!', 'normal', '2024-04-25');

-- Insert some attendance records for recent dates
INSERT INTO attendance (student_id, class_id, date, present, late, notes) VALUES
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), CURRENT_DATE - INTERVAL '1 day', true, false, NULL),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), CURRENT_DATE - INTERVAL '3 days', true, true, 'Arrived 10 minutes late'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), CURRENT_DATE - INTERVAL '2 days', false, false, 'Sick leave'),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'English Literature'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Excellent participation'),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM classes WHERE name = 'Art Studio'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Completed beautiful watercolor painting'),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Biology'), CURRENT_DATE - INTERVAL '2 days', true, true, 'Late due to previous class running over'),
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), CURRENT_DATE - INTERVAL '1 day', true, false, NULL),
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Great improvement in problem solving');