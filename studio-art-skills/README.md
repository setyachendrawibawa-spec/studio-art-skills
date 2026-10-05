# Studio Art Skills

Studio Art Skills adalah platform pembelajaran seni interaktif berbasis web. Pengguna dapat belajar dari materi terstruktur (Modul & Pelajaran), mencentang checklist latihan, mengunggah foto hasil karya seni, mendapatkan ulasan langsung dan skor dari mentor berdasarkan rubrik penilaian, meraih lencana (badge) pencapaian, serta membangun portofolio seni digital pribadi.

Proyek ini telah dibuat secara lengkap dan terstruktur di direktori:
`C:\Users\SETYABOWOLEE\.gemini\antigravity\scratch\studio-art-skills`

---

## 🎨 Menjalankan Aplikasi Instan di Browser

Karena Node.js/NPM saat ini tidak terdeteksi pada terminal sistem Anda, kami telah menyediakan file **Prototype Interaktif Mandiri** (`prototype.html`) yang dapat dijalankan secara instan langsung di browser Anda tanpa perlu menginstal dependensi apa pun!

### Cara Membuka:
1. Buka File Explorer Anda.
2. Arahkan ke: `C:\Users\SETYABOWOLEE\.gemini\antigravity\scratch\studio-art-skills\`
3. Klik dua kali pada file [prototype.html](file:///C:/Users/SETYABOWOLEE/.gemini/antigravity/scratch/studio-art-skills/prototype.html).
4. Aplikasi akan langsung berjalan di browser Anda dengan fitur interaktif penuh!

### Akun Demo Akses Instan di Prototype:
Gunakan tombol **Akses Akun Demo** di halaman login untuk beralih peran:
- **Learner (Siswa)**: email `learner@studioart.com` (unggah karya seni, centang checklist latihan, lihat skor)
- **Mentor (Penilai)**: email `mentor@studioart.com` (menilai tugas pending siswa dengan rubrik slider, menulis komentar)
- **Admin (Sistem)**: email `admin@studioart.com` (kelola modul dengan form tambah modul, lihat statistik database)

---

## 📂 Peta Struktur File Proyek

Berikut adalah file lengkap React/Vite (Frontend) dan Node+Express+PostgreSQL (Backend) yang telah berhasil kami buat untuk Anda:

```text
studio-art-skills/
├── index.html                   # Entry point template HTML frontend + SEO
├── package.json                 # Konfigurasi package React & dependencies
├── vite.config.js               # Konfigurasi bundler Vite + proxy API
├── prototype.html               # File prototype instan di browser
├── src/
│   ├── main.jsx                 # Initializer React
│   ├── App.jsx                  # Main component App wrapping provider & router
│   ├── styles/
│   │   └── global.css           # Desain sistem & style token gelap elegan
│   ├── context/
│   │   └── AuthContext.jsx      # Autentikasi state, login/register API & fallback
│   ├── data/
│   │   └── mockData.js          # Mock data modular untuk demo offline
│   ├── routes/
│   │   └── AppRoutes.jsx        # Virtual router & guards role-based access
│   ├── layouts/
│   │   ├── PublicLayout.jsx     # Layout publik untuk landing page, login & register
│   │   └── AppLayout.jsx        # Layout dashboard workspace dengan sidebar navigasi
│   ├── components/
│   │   ├── Navbar.jsx           # Navigasi publik & profile widget
│   │   ├── Footer.jsx           # Kaki halaman SEO & credits
│   │   ├── StatCard.jsx         # Kartu indikator data dengan count-up animation
│   │   ├── ModuleCard.jsx       # Grid preview silabus modul
│   │   ├── LessonCard.jsx       # Accordion bar untuk silabus materi
│   │   ├── SubmissionCard.jsx   # Review visual status tugas & skor
│   │   └── ProgressBar.jsx      # Progress bar horizontal interaktif
│   └── pages/
│       ├── HomePublic.jsx       # Landing page (tampilan pertama sebelum login)
│       ├── Login.jsx            # Form login dengan demo credentials
│       ├── Register.jsx         # Form registrasi learner baru
│       ├── LearnerDashboard.jsx # Progress tracker siswa, checklist, & badges
│       ├── Modules.jsx          # Katalog modul lengkap + search & filter level
│       ├── ModuleDetail.jsx     # Detail modul & susunan pelajaran
│       ├── Lesson.jsx           # Halaman kelas (video tutorial, checklist, & submit form)
│       ├── UploadWork.jsx       # Form unggah karya ke portofolio
│       ├── Feedback.jsx         # Panel koreksi mentor / riwayat review siswa
│       ├── Portfolio.jsx        # Pameran portofolio grid + lightbox interaktif
│       └── AdminDashboard.jsx   # Kontrol panel admin & CRUD modul/user
└── server/
    ├── package.json             # Konfigurasi package backend Node & Express
    ├── server.js                # Express Server entrypoint, middleware, & routes
    ├── db.js                    # Database setup, pg pool, & auto migration trigger
    ├── schema.sql               # Skema PostgreSQL DDL (12 tabel relational)
    ├── seed.sql                 # Seed SQL data awal (roles, default modules, lessons, badges)
    ├── middleware/
    │   └── authMiddleware.js    # JWT token validator & check role middleware
    └── routes/
        ├── authRoutes.js        # API auth endpoints (/api/auth/register, login, me)
        ├── publicRoutes.js      # API public endpoints (/api/public/modules, portfolio)
        └── apiRoutes.js         # API protected actions (/api/submissions, feedback, stats)
```

---

## 🛠️ Langkah Menjalankan Versi Full-Stack (Developer Guide)

Jika Anda ingin menjalankan aplikasi secara full-stack menggunakan database PostgreSQL lokal:

### 1. Prasyarat:
Pastikan Anda telah menginstal **Node.js** dan **PostgreSQL** di komputer Anda, lalu tambahkan lokasinya ke dalam PATH System Variables Anda.

### 2. Setup Database PostgreSQL:
1. Buat database kosong bernama `studio_art_skills`.
2. Di dalam file `server/db.js`, sesuaikan URL koneksi PostgreSQL Anda pada variabel `connectionString` (atau buat file `.env` di dalam folder `server/` dan masukkan `DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/studio_art_skills`).

### 3. Jalankan Backend Express:
1. Buka terminal baru dan arahkan ke folder server:
   ```bash
   cd C:\Users\SETYABOWOLEE\.gemini\antigravity\scratch\studio-art-skills\server
   ```
2. Instal dependensi backend:
   ```bash
   npm install
   ```
3. Mulai server backend:
   ```bash
   npm run dev
   ```
   *(Backend akan otomatis terhubung ke PostgreSQL, membuat seluruh tabel dari `schema.sql`, memasukkan seed data dari `seed.sql`, dan mendengarkan request di http://localhost:5000)*

### 4. Jalankan Frontend React/Vite:
1. Buka terminal kedua dan arahkan ke folder root:
   ```bash
   cd C:\Users\SETYABOWOLEE\.gemini\antigravity\scratch\studio-art-skills
   ```
2. Instal dependensi frontend:
   ```bash
   npm install
   ```
3. Mulai server pengembangan Vite:
   ```bash
   npm run dev
   ```
4. Buka http://localhost:3000 di browser Anda untuk menjelajahi aplikasi full-stack!
