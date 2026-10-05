const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET, authMiddleware } = require('../middleware/authMiddleware');

// Mock data memory fallback if PG is not active
const tempUsers = [
  { id: 'u1', name: 'Art Learner', email: 'learner@studioart.com', password_hash: '$2a$10$X879l1B7o/v7q1r1K9r4xebN/t6a7zO9.m.R4XkL4H2E1z85p0s8i', role: 'learner', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'u2', name: 'Master Mentor', email: 'mentor@studioart.com', password_hash: '$2a$10$X879l1B7o/v7q1r1K9r4xebN/t6a7zO9.m.R4XkL4H2E1z85p0s8i', role: 'mentor', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
  { id: 'u3', name: 'Admin Utama', email: 'admin@studioart.com', password_hash: '$2a$10$X879l1B7o/v7q1r1K9r4xebN/t6a7zO9.m.R4XkL4H2E1z85p0s8i', role: 'admin', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80' }
];

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Nama, Email, dan Password wajib diisi.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    // Find role ID for 'learner'
    const roleRes = await db.query("SELECT id FROM roles WHERE name = 'learner'");
    const roleId = roleRes.rows[0]?.id;

    if (!roleId) throw new Error('Role learner not found in database');

    const insertRes = await db.query(
      'INSERT INTO users (name, email, password_hash, role_id, avatar_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email',
      [name, email, passwordHash, roleId, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80']
    );

    const user = { id: insertRes.rows[0].id, name, email, role: 'learner', avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran akun berhasil.',
      data: { user, token }
    });
  } catch (error) {
    console.warn('Registration database fail, falling back to mock registration:', error.message);
    // Mock register
    const passwordHash = await bcrypt.hash(password, 10);
    const mockUser = {
      id: 'u_' + Date.now(),
      name,
      email,
      role: 'learner',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'
    };
    tempUsers.push({ ...mockUser, password_hash: passwordHash });
    const token = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '24h' });
    
    return res.status(201).json({
      success: true,
      message: 'Pendaftaran akun berhasil (Mock Mode).',
      data: { user: mockUser, token }
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email dan password wajib diisi.' });
  }

  try {
    const userRes = await db.query(
      'SELECT u.id, u.name, u.email, u.password_hash, u.avatar_url, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1',
      [email]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    const dbUser = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, dbUser.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    const user = { id: dbUser.id, name: dbUser.name, email: dbUser.email, role: dbUser.role, avatar_url: dbUser.avatar_url };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    return res.json({
      success: true,
      message: 'Login berhasil.',
      data: { user, token }
    });
  } catch (error) {
    console.warn('Login database fail, falling back to mock login:', error.message);
    const mockUser = tempUsers.find(u => u.email === email);
    if (!mockUser) {
      return res.status(401).json({ success: false, message: 'Akun tidak ditemukan (Mock Mode).' });
    }

    const isMatch = await bcrypt.compare(password, mockUser.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password salah (Mock Mode).' });
    }

    const user = { id: mockUser.id, name: mockUser.name, email: mockUser.email, role: mockUser.role, avatar_url: mockUser.avatar_url };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });

    return res.json({
      success: true,
      message: 'Login berhasil (Mock Mode).',
      data: { user, token }
    });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: { user: req.user }
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logout berhasil.' });
});

module.exports = router;
