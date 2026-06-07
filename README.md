# To-Do List App

Aplikasi to-do list full-stack untuk manajemen task tim. User bisa register/login, bikin & kelola task sendiri, dan manager bisa lihat progress anggota timnya.

## Tech Stack

- **Backend:** Node.js, Express 5, TypeScript (jalan pakai `tsx`)
- **Database:** PostgreSQL (query SQL mentah pakai library `pg`, tanpa ORM)
- **Auth:** `bcryptjs` (hash password) + JWT (`jsonwebtoken`)
- **Frontend:** (coming soon)

## Struktur Folder

```
to-do-list/
├── backend/    # API server (Express + TypeScript)
│   ├── db/             # schema.sql (struktur tabel PostgreSQL)
│   └── src/
│       ├── config/     # koneksi database
│       ├── controllers/# logika tiap endpoint
│       ├── models/     # query SQL ke database
│       ├── routes/     # definisi URL endpoint
│       ├── middleware/ # verifikasi JWT
│       ├── types/      # tipe TypeScript
│       └── utils/      # helper (JWT, dll)
└── frontend/   # (coming soon)
```

## Cara Menjalankan (Backend)

**1. Install dependency**
```bash
cd backend
npm install
```

**2. Siapin file `.env`**

Copy template lalu isi nilainya:
```bash
cp .env.example .env
```
Isi yang dibutuhkan: kredensial PostgreSQL (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`), `PORT`, dan `JWT_SECRET` (string acak yang panjang).

**3. Siapin database**

Bikin database PostgreSQL sesuai `DB_NAME`, lalu jalanin schema di `backend/db/schema.sql` untuk bikin tabelnya.

**4. Jalanin server**
```bash
npm run dev      # server di http://localhost:3000
```
Sukses kalau muncul log `✅ Connected to PostgreSQL` dan `🚀 Server running...`.

## API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Path | Butuh Token | Fungsi |
|--------|------|:-----------:|--------|
| POST | `/auth/register` | ❌ | Daftar user baru |
| POST | `/auth/login` | ❌ | Login, balikin JWT token |
| GET  | `/auth/me` | ✅ | Profil user dari token |
| GET  | `/tasks` | ✅ | Task milik user yang login *(coming soon)* |
| POST | `/tasks` | ✅ | Buat task baru *(coming soon)* |
| PATCH | `/tasks/:id` | ✅ | Update status/isi task *(coming soon)* |
| GET  | `/teams/:id/progress` | ✅ | Manager lihat progress tim *(coming soon)* |

> Endpoint yang butuh token dikirim lewat header: `Authorization: Bearer <token>`

## Status

🚧 Masih dalam pengembangan — modul **Auth** (register, login, me) sudah jalan. Berikutnya: fitur **tasks**.
