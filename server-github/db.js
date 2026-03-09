const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "grades.db"));

// 테이블 초기화
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id  TEXT NOT NULL DEFAULT 'default',
    year        INTEGER,
    semester    TEXT,
    course_id   TEXT NOT NULL,
    course_name TEXT,
    credits     INTEGER,
    grade       TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;
