import React, { createContext, useState, useEffect, useContext } from 'react';
import { mockUsers, mockRoles } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sas_user');
    const savedToken = localStorage.getItem('sas_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const resData = await response.json();
      if (resData.success) {
        setUser(resData.data.user);
        setToken(resData.data.token);
        localStorage.setItem('sas_user', JSON.stringify(resData.data.user));
        localStorage.setItem('sas_token', resData.data.token);
        return { success: true, user: resData.data.user };
      } else {
        return { success: false, message: resData.message };
      }
    } catch (error) {
      console.warn('API connection failed, falling back to mock login');
      // Mock Fallback
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser) {
        setUser(mockUser);
        const tempToken = 'mock-jwt-token-12345';
        setToken(tempToken);
        localStorage.setItem('sas_user', JSON.stringify(mockUser));
        localStorage.setItem('sas_token', tempToken);
        return { success: true, user: mockUser };
      }
      return { success: false, message: 'Email tidak ditemukan (Gunakan: learner@studioart.com atau mentor@studioart.com atau admin@studioart.com)' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const resData = await response.json();
      if (resData.success) {
        setUser(resData.data.user);
        setToken(resData.data.token);
        localStorage.setItem('sas_user', JSON.stringify(resData.data.user));
        localStorage.setItem('sas_token', resData.data.token);
        return { success: true, user: resData.data.user };
      } else {
        return { success: false, message: resData.message };
      }
    } catch (error) {
      console.warn('API connection failed, falling back to mock register');
      const newUser = {
        id: 'u_' + Date.now(),
        name,
        email,
        role: mockRoles.LEARNER,
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
        bio: 'Art Learner baru',
        points: 0,
        created_at: new Date().toISOString()
      };
      setUser(newUser);
      const tempToken = 'mock-jwt-token-registered';
      setToken(tempToken);
      localStorage.setItem('sas_user', JSON.stringify(newUser));
      localStorage.setItem('sas_token', tempToken);
      return { success: true, user: newUser };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // Ignore network error for logout
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('sas_user');
    localStorage.removeItem('sas_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { mockRoles };
