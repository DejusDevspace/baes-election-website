-- TABLE FOR STUDENTS' DETAILS
DROP TABLE IF EXISTS students CASCADE;
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    level INT NOT NULL,
    matric_no VARCHAR(20) NOT NULL,
    department VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    pin VARCHAR(255) NOT NULL
);

-- TABLE FOR CANDIDATES' DETAILS
DROP TABLE IF EXISTS candidates CASCADE;
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    department VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    votes_count INT DEFAULT 0
);

-- TABLE FOR VOTES
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    voter INT NOT NULL REFERENCES students(id),
    candidate_id INT NOT NULL REFERENCES candidates(id)
);

-- DUMMY DATA FOR CANDIDATES
INSERT INTO candidates (name, position, level, department, image)
VALUES 
('John Doe', 'President', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Doe', 'President', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),

('Mark Him', 'Vice President', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),
('Jane She', 'Vice President', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'General Secretary', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'General Secretary', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'General Secretary', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'General Secretary', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Doe', 'Assistant General Secretary', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Girl', 'Assitant General Secretary', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Treasurer', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Treasurer', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Financial Secretary', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Financial Secretary', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Sports Director', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Sports Director', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Assistant Sports Director', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Assistant Sports Director', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Social Director', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Social Director', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Assistant Social Director', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Assistant Social Director', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Academic Director', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Academic Director', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Assistant Academic Director', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Assistant Academic Director', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Welfare Director', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Welfare Director', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Assistant Welfare Director', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Assistant Welfare Director', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'P.R.O', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'P.R.O', 300, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('James Man', 'Senate Chairman', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Woman', 'Deputy Senate Chairman', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),

('John Doe', 'Senate Head', 200, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Mary Doe', 'Senate Chairman', 500, 'Mechatronics Engineering', 'assets/img/candidates/image526.png'),
('Jack Harry', 'Senate Head', 500, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),
('Blake James', 'Senate Head', 300, 'Mechatronics Engineering', 'assets/img/candidates/image525.png'),
('Invalid Dan', 'Senate Head', 300, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png'),
('Jane Glory', 'Senate Head', 400, 'Electrical and Electronics Engineering', 'assets/img/candidates/image526.png'),
('Mark Doe', 'Deputy Senate Chairman', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image525.png'),
('Paul Doe', 'Senate Head', 400, 'Mechatronics Engineering', 'assets/img/candidates/image524.png'),
('Jake Paul', 'Senate Head', 500, 'Electrical and Electronics Engineering', 'assets/img/candidates/image524.png')
