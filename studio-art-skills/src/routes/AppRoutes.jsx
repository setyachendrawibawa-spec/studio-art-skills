import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, mockRoles } from '../context/AuthContext';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AppLayout from '../layouts/AppLayout';

// Pages
import HomePublic from '../pages/HomePublic';
import Login from '../pages/Login';
import Register from '../pages/Register';
import LearnerDashboard from '../pages/LearnerDashboard';
import Modules from '../pages/Modules';
import ModuleDetail from '../pages/ModuleDetail';
import Lesson from '../pages/Lesson';
import UploadWork from '../pages/UploadWork';
import Feedback from '../pages/Feedback';
import Portfolio from '../pages/Portfolio';
import AdminDashboard from '../pages/AdminDashboard';

// Route guards
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>Loading Session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if unauthorized
    if (user.role === mockRoles.ADMIN) return <Navigate to="/admin" replace />;
    if (user.role === mockRoles.MENTOR) return <Navigate to="/feedback" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePublic />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
      </Route>

      {/* Authenticated Workspace Pages */}
      <Route element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        {/* Learner Specific */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={[mockRoles.LEARNER]}>
            <LearnerDashboard />
          </ProtectedRoute>
        } />
        
        {/* Shared Pages with Protected Layout */}
        <Route path="/modules" element={<Modules />} />
        <Route path="/modules/:id" element={<ModuleDetail />} />
        <Route path="/lessons/:id" element={<Lesson />} />
        <Route path="/upload-work" element={<UploadWork />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Admin Specific */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[mockRoles.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
