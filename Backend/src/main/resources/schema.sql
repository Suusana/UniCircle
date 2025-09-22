DROP TABLE IF EXISTS main.Timetable_item;
DROP TABLE IF EXISTS main.Timetable;
DROP TABLE IF EXISTS main.Review;
DROP TABLE IF EXISTS main.Assignment;
DROP TABLE IF EXISTS main.Class;
DROP TABLE IF EXISTS main.Subject;
DROP TABLE IF EXISTS main.Request;
DROP TABLE IF EXISTS main.Registration;
DROP TABLE IF EXISTS main.Post;
DROP TABLE IF EXISTS main.Membership;
DROP TABLE IF EXISTS main.Friendship;
DROP TABLE IF EXISTS main.Comment;
DROP TABLE IF EXISTS main.Appointment;
DROP TABLE IF EXISTS main.Event;
DROP TABLE IF EXISTS main.Club;
DROP TABLE IF EXISTS main.Student;
DROP TABLE IF EXISTS main.Shortcut;
DROP TABLE IF EXISTS main.Lecturer;
DROP TABLE IF EXISTS Enrollment;

CREATE TABLE IF NOT EXISTS main.Admin
(
   admin_id integer not null
       constraint Admin_pk
           primary key autoincrement,
   name     varchar(255),
   email    varchar(255),
   password varchar(255)
);

CREATE TABLE IF NOT EXISTS Club
(
   club_id     integer     not null
       constraint Club_pk
           primary key autoincrement,
   name        varchar(50) not null,
   description text        not null,
   members     integer default 0,
   img         varchar(255) not null
);

CREATE TABLE IF NOT EXISTS Event
(
   event_id    INTEGER
       primary key autoincrement,
   club_id     INTEGER not null
       References Club,
   title       varchar(255) not null,
   description TEXT,
   location    varchar(255),
   start_time  DATETIME not null,
   end_time    DATETIME not null,
   student_id  integer not null References Student(student_id),
   status      varchar(50) default 'Upcoming' not null,
   check (status IN ('Upcoming', 'Completed', 'Cancelled'))
);

CREATE TABLE IF NOT EXISTS main.Lecturer
(
   lecturer_id INTEGER
       primary key autoincrement,
   first_name  VARCHAR(50)  not null,
   last_name   VARCHAR(50)  not null,
   email       VARCHAR(255) not null,
   faculty     VARCHAR(50)  not null,
   status      VARCHAR(10)  not null,
   check (status IN ('Active', 'Inactive'))
);

CREATE TABLE IF NOT EXISTS main.Shortcut
(
   shortcut_id INTEGER
       primary key autoincrement,
   name        VARCHAR(50)  not null,
   url         VARCHAR(100) not null
);

CREATE TABLE IF NOT EXISTS main.Student
(
   student_id integer not null
       constraint Student_pk
           primary key autoincrement,
   email      varchar(255) not null,
   password   varchar(255) not null,
   first_name varchar(50),
   last_name  varchar(50),
   preferred_name varchar(50),
   degree     varchar(50),
   major      varchar(50),
   year       integer,
   type       boolean,
   description TEXT,
   Academic_record Numeric
);

CREATE TABLE IF NOT EXISTS main.Appointment
(
   appointment_id INTEGER
       primary key autoincrement,
   student_id     INTEGER not null
       References Student,
   date           DATE not null,
   time_slot      TEXT not null,
   status         TEXT default 'Booked' not null,
   title          TEXT not null,
   description    TEXT,
   check (status IN ('Cancelled', 'Completed', 'Booked')),
   check (time_slot IN (
                        '10:00-11:00',
                        '11:00-12:00',
                        '12:00-13:00',
                        '13:00-14:00',
                        '14:00-15:00',
                        '15:00-16:00',
                        '16:00-17:00',
                        '17:00-18:00',
                        '18:00-19:00',
                        '19:00-20:00'
       ))
);

CREATE TABLE IF NOT EXISTS main.Comment
(
   comment_id INTEGER
       primary key autoincrement,
   student_id INTEGER not null
       References Student,
   created_at DATETIME default (datetime('now')) not null,
   content    VARCHAR(500) not null
);

