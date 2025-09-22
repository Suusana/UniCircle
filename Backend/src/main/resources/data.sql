INSERT INTO Shortcut (name, url) 
VALUES 
  ('Study Space', 'https://www.lib.uts.edu.au/studyspaces'),
  ('Library', 'https://www.lib.uts.edu.au/'),
  ('Canvas', 'https://canvas.uts.edu.au/'),
  ('MSA', 'https://onestopadmin.uts.edu.au/'),
  ('My Student Portal', 'https://student-portal.uts.edu.au/s/'),
  ('UTS', 'https://www.uts.edu.au/');


INSERT INTO Event (club_id, title, description, location, start_time, end_time, student_id, status) VALUES
(1, 'Weekly Chess Tournament', 'Casual chess matches for all skill levels.', 'Room A101', '2025-09-12 15:00:00', '2025-09-12 17:00:00', 1, 'Upcoming'),
(1, 'Strategy Workshop', 'Learn advanced chess strategies from experienced players.', 'Room A102', '2025-09-19 16:00:00', '2025-09-19 18:00:00', 21, 'Upcoming'),
(1, 'Friendly Match with Robotics Club', 'Inter-club chess vs robotics team members.', 'Library Hall', '2025-09-26 14:00:00', '2025-09-26 16:00:00', 22, 'Upcoming'),
(2, 'Robotics Showcase', 'Demonstration of student-built robots.', 'Engineering Lab', '2025-09-13 10:00:00', '2025-09-13 12:00:00', 2, 'Upcoming'),
(2, 'Arduino Workshop', 'Hands-on session with Arduino programming.', 'Lab B203', '2025-09-20 13:00:00', '2025-09-20 16:00:00', 23, 'Upcoming'),
(2, 'Robotics vs AI Debate', 'Discuss the impact of robotics on future jobs.', 'Lecture Hall C', '2025-09-27 11:00:00', '2025-09-27 13:00:00', 24, 'Upcoming'),
(3, 'Script Reading Session', 'Rehearsal of our upcoming play.', 'Auditorium', '2025-09-14 15:00:00', '2025-09-14 17:00:00', 3, 'Upcoming'),
(3, 'Improv Night', 'Fun improvisation games for members.', 'Drama Studio', '2025-09-21 18:00:00', '2025-09-21 20:00:00', 25, 'Upcoming'),
(3, 'Stagecraft Workshop', 'Learn about lighting and set design.', 'Theater Room', '2025-09-28 14:00:00', '2025-09-28 17:00:00', 26, 'Upcoming'),
(4, 'Weekly Debate Practice', 'Debate on current affairs.', 'Room D201', '2025-09-15 17:00:00', '2025-09-15 19:00:00', 4, 'Upcoming'),
(4, 'Inter-College Debate', 'Competition with nearby university.', 'Main Hall', '2025-09-22 15:00:00', '2025-09-22 18:00:00', 27, 'Upcoming'),
(4, 'Logic & Argument Workshop', 'Learn how to structure arguments effectively.', 'Room D202', '2025-09-29 16:00:00', '2025-09-29 18:00:00', 28, 'Upcoming'),
(5, 'Nature Photography Walk', 'Outdoor photo session in the park.', 'City Park', '2025-09-12 09:00:00', '2025-09-12 11:00:00', 5, 'Upcoming'),
(5, 'Editing Workshop', 'Learn photo editing with Lightroom.', 'Room P101', '2025-09-19 14:00:00', '2025-09-19 16:00:00', 29, 'Upcoming'),
(5, 'Photography Exhibition', 'Showcase of members’ best photos.', 'Gallery Hall', '2025-09-26 10:00:00', '2025-09-26 13:00:00', 30, 'Upcoming'),
(6, 'Open Mic Night', 'Perform and enjoy music together.', 'Cafeteria Stage', '2025-09-13 18:00:00', '2025-09-13 20:00:00', 6, 'Upcoming'),
(6, 'Guitar Workshop', 'Learn basic chords and songs.', 'Music Room', '2025-09-20 17:00:00', '2025-09-20 19:00:00', 31, 'Upcoming'),
(6, 'Choir Rehearsal', 'Weekly choir practice session.', 'Hall M1', '2025-09-27 16:00:00', '2025-09-27 18:00:00', 32, 'Upcoming'),
(7, 'Hackathon Kickoff', 'Start of 24-hour hackathon.', 'Lab C301', '2025-09-14 09:00:00', '2025-09-14 21:00:00', 7, 'Upcoming'),
(7, 'Python Basics Workshop', 'Introduction to Python programming.', 'Lab C302', '2025-09-21 14:00:00', '2025-09-21 17:00:00', 33, 'Upcoming'),
(7, 'Web Development Meetup', 'Discussion on latest web technologies.', 'Lab C303', '2025-09-28 15:00:00', '2025-09-28 18:00:00', 34, 'Upcoming'),
(8, 'Campus Clean-Up Drive', 'Volunteers clean campus areas.', 'Main Gate', '2025-09-15 08:00:00', '2025-09-15 11:00:00', 8, 'Upcoming'),
(8, 'Tree Plantation Drive', 'Planting new trees around campus.', 'Sports Ground', '2025-09-22 09:00:00', '2025-09-22 12:00:00', 35, 'Upcoming'),
(8, 'Sustainability Talk', 'Guest lecture on climate change.', 'Lecture Hall E', '2025-09-29 13:00:00', '2025-09-29 15:00:00', 36, 'Upcoming'),
(9, 'Painting Workshop', 'Learn watercolor techniques.', 'Art Studio', '2025-09-16 14:00:00', '2025-09-16 16:00:00', 9, 'Upcoming'),
(9, 'Sketching Evening', 'Relaxed sketching session.', 'Art Room A2', '2025-09-23 17:00:00', '2025-09-23 19:00:00', 37, 'Upcoming'),
(9, 'Art Exhibition', 'Showcase of artwork by members.', 'Campus Gallery', '2025-09-30 10:00:00', '2025-09-30 13:00:00', 38, 'Upcoming'),
(10, 'Lab Tour', 'Exploring university science labs.', 'Science Block', '2025-09-12 11:00:00', '2025-09-12 13:00:00', 10, 'Upcoming'),
(10, 'Physics Experiments', 'Hands-on experiments session.', 'Physics Lab', '2025-09-19 14:00:00', '2025-09-19 16:00:00', 39, 'Upcoming'),
(10, 'Science Quiz', 'Team-based science quiz competition.', 'Hall S101', '2025-09-26 15:00:00', '2025-09-26 17:00:00', 40, 'Upcoming');
-- Continue in this same pattern up to Event 60


