// Mock data for Studio Art Skills Frontend demo

export const mockRoles = {
  GUEST: 'guest',
  LEARNER: 'learner',
  MENTOR: 'mentor',
  ADMIN: 'admin'
};

export const mockUsers = [
  {
    id: 'u1',
    name: 'Art Learner',
    email: 'learner@studioart.com',
    role: mockRoles.LEARNER,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'Saya sedang belajar menggambar bentuk dan proporsi wajah. Ingin menguasai seni portrait!',
    points: 150,
    created_at: '2026-01-10T08:00:00Z'
  },
  {
    id: 'u2',
    name: 'Master Mentor',
    email: 'mentor@studioart.com',
    role: mockRoles.MENTOR,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'Artis professional dengan 10+ tahun pengalaman di industri ilustrasi dan fine art. Siap mengulas karya Anda.',
    points: 0,
    created_at: '2025-12-01T08:00:00Z'
  },
  {
    id: 'u3',
    name: 'Admin Utama',
    email: 'admin@studioart.com',
    role: mockRoles.ADMIN,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    bio: 'Administrator sistem Studio Art Skills.',
    points: 0,
    created_at: '2025-11-20T08:00:00Z'
  }
];

export const mockModules = [
  {
    id: 'm1',
    title: 'Fundamental Drawing',
    slug: 'fundamental-drawing',
    level: 'Beginner',
    category: 'Drawing',
    description: 'Pelajari dasar-dasar menggambar mulai dari kontrol garis kasar, konstruksi bentuk 3D, perspektif, dan proporsi dasar objek sehari-hari.',
    thumbnail_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&h=400&q=80',
    is_published: true,
    order_no: 1,
    lesson_count: 2
  },
  {
    id: 'm2',
    title: 'Shading and Light',
    slug: 'shading-and-light',
    level: 'Intermediate',
    category: 'Technique',
    description: 'Kuasai pencahayaan, value scale, rendering bayangan jatuh, highlight, dan cara memvisualisasikan volume serta kedalaman pada gambar.',
    thumbnail_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80',
    is_published: true,
    order_no: 2,
    lesson_count: 2
  },
  {
    id: 'm3',
    title: 'Color and Composition',
    slug: 'color-and-composition',
    level: 'Intermediate',
    category: 'Teori & Desain',
    description: 'Belajar tentang teori warna, harmoni warna, pembagian nilai focal point, kontras, dan bagaimana mendesain komposisi visual yang dinamis.',
    thumbnail_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&h=400&q=80',
    is_published: true,
    order_no: 3,
    lesson_count: 2
  },
  {
    id: 'm4',
    title: 'Subject Practice',
    slug: 'subject-practice',
    level: 'Advanced',
    category: 'Drawing',
    description: 'Penerapan langsung menggambar Still Life, Portrait manusia dengan detail anatomis, Landscape alam bebas, dan Figure Drawing yang dinamis.',
    thumbnail_url: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=600&h=400&q=80',
    is_published: true,
    order_no: 4,
    lesson_count: 2
  },
  {
    id: 'm5',
    title: 'Final Project',
    slug: 'final-project',
    level: 'Professional',
    category: 'Portfolio',
    description: 'Kerjakan sebuah proyek seni mandiri dari perencanaan ide kasar, sketsa, rendering akhir, hingga penyusunan portofolio digital yang siap dipamerkan.',
    thumbnail_url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&h=400&q=80',
    is_published: true,
    order_no: 5,
    lesson_count: 2
  }
];

