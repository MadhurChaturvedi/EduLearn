import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Courses from './components/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Courses />
      <Footer />
    </>
  );
}

export default App;