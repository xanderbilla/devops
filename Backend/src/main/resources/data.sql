-- ============================
-- CATEGORY DATA
-- ============================
INSERT INTO category (id, name, slug, description) VALUES
                                                       ('550e8400-e29b-41d4-a716-446655440001', 'Healthcare', 'healthcare', 'Professional healthcare certification courses'),
                                                       ('550e8400-e29b-41d4-a716-446655440002', 'IT Certification', 'it-certification', 'Industry-leading IT certifications')
    ON CONFLICT (id) DO NOTHING;

-- ============================
-- INSTRUCTOR DATA
-- ============================
INSERT INTO instructor (id, name, bio, expertise, image_url, rating, students_count, courses_count) VALUES
                                                                                                        ('650e8400-e29b-41d4-a716-446655440001', 'Dr. Sarah Johnson',
                                                                                                         'Experienced healthcare professional with 15+ years in nursing education',
                                                                                                         'Nursing, CNA, Medical Coding',
                                                                                                         'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
                                                                                                         4.8, 12500, 8),

                                                                                                        ('650e8400-e29b-41d4-a716-446655440002', 'Michael Chen',
                                                                                                         'AWS Certified Solutions Architect and cloud computing expert',
                                                                                                         'AWS, Cloud Computing, DevOps',
                                                                                                         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                                                                                                         4.9, 18000, 12),

                                                                                                        ('650e8400-e29b-41d4-a716-446655440003', 'Emily Rodriguez',
                                                                                                         'CompTIA certified trainer with extensive IT security experience',
                                                                                                         'CompTIA, Network Security, A+',
                                                                                                         'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
                                                                                                         4.7, 9500, 6),

                                                                                                        ('650e8400-e29b-41d4-a716-446655440004', 'Dr. James Wilson',
                                                                                                         'Medical coding specialist and AAPC certified instructor',
                                                                                                         'Medical Coding, ICD-10, CPT',
                                                                                                         'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
                                                                                                         4.9, 7200, 5)
    ON CONFLICT (id) DO NOTHING;

-- ============================
-- COURSE DATA
-- ============================
INSERT INTO course (
    id, title, description, category_id, instructor_id, price,
    duration, level, thumbnail_url, video_url,
    is_featured, rating, students_enrolled
) VALUES
      ('750e8400-e29b-41d4-a716-446655440001',
       'Certified Nursing Assistant (CNA) Complete Course',
       'Comprehensive CNA training program covering all essential skills and knowledge required to become a certified nursing assistant.',
       '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 299,
       '8 weeks', 'Beginner',
       'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       true, 4.8, 3420
      ),

      ('750e8400-e29b-41d4-a716-446655440002',
       'AWS Solutions Architect Associate 2024',
       'Master AWS cloud computing and prepare for the Solutions Architect Associate certification exam.',
       '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 199,
       '12 weeks', 'Intermediate',
       'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       true, 4.9, 5680
      ),

      ('750e8400-e29b-41d4-a716-446655440003',
       'CompTIA A+ Certification Training',
       'Complete A+ certification preparation course covering hardware, software, networking, and troubleshooting.',
       '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', 179,
       '10 weeks', 'Beginner',
       'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       true, 4.7, 4230
      ),

      ('750e8400-e29b-41d4-a716-446655440004',
       'Medical Coding and Billing Specialist',
       'Learn ICD-10, CPT, and HCPCS coding systems with real-world medical billing scenarios.',
       '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', 349,
       '16 weeks', 'Beginner',
       'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       true, 4.9, 2890
      ),

      ('750e8400-e29b-41d4-a716-446655440005',
       'Registered Nurse (RN) Exam Prep',
       'Comprehensive preparation for the NCLEX-RN examination with practice tests and study materials.',
       '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 399,
       '12 weeks', 'Advanced',
       'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       false, 4.8, 1950
      ),

      ('750e8400-e29b-41d4-a716-446655440006',
       'Microsoft Azure Fundamentals AZ-900',
       'Introduction to cloud services and Microsoft Azure platform fundamentals.',
       '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 149,
       '6 weeks', 'Beginner',
       'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       false, 4.6, 3100
      ),

      ('750e8400-e29b-41d4-a716-446655440007',
       'Cisco CCNA 200-301 Complete Course',
       'Master networking fundamentals and prepare for Cisco CCNA certification.',
       '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', 249,
       '14 weeks', 'Intermediate',
       'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       false, 4.8, 2760
      ),

      ('750e8400-e29b-41d4-a716-446655440008',
       'Pharmacy Technician Certification',
       'Complete training program for pharmacy technician certification exam preparation.',
       '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', 279,
       '10 weeks', 'Beginner',
       'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
       'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
       false, 4.7, 1820
      )
    ON CONFLICT (id) DO NOTHING;

-- ============================
-- ENROLLMENT DATA (Sample enrollments for testing)
-- Note: Enrollments will be created when users sign up and enroll in courses
-- Uncomment and adjust user_id values after users are created
-- ============================
-- INSERT INTO enrollment (id, user_id, course_id, enrolled_at, progress_percentage) VALUES
--     ('850e8400-e29b-41d4-a716-446655440001', '1', '750e8400-e29b-41d4-a716-446655440001', '2024-11-01 10:00:00', 45.5),
--     ('850e8400-e29b-41d4-a716-446655440002', '1', '750e8400-e29b-41d4-a716-446655440002', '2024-11-05 14:30:00', 65.0)
-- ON CONFLICT (id) DO NOTHING;

-- EMPTY MODULES
-- INSERT INTO course_module (id, course_id, title, order_index) VALUES
-- -- (Add later)
-- ;
--
-- -- EMPTY LESSONS
-- INSERT INTO course_lesson (id, module_id, title, video_url, duration, order_index) VALUES
-- -- (Add later)
-- ;
--
-- -- PAYMENTS (EMPTY)
-- INSERT INTO payment (id, user_id, course_id, amount, status, payment_method, transaction_id, created_at) VALUES
-- -- none
-- ;