INSERT INTO Membership (student_id, club_id, role) VALUES
(1,1,'Club Owner'), (21,1,'Club Admin'), (22,1,'Club Admin'), (3,1,'Member'),
(2,2,'Club Owner'), (23,2,'Club Admin'), (24,2,'Club Admin'), (1,2,'Member'),
(3,3,'Club Owner'), (25,3,'Club Admin'), (26,3,'Club Admin'), (2,3,'Member'),
(4,4,'Club Owner'), (27,4,'Club Admin'), (28,4,'Club Admin'), (5,4,'Member'),
(5,5,'Club Owner'), (29,5,'Club Admin'), (30,5,'Club Admin'), (6,5,'Member'),
(6,6,'Club Owner'), (31,6,'Club Admin'), (32,6,'Club Admin'), (7,6,'Member'),
(7,7,'Club Owner'), (33,7,'Club Admin'), (34,7,'Club Admin'), (8,7,'Member'),
(8,8,'Club Owner'), (35,8,'Club Admin'), (36,8,'Club Admin'), (9,8,'Member'),
(9,9,'Club Owner'), (37,9,'Club Admin'), (38,9,'Club Admin'), (10,9,'Member'),
(10,10,'Club Owner'), (39,10,'Club Admin'), (40,10,'Club Admin'), (11,10,'Member'),
(11,11,'Club Owner'), (41,11,'Club Admin'), (42,11,'Club Admin'), (12,11,'Member'),
(12,12,'Club Owner'), (43,12,'Club Admin'), (44,12,'Club Admin'), (13,12,'Member'),
(13,13,'Club Owner'), (45,13,'Club Admin'), (46,13,'Club Admin'), (14,13,'Member'),
(14,14,'Club Owner'), (47,14,'Club Admin'), (48,14,'Club Admin'), (15,14,'Member'),
(15,15,'Club Owner'), (49,15,'Club Admin'), (50,15,'Club Admin'), (16,15,'Member'),
(16,16,'Club Owner'), (1,16,'Club Admin'), (2,16,'Club Admin'), (17,16,'Member'),
(17,17,'Club Owner'), (3,17,'Club Admin'), (4,17,'Club Admin'), (18,17,'Member'),
(18,18,'Club Owner'), (5,18,'Club Admin'), (6,18,'Club Admin'), (19,18,'Member'),
(19,19,'Club Owner'), (7,19,'Club Admin'), (8,19,'Club Admin'), (20,19,'Member'),
(20,20,'Club Owner'), (9,20,'Club Admin'), (10,20,'Club Admin'), (1,20,'Member');