export const mockLessons = [
  // Fundamental Drawing (m1)
  {
    id: 'l1',
    module_id: 'm1',
    title: 'Kontrol Garis dan Gambar Bentuk Dasar',
    content: `
      <h2>Tujuan Pembelajaran</h2>
      <p>Melatih koordinasi tangan-mata untuk menghasilkan garis yang lurus, melengkung dengan stabil, dan menyusunnya menjadi bentuk 3D dasar (kotak, bola, silinder).</p>
      
      <h2>Langkah Latihan</h2>
      <ol>
        <li>Buat satu lembar kertas penuh dengan coretan garis lurus horizontal, vertikal, dan diagonal sejajar tanpa menggunakan penggaris.</li>
        <li>Gambar 5 buah lingkaran sempurna secara berulang hingga halus, kemudian lakukan hal yang sama untuk kotak dan segitiga.</li>
        <li>Ubah bentuk 2D tersebut menjadi 3D: kotak menjadi kubus, lingkaran menjadi bola dengan melingkarkan garis kontur, segitiga menjadi kerucut.</li>
      </ol>
      
      <h2>Tips Praktis</h2>
      <p>Gunakan gerakan seluruh lengan bawah (dari siku atau bahu), bukan hanya pergelangan tangan, untuk menghasilkan garis panjang yang lebih stabil.</p>
    `,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    checklist_json: [
      'Membuat lembar latihan garis (min 20 garis per arah)',
      'Menggambar bentuk 3D dasar (kubus, bola, silinder)',
      'Menampilkan perspektif 1-titik hilang pada kubus'
    ],
    order_no: 1,
    is_published: true,
    rubrics: [
      { id: 'r1', criterion: 'Akurasi Garis (Kehalusan & Kontrol)', weight: 3, max_score: 10 },
      { id: 'r2', criterion: 'Bentuk & Konstruksi 3D', weight: 4, max_score: 10 },
      { id: 'r3', criterion: 'Penerapan Perspektif Dasar', weight: 3, max_score: 10 }
    ]
  },
  {
    id: 'l2',
    module_id: 'm1',
    title: 'Perspektif 2-Titik Hilang dan Struktur Ruang',
    content: `
      <h2>Konsep Perspektif 2-Titik Hilang</h2>
      <p>Perspektif dua titik hilang digunakan untuk menggambar objek dari sudut pandang miring (ujung objek menghadap penonton), di mana garis horizontal berujung pada dua titik terpisah di garis cakrawala.</p>
      
      <h2>Latihan Praktis</h2>
      <p>Gambarkan susunan jalanan kota sederhana yang menampilkan minimal 3 gedung di kiri dan kanan jalan menggunakan grid perspektif 2-titik hilang.</p>
    `,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    checklist_json: [
      'Menentukan garis Horizon dan 2 Titik Hilang',
      'Menggambar struktur kubus di bawah dan di atas garis horizon',
      'Menambahkan detail pintu/jendela gedung yang mengikuti perspektif'
    ],
    order_no: 2,
    is_published: true,
    rubrics: [
      { id: 'r4', criterion: 'Konsistensi Titik Hilang', weight: 4, max_score: 10 },
      { id: 'r5', criterion: 'Detail Objek Berperspektif', weight: 3, max_score: 10 },
      { id: 'r6', criterion: 'Kerapian Garis Konstruksi', weight: 3, max_score: 10 }
    ]
  },
  // Shading and Light (m2)
  {
    id: 'l3',
    module_id: 'm2',
    title: 'Memahami Value Scale dan Gradasi Halus',
    content: `
      <h2>Pentingnya Value (Nilai Terang-Gelap)</h2>
      <p>Value adalah seberapa terang atau gelap suatu warna. Dalam seni hitam putih, value scale membantu memberikan kontras yang membuat karya terlihat bervolume.</p>
    `,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    checklist_json: [
      'Membuat 9-step Value Scale dari putih mutlak ke hitam mutlak',
      'Membuat gradasi warna halus tanpa garis batas tegas'
    ],
    order_no: 1,
    is_published: true,
    rubrics: [
      { id: 'r7', criterion: 'Ketepatan Value Steps', weight: 5, max_score: 10 },
      { id: 'r8', criterion: 'Kehalusan Blend Gradasi', weight: 5, max_score: 10 }
    ]
  },
  {
    id: 'l4',
    module_id: 'm2',
    title: 'Rendering Cahaya pada Objek Bola (Volume & Bayangan)',
    content: `
      <h2>5 Elemen Pencahayaan</h2>
      <p>Untuk menggambar bola bervolume, Anda harus menampilkan: Highlight, Midtone, Core Shadow, Reflected Light, dan Cast Shadow.</p>
    `,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    checklist_json: [
      'Menampilkan 5 elemen cahaya pada bola',
      'Menggambar bayangan jatuh (cast shadow) yang realistis'
    ],
    order_no: 2,
    is_published: true,
    rubrics: [
      { id: 'r9', criterion: 'Peletakan Core Shadow', weight: 4, max_score: 10 },
      { id: 'r10', criterion: 'Bayangan Jatuh & Reflected Light', weight: 4, max_score: 10 },
      { id: 'r11', criterion: 'Bentuk Volume Bola', weight: 2, max_score: 10 }
    ]
  }
];

