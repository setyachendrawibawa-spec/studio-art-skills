import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Image as ImageIcon, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import StatCard from '../components/StatCard';
import ModuleCard from '../components/ModuleCard';
import { mockModules, mockPortfolio } from '../data/mockData';

export default function HomePublic() {
  // Take first 3 modules as featured
  const featuredModules = mockModules.slice(0, 3);
  const portfolioPreview = mockPortfolio.slice(0, 2);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        padding: '100px 0 80px 0', 
        background: 'radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.15), transparent 60%)',
        overflow: 'hidden'
      }}>
        <div className="container grid grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <span className="tag tag-cyan" style={{ width: 'fit-content', fontWeight: 600 }}>🌟 Platform Pembelajaran Seni #1</span>
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '48px', 
              fontWeight: 800, 
              lineHeight: 1.15,
              background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Kuasai Seni Lukis & Gambar dari Nol
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.6 }}>
              Belajar secara terstruktur dengan modul langkah demi langkah. Dapatkan koreksi visual dan feedback skor langsung dari mentor profesional berbasis rubrik penilaian terstandar.
            </p>
            <div className="flex gap-4" style={{ marginTop: '10px' }}>
              <Link to="/register" className="btn btn-primary pulse-glow" style={{ padding: '12px 28px', fontSize: '16px' }}>
                Mulai Belajar Gratis <ArrowRight size={18} />
              </Link>
              <Link to="/modules" className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '16px' }}>
                Lihat Silabus Modul
              </Link>
            </div>
          </div>
          
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '450px',
              height: '350px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px var(--accent-glow)',
              border: '1px solid var(--glass-border)',
              position: 'relative'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Studio Art" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                background: 'rgba(11, 15, 25, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)'
              }}>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Sketsa Dasar & Konstruksi</div>
                <div className="flex justify-between items-center" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span>Modul Fundamental Drawing</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>Demo Gratis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section with counter animation */}
      <section style={{ padding: '40px 0' }}>
        <div className="container grid grid-cols-4">
          <StatCard label="Modul Seni Aktif" value="5" icon={BookOpen} color="var(--accent-cyan)" />
          <StatCard label="Siswa Bergabung" value="1250" icon={Users} color="var(--accent-blue)" />
          <StatCard label="Tugas Dinilai" value="840" icon={ShieldCheck} color="var(--success)" />
          <StatCard label="Karya Portofolio" value="620" icon={ImageIcon} color="var(--reward-gold)" />
        </div>
      </section>

      {/* Benefits section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container flex flex-col gap-12">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Mengapa Belajar di Studio Art?</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Kami merancang alur belajar terstandar akademi dengan pendekatan modern.</p>
          </div>

          <div className="grid grid-cols-3">
            <div className="card card-hover flex flex-col gap-4">
              <div style={{ fontSize: '32px' }}>📖</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Kurikulum Terstruktur</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Dari garis dasar hingga proyek akhir mandiri. Setiap modul dirancang khusus agar Anda tidak kebingungan menentukan arah belajar.
              </p>
            </div>
            <div className="card card-hover flex flex-col gap-4">
              <div style={{ fontSize: '32px' }}>✍️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Feedback Mentor Profesional</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Bukan sekadar pujian kosong. Mentor memberikan evaluasi poin demi poin menggunakan indikator rubrik penilaian yang objektif.
              </p>
            </div>
            <div className="card card-hover flex flex-col gap-4">
              <div style={{ fontSize: '32px' }}>💼</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Portofolio Digital Instan</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Karya-karya terbaik hasil latihan Anda secara otomatis terkumpul ke dalam galeri portofolio online yang bisa dipamerkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Modules Preview */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Silabus Modul Unggulan</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '6px' }}>Mulai belajar hari ini dengan mengakses modul demo kami secara gratis.</p>
            </div>
            <Link to="/modules" className="btn btn-outline" style={{ padding: '8px 16px' }}>Lihat Semua Modul</Link>
          </div>

          <div className="grid grid-cols-3">
            {featuredModules.map(mod => (
              <ModuleCard key={mod.id} module={mod} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Slider/Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container flex flex-col gap-8">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Karya Galeri Siswa</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Inspirasi karya seni hasil latihan intensif siswa yang tergabung di Studio Art Skills.</p>
          </div>

          <div className="grid grid-cols-2">
            {portfolioPreview.map(item => (
              <div key={item.id} className="card card-hover flex flex-col md:flex-row gap-6" style={{ padding: '16px' }}>
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  style={{ width: '100%', mdWidth: '200px', height: '180px', borderRadius: '8px', objectFit: 'cover' }} 
                />
                <div className="flex flex-col justify-between" style={{ padding: '8px 0' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic', marginBottom: '12px' }}>
                      "{item.reflection}"
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {item.tags.map(t => (
                      <span key={t} className="tag tag-cyan" style={{ fontSize: '11px' }}>#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container flex flex-col gap-8" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)', textAlign: 'center', marginBottom: '20px' }}>Pertanyaan Umum</h2>
          
          <div className="flex flex-col gap-4">
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Apakah platform ini gratis untuk dicoba?</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Ya! Anda dapat melihat silabus modul, membaca materi pelajaran demo, dan melihat galeri portofolio publik tanpa mendaftar akun. Pendaftaran gratis diperlukan untuk mengirim tugas dan mendapatkan feedback dari mentor.</p>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Bagaimana mentor memberikan penilaian?</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Setiap materi latihan dilengkapi dengan rubrik penilaian yang mencakup kriteria khusus seperti akurasi garis, value scale, atau komposisi warna. Mentor akan memberikan poin skor (1-10) per kriteria, serta coretan feedback langsung pada karya Anda.</p>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Bagaimana cara mendapatkan Badge/Lencana?</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Badge secara otomatis akan diberikan ke akun Anda setelah menyelesaikan target tertentu, misalnya menyelesaikan modul Fundamental Drawing dengan nilai memuaskan, atau mempublikasikan 3 karya terbaik di portofolio digital Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="container" style={{ marginTop: '40px' }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(19,27,46,0.9), rgba(6,182,212,0.15))',
          padding: '60px 40px',
          borderRadius: '20px',
          textAlign: 'center',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Siap Mengembangkan Skill Seni Anda?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
            Bergabunglah bersama ribuan murid lainnya. Daftar sekarang, dapatkan akses ke seluruh materi dasar, kumpulkan badge, dan pamerkan portofolio terbaik Anda.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn btn-primary pulse-glow" style={{ padding: '12px 30px' }}>Daftar Akun Learner</Link>
            <Link to="/login" className="btn btn-secondary" style={{ padding: '12px 30px' }}>Masuk dengan Akun Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
