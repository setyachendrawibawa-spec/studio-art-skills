-- Seed SQL file for Studio Art Skills
-- Recommended: Run after schema.sql

-- 1. Insert Roles
INSERT INTO roles (id, name, description) VALUES
('d14e7a1a-4c28-4e89-9db8-0d04c4ee5101', 'guest', 'Hanya melihat homepage, modul demo, dan portofolio.'),
('d14e7a1a-4c28-4e89-9db8-0d04c4ee5102', 'learner', 'Mengakses lesson, mengunggah tugas latihan, melihat feedback & skor, mengoleksi badge, dan membangun portofolio.'),
('d14e7a1a-4c28-4e89-9db8-0d04c4ee5103', 'mentor', 'Menilai submission karya siswa, memberikan masukan, dan menginput skor rubrik.'),
('d14e7a1a-4c28-4e89-9db8-0d04c4ee5104', 'admin', 'Memiliki akses CRUD penuh ke sistem, user, modul, lesson, dan dashboard statistik.')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Users (Password is 'password123' hashed with bcrypt)
INSERT INTO users (id, role_id, name, email, password_hash, avatar_url, bio) VALUES
('u14e7a1a-4c28-4e89-9db8-0d04c4ee5201', 'd14e7a1a-4c28-4e89-9db8-0d04c4ee5102', 'Art Learner', 'learner@studioart.com', '$2a$10$X879l1B7o/v7q1r1K9r4xebN/t6a7zO9.m.R4XkL4H2E1z85p0s8i', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80', 'Saya sedang belajar menggambar bentuk dan proporsi wajah.'),
('u14e7a1a-4c28-4e89-9db8-0d04c4ee5202', 'd14e7a1a-4c28-4e89-9db8-0d04c4ee5103', 'Master Mentor', 'mentor@studioart.com', '$2a$10$X879l1B7o/v7q1r1K9r4xebN/t6a7zO9.m.R4XkL4H2E1z85p0s8i', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', 'Artis professional dengan 10+ tahun pengalaman di industri ilustrasi dan fine art.'),
('u14e7a1a-4c28-4e89-9db8-0d04c4ee5203', 'd14e7a1a-4c28-4e89-9db8-0d04c4ee5104', 'Admin Utama', 'admin@studioart.com', '$2a$10$X879l1B7o/v7q1r1K9r4xebN/t6a7zO9.m.R4XkL4H2E1z85p0s8i', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80', 'Administrator utama Studio Art Skills.')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Modules
INSERT INTO modules (id, title, slug, level, category, description, thumbnail_url, order_no) VALUES
('m14e7a1a-4c28-4e89-9db8-0d04c4ee5301', 'Fundamental Drawing', 'fundamental-drawing', 'Beginner', 'Drawing', 'Pelajari dasar-dasar menggambar mulai dari kontrol garis kasar, konstruksi bentuk 3D, perspektif, dan proporsi dasar objek sehari-hari.', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&h=400&q=80', 1),
('m14e7a1a-4c28-4e89-9db8-0d04c4ee5302', 'Shading and Light', 'shading-and-light', 'Intermediate', 'Technique', 'Kuasai pencahayaan, value scale, rendering bayangan jatuh, highlight, dan cara memvisualisasikan volume serta kedalaman pada gambar.', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80', 2),
('m14e7a1a-4c28-4e89-9db8-0d04c4ee5303', 'Color and Composition', 'color-and-composition', 'Intermediate', 'Teori & Desain', 'Belajar tentang teori warna, harmoni warna, pembagian nilai focal point, kontras, dan bagaimana mendesain komposisi visual yang dinamis.', 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&h=400&q=80', 3),
('m14e7a1a-4c28-4e89-9db8-0d04c4ee5304', 'Subject Practice', 'subject-practice', 'Advanced', 'Drawing', 'Penerapan langsung menggambar Still Life, Portrait manusia dengan detail anatomis, Landscape alam bebas, dan Figure Drawing yang dinamis.', 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=600&h=400&q=80', 4),
('m14e7a1a-4c28-4e89-9db8-0d04c4ee5305', 'Final Project', 'final-project', 'Professional', 'Portfolio', 'Kerjakan sebuah proyek seni mandiri dari perencanaan ide kasar, sketsa, rendering akhir, hingga penyusunan portofolio digital yang siap dipamerkan.', 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&h=400&q=80', 5)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Lessons
INSERT INTO lessons (id, module_id, title, content, video_url, checklist_json, order_no) VALUES
(
  'l14e7a1a-4c28-4e89-9db8-0d04c4ee5401', 
  'm14e7a1a-4c28-4e89-9db8-0d04c4ee5301', 
  'Kontrol Garis dan Gambar Bentuk Dasar', 
  '<h2>Tujuan Latihan</h2><p>Melatih koordinasi tangan-mata untuk menghasilkan garis stabil lurus dan melengkung serta menyusunnya menjadi bentuk 3D dasar.</p>', 
  'https://www.youtube.com/embed/UOC8ISSbFx0', 
  '["Membuat lembar latihan garis lurus", "Menggambar kubus 3D", "Penerapan perspektif 1-titik"]'::jsonb, 
  1
),
(
  'l14e7a1a-4c28-4e89-9db8-0d04c4ee5402', 
  'm14e7a1a-4c28-4e89-9db8-0d04c4ee5301', 
  'Perspektif 2-Titik Hilang dan Struktur Ruang', 
  '<h2>Teori Perspektif 2-Titik</h2><p>Memahami bagaimana menggambar sudut gedung atau perkotaan dengan cakrawala garis horizontal yang menuju ke dua titik hilang terpisah.</p>', 
  'https://www.youtube.com/embed/pufj4-xgYE8', 
  '["Menentukan garis Horizon", "Menggambar 3 gedung dengan perspektif 2-titik", "Menambahkan detail pintu berperspektif"]'::jsonb, 
  2
)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Badges
INSERT INTO badges (id, code, name, description, icon_url, points) VALUES
('b14e7a1a-4c28-4e89-9db8-0d04c4ee5501', 'beginner-sketcher', 'Beginner Sketcher', 'Menyelesaikan modul Fundamental Drawing pertama Anda.', '✏️', 50),
('b14e7a1a-4c28-4e89-9db8-0d04c4ee5502', 'shading-starter', 'Shading Starter', 'Berhasil mengunggah latihan value scale dengan nilai di atas 80.', '🌓', 100),
('b14e7a1a-4c28-4e89-9db8-0d04c4ee5503', 'portfolio-maker', 'Portfolio Maker', 'Memiliki 3 atau lebih karya seni di portofolio digital.', '💼', 150)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Rubric Items
INSERT INTO rubric_items (id, lesson_id, criterion, weight, max_score, order_no) VALUES
('r14e7a1a-4c28-4e89-9db8-0d04c4ee5601', 'l14e7a1a-4c28-4e89-9db8-0d04c4ee5401', 'Akurasi Garis (Kehalusan & Kontrol)', 3, 10, 1),
('r14e7a1a-4c28-4e89-9db8-0d04c4ee5602', 'l14e7a1a-4c28-4e89-9db8-0d04c4ee5401', 'Bentuk & Konstruksi 3D', 4, 10, 2),
('r14e7a1a-4c28-4e89-9db8-0d04c4ee5603', 'l14e7a1a-4c28-4e89-9db8-0d04c4ee5401', 'Penerapan Perspektif Dasar', 3, 10, 3)
ON CONFLICT (id) DO NOTHING;
