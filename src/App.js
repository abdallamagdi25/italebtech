// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Import Components & Pages
import Preloader from './components/Preloader';
import AnimatedPage from './components/AnimatedPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
// import Subscribe from './components/Subscribe';
import ProfilePage from './components/ProfilePage';
import CompleteProfile from './components/auth/CompleteProfile';
import AddCourse from './components/admin/AddCourse';
import NotFound from './components/NotFound';
import AboutPage from './pages/AboutPage';
import AddArticle from './components/admin/AddArticle';
import ForgotPassword from './components/auth/ForgotPassword';

// This is the main application content, now wrapped in a Router
const MainApp = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={4000} rtl={true} />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><AnimatedPage><Dashboard /></AnimatedPage></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><AnimatedPage><Courses /></AnimatedPage></ProtectedRoute>} />
            <Route path="/courses/:courseId" element={<ProtectedRoute><AnimatedPage><CourseDetail /></AnimatedPage></ProtectedRoute>} />
            {/* <Route path="/subscribe" element={<ProtectedRoute><AnimatedPage><Subscribe /></AnimatedPage></ProtectedRoute>} /> */}
            <Route path="/profile" element={<ProtectedRoute><AnimatedPage><ProfilePage /></AnimatedPage></ProtectedRoute>} />
            <Route path="/complete-profile" element={<ProtectedRoute><AnimatedPage><CompleteProfile /></AnimatedPage></ProtectedRoute>} />
            <Route path="/admin/add-course" element={<ProtectedRoute><AnimatedPage><AddCourse /></AnimatedPage></ProtectedRoute>} />
            <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
            <Route path="/admin/add-article" element={<ProtectedRoute><AddArticle /></ProtectedRoute>} />
            <Route path="/forgot-password" element={<AnimatedPage><ForgotPassword /></AnimatedPage>} />
            
            <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

// The root component that decides what to show, now wrapped in the Router
function App() {
  const { loading } = useAuth();

  return (
    <Router>
      <AnimatePresence>
        {loading ? (
          <motion.div key="preloader" exit={{ opacity: 0 }}>
            <Preloader />
          </motion.div>
        ) : (
          <motion.div key="main-app" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <MainApp />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;