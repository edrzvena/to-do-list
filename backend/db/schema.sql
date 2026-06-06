-- ============================================================
--  To-Do List App - Database Schema (PostgreSQL)
-- ============================================================
--  Cara jalanin:
--    psql -U postgres -d todo_list -f schema.sql
--
--  Jalanin URUT dari atas ke bawah (teams -> users -> tasks),
--  karena tabel bawah punya foreign key ke tabel atasnya.
-- ============================================================


-- 1) TEAMS -- tim / divisi
CREATE TABLE teams (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 2) USERS -- akun (register/login)
CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    email          VARCHAR(255) NOT NULL UNIQUE,        -- email gak boleh kembar
    password_hash  TEXT NOT NULL,                       -- simpen HASH, JANGAN password asli
    role           VARCHAR(20) NOT NULL DEFAULT 'member'
                   CHECK (role IN ('member', 'manager')),
    team_id        INTEGER REFERENCES teams(id) ON DELETE SET NULL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 3) TASKS -- daftar tugas
CREATE TABLE tasks (
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    description  TEXT,
    priority     VARCHAR(20) NOT NULL DEFAULT 'medium'
                 CHECK (priority IN ('low', 'medium', 'high')),
    status       VARCHAR(20) NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'in_progress', 'done')),
    deadline     TIMESTAMPTZ,
    assignee_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- pemilik task
    created_by   INTEGER REFERENCES users(id) ON DELETE SET NULL,          -- siapa yg bikin
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 4) INDEX -- biar query sering-pakai jadi cepet
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_status   ON tasks(status);
CREATE INDEX idx_users_team     ON users(team_id);
