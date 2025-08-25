import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Import Components & Pages
import TransitionLoader from './components/common/TransitionLoader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Import all pages directly
import HomePage from './pages/HomePage';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import CompleteProfile from './components/auth/CompleteProfile';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Subscribe from './components/Subscribe';
import ProfilePage from './components/ProfilePage';
import InfoPage from './pages/InfoPage';
import ArticlePage from './pages/ArticlePage';
import AddCourse from './components/admin/AddCourse';
import AdminCoursesList from './components/admin/AdminCoursesList';
import ManageLessons from './components/admin/ManageLessons';
import AddArticle from './components/admin/AddArticle';
import AdminArticlesList from './components/admin/AdminArticlesList';
import EditArticle from './components/admin/EditArticle';
import AdminUsersList from './components/admin/AdminUsersList';
import AdminUserDetail from './components/admin/AdminUserDetail';
import NotFound from './components/NotFound';
import ArticlesPage from './pages/ArticlesPage';
import FeedbackTrigger from './components/FeedbackTrigger';
import AboutPage from './pages/AboutPage';
import EditCourse from './components/admin/EditCourse'; // استورده في الأعلى



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);

    // Simulate loading for each page transition
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // يمكنك تعديل مدة التحميل من هنا

    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  
  return (
    <div className="app-container">
      <FeedbackTrigger />
      <Navbar />
      <ToastContainer position="bottom-center" autoClose={4000} rtl={true} />
      <main className="main-content">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <TransitionLoader key="loader" />
          ) : (
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
                <Route path="/articles/:articleId" element={<ProtectedRoute><ArticlePage /></ProtectedRoute>} />
                <Route path="/articles" element={<ProtectedRoute><ArticlesPage /></ProtectedRoute>} />
                <Route path="/courses/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
                <Route path="/subscribe" element={<ProtectedRoute><Subscribe /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />

                <Route path="/admin/users" element={<ProtectedRoute><AdminRoute><AdminUsersList /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/user/:userId" element={<ProtectedRoute><AdminRoute><AdminUserDetail /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/courses" element={<ProtectedRoute><AdminRoute><AdminCoursesList /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/course/:courseId/lessons" element={<ProtectedRoute><AdminRoute><ManageLessons /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/add-course" element={<ProtectedRoute><AdminRoute><AddCourse /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/add-article" element={<ProtectedRoute><AdminRoute><AddArticle /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/articles-list" element={<ProtectedRoute><AdminRoute><AdminArticlesList /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/edit-article/:articleId" element={<ProtectedRoute><AdminRoute><EditArticle /></AdminRoute></ProtectedRoute>} />
                <Route path="/admin/edit-course/:courseId" element={<ProtectedRoute><AdminRoute><EditCourse /></AdminRoute></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

// The root component that wraps everything
const Root = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default Root;