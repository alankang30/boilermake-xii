DROP TABLE IF EXISTS questions;

CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_statement TEXT NOT NULL,
    answer TEXT NOT NULL,
    class_name TEXT NOT NULL,
    topic TEXT NOT NULL,
    difficulty TEXT CHECK(difficulty IN ('Easy', 'Medium', 'Hard')) DEFAULT 'Medium',
    image TEXT  -- Store image filename
);