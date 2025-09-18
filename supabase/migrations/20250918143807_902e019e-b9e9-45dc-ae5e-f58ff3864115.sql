-- Add more detailed student-class enrollments
INSERT INTO student_classes (student_id, class_id, enrollment_date, attendance_rate) VALUES
-- Alex Smith (Grade 8) - Mathematics and PE
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), '2023-08-20', 95.5),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Physical Education'), '2023-08-20', 98.2),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Creative Writing'), '2023-08-20', 92.8),

-- Emily Johnson (Grade 7) - History and Music
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), '2023-08-20', 92.1),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'Music Theory'), '2023-08-20', 88.7),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'French II'), '2023-08-20', 91.3),

-- Ryan Williams (Grade 9) - Advanced classes
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'English Literature'), '2023-08-20', 96.8),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'Programming Basics'), '2023-08-20', 94.3),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'Physics'), '2023-08-20', 89.7),

-- Sophia Brown (Grade 6) - Arts focus
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM classes WHERE name = 'Art Studio'), '2023-08-20', 90.5),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM classes WHERE name = 'French I'), '2023-08-20', 93.2),

-- Ethan Davis (Grade 8) - STEM focus
((SELECT id FROM students WHERE email = 'ethan.davis@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), '2023-08-20', 93.7),
((SELECT id FROM students WHERE email = 'ethan.davis@student.edu'), (SELECT id FROM classes WHERE name = 'Digital Art'), '2023-08-20', 87.4),

-- Isabella Garcia (Grade 7)
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), '2023-08-20', 97.2),
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), (SELECT id FROM classes WHERE name = 'French II'), '2023-08-20', 94.8),

-- Mason Martinez (Grade 10) - Senior classes
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Biology'), '2023-08-20', 91.8),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Chemistry'), '2023-08-20', 89.4),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Web Development'), '2023-08-20', 96.1),

-- Mia Wilson (Grade 8)
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), '2023-08-20', 94.6),
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'US History'), '2023-08-20', 91.2),

-- Charlotte Davis (Grade 9)
((SELECT id FROM students WHERE email = 'charlotte.davis@student.edu'), (SELECT id FROM classes WHERE name = 'English Literature'), '2023-08-20', 96.1),
((SELECT id FROM students WHERE email = 'charlotte.davis@student.edu'), (SELECT id FROM classes WHERE name = 'Band'), '2023-08-20', 92.7),

-- Caleb Wilson (Grade 9)
((SELECT id FROM students WHERE email = 'caleb.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'Geometry'), '2023-08-20', 88.9),
((SELECT id FROM students WHERE email = 'caleb.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'Physics'), '2023-08-20', 90.3);

-- Insert comprehensive marks/grades
INSERT INTO marks (student_id, subject, term, mark, max_mark) VALUES
-- Fall 2023 grades
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'Mathematics', 'Fall 2023', 87, 100),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'Physical Education', 'Fall 2023', 95, 100),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'English Literature', 'Fall 2023', 82, 100),

((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'History', 'Fall 2023', 92, 100),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'Music', 'Fall 2023', 88, 100),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'French', 'Fall 2023', 91, 100),

((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'English Literature', 'Fall 2023', 94, 100),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'Computer Science', 'Fall 2023', 96, 100),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'Science', 'Fall 2023', 90, 100),

((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 'Art', 'Fall 2023', 89, 100),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 'French', 'Fall 2023', 91, 100),

((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Science', 'Fall 2023', 93, 100),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Chemistry', 'Fall 2023', 88, 100),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Computer Science', 'Fall 2023', 97, 100),

-- Spring 2024 grades (some in progress)
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'Mathematics', 'Spring 2024', 89, 100),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'English Literature', 'Spring 2024', 95, 100),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Chemistry', 'Spring 2024', 91, 100);