export const mockBadges = [
  { id: 'b1', code: 'beginner-sketcher', name: 'Beginner Sketcher', description: 'Menyelesaikan modul Fundamental Drawing pertama Anda.', icon_url: '✏️', points: 50 },
  { id: 'b2', code: 'shading-starter', name: 'Shading Starter', description: 'Berhasil mengunggah latihan value scale dengan nilai di atas 80.', icon_url: '🌓', points: 100 },
  { id: 'b3', code: 'portfolio-maker', name: 'Portfolio Maker', description: 'Memiliki 3 atau lebih karya seni di portofolio digital.', icon_url: '💼', points: 150 },
  { id: 'b4', code: 'master-creator', name: 'Master Creator', description: 'Menyelesaikan Modul Final Project akhir.', icon_url: '👑', points: 300 }
];

export const mockUserBadges = [
  { id: 'ub1', user_id: 'u1', badge_id: 'b1', earned_at: '2026-01-15T09:30:00Z' },
  { id: 'ub2', user_id: 'u1', badge_id: 'b2', earned_at: '2026-02-05T14:20:00Z' }
];

export const mockSubmissions = [
  {
    id: 's1',
    user_id: 'u1',
    user_name: 'Art Learner',
    lesson_id: 'l1',
    lesson_title: 'Kontrol Garis dan Gambar Bentuk Dasar',
    title: 'Latihan Garis dan Kubus 3D',
    file_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80',
    note: 'Saya merasa garis vertikal saya masih agak miring, namun kubus dan perspektif 1-titik hilang sudah saya coba sesuaikan dengan modul. Mohon arahannya mentor.',
    status: 'reviewed',
    submitted_at: '2026-01-14T10:00:00Z',
    reviewed_at: '2026-01-15T09:30:00Z',
    feedback: {
      id: 'f1',
      mentor_id: 'u2',
      mentor_name: 'Master Mentor',
      comment: 'Kerja bagus untuk pemula! Kontrol garis Anda sudah cukup baik. Kubus yang Anda buat memiliki proporsi yang cukup akurat. Sedikit koreksi pada kemiringan garis vertikal agar benar-benar tegak lurus dengan horizon. Teruslah berlatih!',
      score: 85,
      rubric_scores: [
        { criterion_id: 'r1', score: 8, max_score: 10, name: 'Akurasi Garis (Kehalusan & Kontrol)' },
        { criterion_id: 'r2', score: 9, max_score: 10, name: 'Bentuk & Konstruksi 3D' },
        { criterion_id: 'r3', score: 8, max_score: 10, name: 'Penerapan Perspektif Dasar' }
      ]
    }
  },
  {
    id: 's2',
    user_id: 'u1',
    user_name: 'Art Learner',
    lesson_id: 'l2',
    lesson_title: 'Perspektif 2-Titik Hilang dan Struktur Ruang',
    title: 'Gedung Kota Perspektif 2 Titik',
    file_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&h=400&q=80',
    note: 'Mencoba membuat suasana pertokoan. Mengalami kesulitan menyelaraskan garis jendela ke titik hilang kanan.',
    status: 'submitted',
    submitted_at: '2026-07-22T04:12:00Z',
    reviewed_at: null,
    feedback: null
  }
];

export const mockPortfolio = [
  {
    id: 'p1',
    user_id: 'u1',
    title: 'Kubus 3D dalam Ruang',
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80',
    reflection: 'Latihan menggambar bentuk geometri 3D pertama kali. Memahami volume dan bagaimana garis mendefinisikan ruang.',
    tags: ['Basic', '3D Shape', 'Graphite'],
    is_featured: true,
    created_at: '2026-01-14T10:00:00Z'
  },
  {
    id: 'p2',
    user_id: 'u1',
    title: 'Value Scale Gradasi Arsir',
    image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&h=400&q=80',
    reflection: 'Eksperimen arsir pensil 2B, 4B, dan 6B. Sangat menyenangkan membuat transisi dari terang ke gelap.',
    tags: ['Shading', 'Value Scale'],
    is_featured: false,
    created_at: '2026-02-04T12:00:00Z'
  }
];

export const mockProgress = [
  { id: 'pr1', user_id: 'u1', module_id: 'm1', percent_complete: 100, last_activity: '2026-07-22T04:12:00Z' },
  { id: 'pr2', user_id: 'u1', module_id: 'm2', percent_complete: 0, last_activity: '2026-07-22T05:00:00Z' }
];

export const mockActivityLogs = [
  { id: 'al1', user_id: 'u1', action: 'Mengunggah tugas', entity_type: 'submission', entity_id: 's2', created_at: '2026-07-22T04:12:00Z' },
  { id: 'al2', user_id: 'u1', action: 'Memulai belajar', entity_type: 'module', entity_id: 'm2', created_at: '2026-07-22T05:00:00Z' }
];