CREATE TABLE IF NOT EXISTS main.Friendship
(
   friendship_id INTEGER
       primary key autoincrement,
   student_id    INTEGER not null
       References Student,
   student_id2   INTEGER not null
       references Student,
   status        TEXT default 'Pending' not null,
   check (status IN ('Pending', 'Accepted', 'Declined'))
);

CREATE TABLE IF NOT EXISTS main.Membership
(
   membership_id INTEGER
       primary key autoincrement,
   student_id    INTEGER not null
       References Student,
   club_id       INTEGER not null
       References Club,
   role          TEXT not null,
   check (role IN ('Club Owner', 'Club Admin', 'Member'))
);

CREATE TABLE IF NOT EXISTS main.Post
(
   post_id    INTEGER
       primary key autoincrement,
   student_id INTEGER not null
       References Student,
   created_at DATETIME default (datetime('now')) not null,
   updated_at DATETIME default (datetime('now')) not null,
   title      VARCHAR(50) not null,
   category   VARCHAR(30) not null,
   content    VARCHAR(500) not null,
   check (category IN ('clubs', 'academics', 'events'))
);

CREATE TABLE IF NOT EXISTS main.Registration
(
   registration_id INTEGER
       primary key autoincrement,
   event_id        INTEGER not null
       References Event,
   student_id      INTEGER not null
       References Student,
   checked_in      BOOLEAN default 0 not null
);

CREATE TABLE IF NOT EXISTS main.Request
(
   request_id   INTEGER
       primary key autoincrement,
   student_id   INTEGER not null
       References Student,
   club_id      INTEGER References Club,
   request_type varchar(20) not null,
   club_name    VARCHAR(50) not null,
   description  TEXT,
   status       varchar(20) default 'Pending' not null,
   check (request_type IN ('Creation', 'Deletion')),
   check (status IN ('Pending', 'Approved', 'Rejected'))
);

CREATE TABLE IF NOT EXISTS main.Subject
(
   subject_id INTEGER
       primary key autoincrement,
   name       VARCHAR(50) not null,
   faculty    VARCHAR(50) not null,
   credit     INTEGER
);

CREATE TABLE IF NOT EXISTS main.Class
(
   class_id    INTEGER
       primary key autoincrement,
   subject_id  INTEGER not null
       References Subject,
   type        VARCHAR(15) not null,
   semester    VARCHAR(15) not null,
   year        INTEGER not null,
   day_of_week VARCHAR(15) not null,
   start_time  DATETIME not null,
   end_time    DATETIME not null,
   location    VARCHAR(50),
   check (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
   check (type IN ('Lecture', 'Tutorial', 'Lab', 'Workshop'))
);

CREATE TABLE IF NOT EXISTS main.Assignment
(
   assignment_id INTEGER
       primary key autoincrement,
   lecturer_id   INTEGER not null
       references Lecturer,
   class_id      INTEGER not null
       references Class
);

CREATE TABLE IF NOT EXISTS main.Review
(
   review_id   INTEGER
       primary key autoincrement,
   student_id  INTEGER not null
       references Student,
   target_type TEXT not null,
   subject_id  INTEGER references Subject,
   lecturer_id INTEGER references Lecturer,
   rate        FLOAT,
   description VARCHAR(255),
   created_at  DATETIME default (datetime('now')) not null,
   updated_at  DATETIME default (datetime('now')) not null,
   check (target_type IN ('Subject', 'Lecturer'))
);

CREATE TABLE IF NOT EXISTS main.Timetable
(
   timetable_id INTEGER
       primary key autoincrement,
   student_id   INTEGER not null
       references Student,
   semester     VARCHAR(15) not null,
   year         INTEGER not null
);

CREATE TABLE IF NOT EXISTS main.Timetable_item
(
   item_id      INTEGER
       primary key autoincrement,
   timetable_id INTEGER not null
       references Timetable,
   class_id     INTEGER references Class,
   event_id     INTEGER references Event
);

CREATE TABLE IF NOT EXISTS Enrollment (
   enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
   student_id  INTEGER NOT NULL REFERENCES Student(student_id) ON DELETE CASCADE,
   subject_id  INTEGER NOT NULL REFERENCES Subject(subject_id) ON DELETE CASCADE,
   Grade Numeric,
   UNIQUE (student_id, subject_id)
);
