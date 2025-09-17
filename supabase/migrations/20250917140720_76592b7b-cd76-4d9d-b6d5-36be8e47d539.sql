-- Clear existing data to start fresh
TRUNCATE TABLE student_classes, attendance, alerts, marks, payments, services, announcements CASCADE;
DELETE FROM students WHERE id NOT IN (SELECT id FROM students LIMIT 1);
DELETE FROM teachers WHERE id NOT IN (SELECT id FROM teachers LIMIT 1);
DELETE FROM classes;
DELETE FROM profiles WHERE id NOT IN (SELECT id FROM profiles LIMIT 1);

-- Insert comprehensive teacher data
INSERT INTO teachers (id, first_name, last_name, email, subject, hire_date) VALUES
('11111111-1111-1111-1111-111111111111', 'Sarah', 'Johnson', 'sarah.johnson@school.edu', 'Mathematics', '2020-08-15'),
('22222222-2222-2222-2222-222222222222', 'Michael', 'Davis', 'michael.davis@school.edu', 'English Literature', '2019-01-10'),
('33333333-3333-3333-3333-333333333333', 'Emma', 'Wilson', 'emma.wilson@school.edu', 'Science', '2021-09-01'),
('44444444-4444-4444-4444-444444444444', 'James', 'Brown', 'james.brown@school.edu', 'History', '2018-08-20'),
('55555555-5555-5555-5555-555555555555', 'Lisa', 'Garcia', 'lisa.garcia@school.edu', 'Art', '2022-01-15'),
('66666666-6666-6666-6666-666666666666', 'David', 'Martinez', 'david.martinez@school.edu', 'Physical Education', '2020-03-01'),
('77777777-7777-7777-7777-777777777777', 'Rachel', 'Anderson', 'rachel.anderson@school.edu', 'Music', '2019-08-25'),
('88888888-8888-8888-8888-888888888888', 'Robert', 'Taylor', 'robert.taylor@school.edu', 'Computer Science', '2021-02-10');

-- Insert parent profiles
INSERT INTO profiles (id, email, full_name, role) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'john.smith@email.com', 'John Smith', 'parent'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'mary.johnson@email.com', 'Mary Johnson', 'parent'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'david.williams@email.com', 'David Williams', 'parent'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'susan.brown@email.com', 'Susan Brown', 'parent'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'michael.davis@email.com', 'Michael Davis', 'parent'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'jennifer.garcia@email.com', 'Jennifer Garcia', 'parent'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'christopher.martinez@email.com', 'Christopher Martinez', 'parent'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'amanda.anderson@email.com', 'Amanda Anderson', 'parent');

