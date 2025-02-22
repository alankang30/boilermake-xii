DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_statement TEXT NOT NULL,
    answer TEXT NOT NULL,
    class_name TEXT NOT NULL,
    topic TEXT NOT NULL,
    image TEXT  -- Store image filename
);