INSERT INTO main.Student
(email, password, first_name, last_name, preferred_name, degree, major, year, type, description, Academic_record)
VALUES
('sarah.jones1@uni.edu', 'pwd123', 'Sarah', 'Jones', 'SJ', 'Bachelor of Arts', 'History', 2, 0, 'Loves ancient history and volunteering at museums.', 3.4),
('liam.smith2@uni.edu', 'uni456', 'Liam', 'Smith', 'Lee', 'Bachelor of Science', 'Computer Science', 3, 0, 'Enjoys coding hackathons and AI projects.', 3.8),
('olivia.brown3@uni.edu', 'cs789', 'Olivia', 'Brown', 'Liv', 'Bachelor of Commerce', 'Accounting', 1, 0, 'Interested in finance and entrepreneurship.', 3.2),
('ethan.taylor4@uni.edu', 'pass321', 'Ethan', 'Taylor', null, 'Bachelor of Engineering', 'Mechanical Engineering', 4, 0, 'Part of the robotics club.', 3.6),
('mia.wilson5@uni.edu', 'pw654', 'Mia', 'Wilson', 'Mimi', 'Bachelor of Science', 'Biology', 2, 0, 'Passionate about marine biology.', 3.5),
('noah.evans6@uni.edu', 'uni111', 'Noah', 'Evans', null, 'Bachelor of IT', 'Software Development', 3, 0, 'Works part-time as a web developer.', 3.7),
('ava.moore7@uni.edu', 'pw222', 'Ava', 'Moore', null, 'Bachelor of Arts', 'Psychology', 1, 0, 'Interested in cognitive science.', 3.1),
('jackson.martin8@uni.edu', 'pwd333', 'Jackson', 'Martin', 'Jack', 'Bachelor of Science', 'Mathematics', 2, 0, 'Enjoys solving puzzles and tutoring.', 3.9),
('isabella.white9@uni.edu', 'pw444', 'Isabella', 'White', 'Bella', 'Bachelor of Design', 'Graphic Design', 2, 0, 'Freelance illustrator.', 3.3),
('henry.lee10@uni.edu', 'pw555', 'Henry', 'Lee', null, 'Bachelor of Engineering', 'Civil Engineering', 4, 0, 'Interned at a construction company.', 3.4);


INSERT INTO Club (name, description, members, img) VALUES
('Chess Club', 'For students who enjoy strategy games and chess tournaments.', 12, '/imgs/chess_club.jpg'),
('Robotics Club', 'Build robots, participate in competitions, and learn engineering skills.', 10, '/imgs/robotics_club.jpg'),
('Drama Club', 'Perform plays, skits, and improve stage presence.', 8, '/imgs/drama_club.jpg'),
('Debate Club', 'Practice debating skills and participate in competitions.', 7, '/imgs/debate_club.jpg'),
('Photography Club', 'Capture moments and learn photography techniques.', 6, '/imgs/photography_club.jpg'),
('Music Club', 'Play instruments, form bands, and enjoy music together.', 9, '/imgs/music_club.jpg'),
('Coding Club', 'Learn programming, work on projects, and participate in hackathons.', 11, '/imgs/coding_club.jpg'),
('Environmental Club', 'Promote sustainability and organize eco-friendly initiatives.', 5, '/imgs/environmental_club.jpg'),
('Art Club', 'Explore drawing, painting, and creative arts.', 7, '/imgs/art_club.jpg'),
('Science Club', 'Conduct experiments and explore scientific concepts.', 6, '/imgs/science_club.jpg');