-- Insert payment records
INSERT INTO payments (student_id, amount, due_date, paid_date, status, description) VALUES
-- January 2024 payments
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 450.00, '2024-01-15', '2024-01-10', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 450.00, '2024-01-15', NULL, 'pending', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 450.00, '2024-01-15', '2024-01-12', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 475.00, '2024-01-15', '2024-01-08', 'paid', 'Tuition + Art Supplies Fee - January 2024'),
((SELECT id FROM students WHERE email = 'ethan.davis@student.edu'), 450.00, '2024-01-15', '2024-01-13', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), 450.00, '2024-01-15', '2024-01-14', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 500.00, '2024-01-15', '2024-01-11', 'paid', 'Tuition + Lab Fee - January 2024'),
((SELECT id FROM students WHERE email = 'olivia.anderson@student.edu'), 425.00, '2024-01-15', NULL, 'overdue', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'noah.smith@student.edu'), 450.00, '2024-01-15', '2024-01-09', 'paid', 'Tuition Fee - January 2024'),
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), 450.00, '2024-01-15', '2024-01-13', 'paid', 'Tuition Fee - January 2024'),

-- February 2024 payments
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 450.00, '2024-02-15', '2024-02-12', 'paid', 'Tuition Fee - February 2024'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 450.00, '2024-02-15', NULL, 'pending', 'Tuition Fee - February 2024'),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 450.00, '2024-02-15', NULL, 'pending', 'Tuition Fee - February 2024'),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 475.00, '2024-02-15', '2024-02-10', 'paid', 'Tuition + Art Supplies Fee - February 2024'),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 500.00, '2024-02-15', '2024-02-11', 'paid', 'Tuition + Lab Fee - February 2024');

-- Insert services for students
INSERT INTO services (student_id, service_name, monthly_fee, status) VALUES
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'After School Care', 150.00, 'active'),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), 'School Lunch', 75.00, 'active'),

((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'School Bus', 85.00, 'active'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), 'Music Lessons', 120.00, 'active'),

((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'Advanced Tutoring', 200.00, 'active'),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), 'Programming Club', 50.00, 'active'),

((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 'Art Supplies', 25.00, 'active'),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), 'French Tutoring', 80.00, 'active'),

((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Lab Access', 40.00, 'active'),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), 'Science Fair Prep', 60.00, 'active'),

((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), 'School Lunch', 75.00, 'active'),
((SELECT id FROM students WHERE email = 'noah.smith@student.edu'), 'After School Care', 150.00, 'active'),
((SELECT id FROM students WHERE email = 'olivia.anderson@student.edu'), 'School Bus', 85.00, 'active'),
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), 'Sports Program', 100.00, 'active'),
((SELECT id FROM students WHERE email = 'charlotte.davis@student.edu'), 'Band Instrument Rental', 45.00, 'active');

-- Insert alerts for students and teachers
INSERT INTO alerts (student_id, teacher_id, alert_type, priority, title, message, read) VALUES
-- Academic alerts
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM teachers WHERE email = 'sarah.johnson@school.edu'), 'academic', 'medium', 'Improved Performance', 'Alex has shown significant improvement in algebra this week and is now solving complex problems confidently.', false),

((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM teachers WHERE email = 'james.brown@school.edu'), 'absence', 'high', 'Consecutive Absences', 'Emily has been absent for 2 consecutive days. Please contact parent to ensure student wellbeing.', false),

((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM teachers WHERE email = 'michael.davis@school.edu'), 'behavior', 'low', 'Excellent Participation', 'Ryan demonstrated exceptional leadership in group discussions today and helped other students understand the material.', true),

((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM teachers WHERE email = 'emma.wilson@school.edu'), 'academic', 'urgent', 'Assignment Missing', 'Mason has not submitted the biology lab report that was due yesterday. This is affecting his grade significantly.', false),

((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM teachers WHERE email = 'lisa.garcia@school.edu'), 'behavior', 'low', 'Creative Excellence', 'Sophia created an outstanding art piece that will be displayed in the school gallery next month.', false),