-- Insert comprehensive student data
INSERT INTO students (id, first_name, last_name, email, date_of_birth, grade_level, parent_id, parent_email, status, enrollment_date) VALUES
('s1111111-1111-1111-1111-111111111111', 'Alex', 'Smith', 'alex.smith@student.edu', '2010-03-15', 8, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'john.smith@email.com', 'active', '2023-08-15'),
('s2222222-2222-2222-2222-222222222222', 'Emily', 'Johnson', 'emily.johnson@student.edu', '2011-07-22', 7, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'mary.johnson@email.com', 'active', '2023-08-15'),
('s3333333-3333-3333-3333-333333333333', 'Ryan', 'Williams', 'ryan.williams@student.edu', '2009-11-08', 9, 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'david.williams@email.com', 'active', '2023-08-15'),
('s4444444-4444-4444-4444-444444444444', 'Sophia', 'Brown', 'sophia.brown@student.edu', '2012-01-30', 6, 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'susan.brown@email.com', 'active', '2023-08-15'),
('s5555555-5555-5555-5555-555555555555', 'Ethan', 'Davis', 'ethan.davis@student.edu', '2010-09-12', 8, 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'michael.davis@email.com', 'active', '2023-08-15'),
('s6666666-6666-6666-6666-666666666666', 'Isabella', 'Garcia', 'isabella.garcia@student.edu', '2011-04-18', 7, 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'jennifer.garcia@email.com', 'active', '2023-08-15'),
('s7777777-7777-7777-7777-777777777777', 'Mason', 'Martinez', 'mason.martinez@student.edu', '2008-12-05', 10, 'gggggggg-gggg-gggg-gggg-gggggggggggg', 'christopher.martinez@email.com', 'active', '2023-08-15'),
('s8888888-8888-8888-8888-888888888888', 'Olivia', 'Anderson', 'olivia.anderson@student.edu', '2013-06-25', 5, 'hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'amanda.anderson@email.com', 'active', '2023-08-15'),
('s9999999-9999-9999-9999-999999999999', 'Noah', 'Smith', 'noah.smith@student.edu', '2012-08-14', 6, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'john.smith@email.com', 'active', '2023-08-15'),
('s0000000-0000-0000-0000-000000000000', 'Ava', 'Johnson', 'ava.johnson@student.edu', '2009-02-20', 9, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'mary.johnson@email.com', 'active', '2023-08-15');

-- Insert classes with proper teacher assignments
INSERT INTO classes (id, name, subject, teacher_id, grade_level, room_number, schedule, capacity, status) VALUES
('c1111111-1111-1111-1111-111111111111', 'Algebra I', 'Mathematics', '11111111-1111-1111-1111-111111111111', 8, '101', 'MWF 9:00-10:00', 25, 'active'),
('c2222222-2222-2222-2222-222222222222', 'English Literature', 'English Literature', '22222222-2222-2222-2222-222222222222', 9, '201', 'TTH 10:00-11:30', 30, 'active'),
('c3333333-3333-3333-3333-333333333333', 'Biology', 'Science', '33333333-3333-3333-3333-333333333333', 10, '301', 'MWF 11:00-12:00', 20, 'active'),
('c4444444-4444-4444-4444-444444444444', 'World History', 'History', '44444444-4444-4444-4444-444444444444', 7, '102', 'TTH 1:00-2:30', 28, 'active'),
('c5555555-5555-5555-5555-555555555555', 'Art Studio', 'Art', '55555555-5555-5555-5555-555555555555', 6, '401', 'MWF 2:00-3:00', 15, 'active'),
('c6666666-6666-6666-6666-666666666666', 'Physical Education', 'Physical Education', '66666666-6666-6666-6666-666666666666', 8, 'GYM', 'Daily 3:00-4:00', 35, 'active'),
('c7777777-7777-7777-7777-777777777777', 'Music Theory', 'Music', '77777777-7777-7777-7777-777777777777', 7, '501', 'TTH 9:00-10:30', 20, 'active'),
('c8888888-8888-8888-8888-888888888888', 'Programming Basics', 'Computer Science', '88888888-8888-8888-8888-888888888888', 9, '601', 'MWF 1:00-2:00', 22, 'active');

-- Insert student-class enrollments
INSERT INTO student_classes (student_id, class_id, enrollment_date, attendance_rate) VALUES
('s1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '2023-08-20', 95.5),
('s1111111-1111-1111-1111-111111111111', 'c6666666-6666-6666-6666-666666666666', '2023-08-20', 98.2),
('s2222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444', '2023-08-20', 92.1),
('s2222222-2222-2222-2222-222222222222', 'c7777777-7777-7777-7777-777777777777', '2023-08-20', 88.7),
('s3333333-3333-3333-3333-333333333333', 'c2222222-2222-2222-2222-222222222222', '2023-08-20', 96.8),
('s3333333-3333-3333-3333-333333333333', 'c8888888-8888-8888-8888-888888888888', '2023-08-20', 94.3),
('s4444444-4444-4444-4444-444444444444', 'c5555555-5555-5555-5555-555555555555', '2023-08-20', 90.5),
('s5555555-5555-5555-5555-555555555555', 'c1111111-1111-1111-1111-111111111111', '2023-08-20', 93.7),
('s6666666-6666-6666-6666-666666666666', 'c4444444-4444-4444-4444-444444444444', '2023-08-20', 97.2),
('s7777777-7777-7777-7777-777777777777', 'c3333333-3333-3333-3333-333333333333', '2023-08-20', 91.8);

-- Insert attendance records
INSERT INTO attendance (student_id, class_id, date, present, late, notes) VALUES
('s1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '2024-01-15', true, false, NULL),
('s1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '2024-01-17', true, true, 'Arrived 10 minutes late'),
('s2222222-2222-2222-2222-222222222222', 'c4444444-4444-4444-4444-444444444444', '2024-01-16', false, false, 'Sick leave'),
('s3333333-3333-3333-3333-333333333333', 'c2222222-2222-2222-2222-222222222222', '2024-01-15', true, false, 'Excellent participation');

-- Insert marks/grades
INSERT INTO marks (student_id, subject, term, mark, max_mark) VALUES
('s1111111-1111-1111-1111-111111111111', 'Mathematics', 'Fall 2023', 87, 100),
('s1111111-1111-1111-1111-111111111111', 'Physical Education', 'Fall 2023', 95, 100),
('s2222222-2222-2222-2222-222222222222', 'History', 'Fall 2023', 92, 100),
('s2222222-2222-2222-2222-222222222222', 'Music', 'Fall 2023', 88, 100),
('s3333333-3333-3333-3333-333333333333', 'English Literature', 'Fall 2023', 94, 100),
('s3333333-3333-3333-3333-333333333333', 'Computer Science', 'Fall 2023', 96, 100),
('s4444444-4444-4444-4444-444444444444', 'Art', 'Fall 2023', 89, 100);

-- Insert payment records
INSERT INTO payments (student_id, amount, due_date, paid_date, status, description) VALUES
('s1111111-1111-1111-1111-111111111111', 450.00, '2024-01-15', '2024-01-10', 'paid', 'Tuition Fee - January 2024'),
('s2222222-2222-2222-2222-222222222222', 450.00, '2024-01-15', NULL, 'pending', 'Tuition Fee - January 2024'),
('s3333333-3333-3333-3333-333333333333', 450.00, '2024-01-15', '2024-01-12', 'paid', 'Tuition Fee - January 2024'),
('s4444444-4444-4444-4444-444444444444', 475.00, '2024-01-15', '2024-01-08', 'paid', 'Tuition + Art Supplies Fee - January 2024'),
('s5555555-5555-5555-5555-555555555555', 450.00, '2024-02-15', NULL, 'pending', 'Tuition Fee - February 2024');

-- Insert services
INSERT INTO services (student_id, service_name, monthly_fee, status) VALUES
('s1111111-1111-1111-1111-111111111111', 'After School Care', 150.00, 'active'),
('s2222222-2222-2222-2222-222222222222', 'School Bus', 85.00, 'active'),
('s3333333-3333-3333-3333-333333333333', 'Music Lessons', 120.00, 'active'),
('s4444444-4444-4444-4444-444444444444', 'Art Supplies', 25.00, 'active'),
('s7777777-7777-7777-7777-777777777777', 'Advanced Tutoring', 200.00, 'active');

-- Insert alerts
INSERT INTO alerts (student_id, teacher_id, alert_type, priority, title, message, read) VALUES
('s1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'academic', 'medium', 'Improved Performance', 'Alex has shown significant improvement in algebra this week.', false),
('s2222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'absence', 'high', 'Consecutive Absences', 'Emily has been absent for 2 consecutive days. Please contact parent.', false),
('s3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'behavior', 'low', 'Excellent Participation', 'Ryan demonstrated exceptional leadership in group discussions today.', true),
('s7777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'academic', 'urgent', 'Assignment Missing', 'Mason has not submitted the biology project due yesterday.', false);

-- Insert announcements
INSERT INTO announcements (title, content, priority, expires_at) VALUES
('Parent-Teacher Conference', 'Parent-teacher conferences are scheduled for March 15-17. Please sign up for your preferred time slot through the parent portal.', 'high', '2024-03-20'),
('Spring Break Notice', 'School will be closed from March 25-29 for Spring Break. Classes resume on April 1st.', 'normal', '2024-03-30'),
('New Computer Lab Opening', 'We are excited to announce the opening of our new computer lab with state-of-the-art equipment!', 'normal', '2024-04-15'),
('Graduation Ceremony', 'The graduation ceremony for our 10th-grade students will be held on June 15th at 2:00 PM in the main auditorium.', 'high', '2024-06-20');