import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import { API_BASE } from '../services/api';

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('my-courses');
  const dropdownRef = useRef();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const demoCourses = [
    { _id: 'd1', image: 'https://source.unsplash.com/collection/190727/600x400?sig=1', title: 'Full Stack Web Development', instructor: 'Maya Singh', duration: '8 weeks', students: '12,400+' },
    { _id: 'd2', image: 'https://source.unsplash.com/collection/190727/600x400?sig=2', title: 'Modern React & Redux', instructor: 'Ravi Patel', duration: '6 weeks', students: '9,800+' },
    { _id: 'd3', image: 'https://source.unsplash.com/collection/190727/600x400?sig=3', title: 'Data Science with Python', instructor: 'Sneha Mehta', duration: '10 weeks', students: '15,200+' },
  ];
  const visibleCourses = courses.length ? courses : demoCourses;

  return (
    <div className="container-fluid py-5">
      <div className="row gx-4 gy-4">
        <aside className="col-lg-3">
          <div className="card rounded-4 border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="mb-4">Instructor panel</h5>
              <div className="mb-3">
                <span className="badge bg-primary rounded-pill mb-2">Pro learner</span>
                <h6 className="mb-1">{user?.name || 'Learning Partner'}</h6>
                <p className="text-muted small mb-0">{user?.email || 'You are signed in to access your courses.'}</p>
              </div>
              <div className="list-group list-group-flush">
                {['My Courses', 'Discover', 'Settings'].map(item => {
                  const key = item.toLowerCase().replace(' ', '-');
                  return (
                    <button
                      key={key}
                      className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 text-start ${active === key ? 'active' : 'bg-light'}`}
                      onClick={() => setActive(key)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <main className="col-lg-9">
          <div className="mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
              <div>
                <p className="text-muted mb-1">Welcome back</p>
                <h2 className="fw-bold">{user?.name || 'Learner'}'s Dashboard</h2>
                <p className="text-muted">Track your progress, continue courses, and discover new skills.</p>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-outline-secondary">Manage account</button>
                <button className="btn btn-secondary" onClick={logout}>
                  Logout
                </button>
                <button className="btn btn-primary">View certificates</button>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card rounded-4 border-0 shadow-sm p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="mb-0">Courses</h6>
                  <span className="badge bg-success">{visibleCourses.length}</span>
                </div>
                <p className="text-muted small">Active courses in your library.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded-4 border-0 shadow-sm p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="mb-0">Progress</h6>
                  <span className="text-primary">82%</span>
                </div>
                <p className="text-muted small">Average completion across your active courses.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card rounded-4 border-0 shadow-sm p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="mb-0">Certificates</h6>
                  <span className="text-warning">4 earned</span>
                </div>
                <p className="text-muted small">Certificates earned after course completion.</p>
              </div>
            </div>
          </div>

          <div className="card rounded-4 border-0 shadow-sm p-4 mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div>
                <h5 className="mb-1">Continue where you left off</h5>
                <p className="text-muted mb-0">Your top recommended courses are ready to continue.</p>
              </div>
              <button className="btn btn-outline-primary">Resume learning</button>
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">{active === 'discover' ? 'Discover Courses' : 'Your Courses'}</h5>
              <div className="text-muted small">Showing top {visibleCourses.length} courses</div>
            </div>

            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row g-3">
                {visibleCourses.map(c => (
                  <div key={c._id} className="col-md-6 col-xl-4">
                    <CourseCard course={c} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