((SELECT id FROM students WHERE email = 'isabella.garcia@student.edu'), (SELECT id FROM teachers WHERE email = 'rachel.anderson@school.edu'), 'academic', 'medium', 'Music Talent', 'Isabella shows exceptional musical ability and should consider advanced music courses or private lessons.', false),

((SELECT id FROM students WHERE email = 'olivia.anderson@student.edu'), (SELECT id FROM teachers WHERE email = 'david.martinez@school.edu'), 'late', 'medium', 'Repeated Tardiness', 'Olivia has been late to PE class 3 times this week. Please discuss punctuality with the student.', false),

-- Behavioral alerts
((SELECT id FROM students WHERE email = 'noah.smith@student.edu'), (SELECT id FROM teachers WHERE email = 'jennifer.white@school.edu'), 'behavior', 'low', 'Helping Others', 'Noah consistently helps classmates with French pronunciation and shows great peer support.', true),

((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), (SELECT id FROM teachers WHERE email = 'sarah.johnson@school.edu'), 'academic', 'medium', 'Math Improvement Needed', 'Mia is struggling with quadratic equations. Additional support recommended.', false),

-- General alerts
((SELECT id FROM students WHERE email = 'charlotte.davis@student.edu'), (SELECT id FROM teachers WHERE email = 'rachel.anderson@school.edu'), 'general', 'low', 'Band Performance', 'Charlotte will be performing a solo piece at the upcoming spring concert. Excellent preparation!', false);

-- Insert recent attendance records
INSERT INTO attendance (student_id, class_id, date, present, late, notes) VALUES
-- Recent attendance for Alex Smith
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Excellent participation in group work'),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), CURRENT_DATE - INTERVAL '3 days', true, true, 'Arrived 10 minutes late due to medical appointment'),
((SELECT id FROM students WHERE email = 'alex.smith@student.edu'), (SELECT id FROM classes WHERE name = 'Physical Education'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Led warm-up exercises'),

-- Emily Johnson attendance
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), CURRENT_DATE - INTERVAL '2 days', false, false, 'Sick leave - flu symptoms'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'World History'), CURRENT_DATE - INTERVAL '3 days', false, false, 'Sick leave'),
((SELECT id FROM students WHERE email = 'emily.johnson@student.edu'), (SELECT id FROM classes WHERE name = 'Music Theory'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Returned from illness, caught up quickly'),

-- Ryan Williams attendance
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'English Literature'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Excellent analysis of Shakespeare'),
((SELECT id FROM students WHERE email = 'ryan.williams@student.edu'), (SELECT id FROM classes WHERE name = 'Programming Basics'), CURRENT_DATE - INTERVAL '2 days', true, false, 'Completed advanced coding challenge'),

-- Sophia Brown attendance
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM classes WHERE name = 'Art Studio'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Completed beautiful watercolor landscape'),
((SELECT id FROM students WHERE email = 'sophia.brown@student.edu'), (SELECT id FROM classes WHERE name = 'French I'), CURRENT_DATE - INTERVAL '2 days', true, true, 'Late due to art project cleanup'),

-- Mason Martinez attendance
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Biology'), CURRENT_DATE - INTERVAL '2 days', true, true, 'Late due to previous class running over'),
((SELECT id FROM students WHERE email = 'mason.martinez@student.edu'), (SELECT id FROM classes WHERE name = 'Chemistry'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Excellent lab technique demonstrated'),

-- Additional attendance records
((SELECT id FROM students WHERE email = 'mia.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'Algebra I'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Great improvement in problem solving'),
((SELECT id FROM students WHERE email = 'charlotte.davis@student.edu'), (SELECT id FROM classes WHERE name = 'English Literature'), CURRENT_DATE - INTERVAL '1 day', true, false, 'Insightful discussion contributions'),
((SELECT id FROM students WHERE email = 'caleb.wilson@student.edu'), (SELECT id FROM classes WHERE name = 'Physics'), CURRENT_DATE - INTERVAL '2 days', true, false, 'Strong understanding of mechanics concepts');