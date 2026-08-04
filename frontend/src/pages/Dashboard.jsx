import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import { API_BASE } from '../services/api';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [active, setActive] = useState('my-courses');
  const dropdownRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Dashboard</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><button className={`btn btn-sm ${active==='my-courses' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setActive('my-courses')}>My Courses</button></li>
                <li className="nav-item mb-2"><button className={`btn btn-sm ${active==='discover' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setActive('discover')}>Discover</button></li>
                <li className="nav-item mb-2"><button className={`btn btn-sm ${active==='settings' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setActive('settings')}>Settings</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Welcome{user ? `, ${user.name}` : ''}</h4>
            <div className="dropdown" ref={dropdownRef}>
              <button className="btn btn-light d-flex align-items-center" data-bs-toggle="dropdown">
                <img src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name||'User')}&background=0D6EFD&color=fff`} alt="avatar" style={{ width:36, height:36, borderRadius: '50%' }} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 220 }}>
                {user ? (
                  <>
                    <div className="d-flex align-items-center mb-2">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D6EFD&color=fff`} alt="avatar" style={{ width:48, height:48, borderRadius: '50%' }} />
                      <div className="ms-2">
                        <div><strong>{user.name}</strong></div>
                        <div className="small text-muted">{user.email}</div>
                      </div>
                    </div>
                    <hr />
                    <button className="btn btn-sm btn-outline-secondary w-100 mb-2">View Profile</button>
                    <button className="btn btn-sm btn-outline-danger w-100" onClick={() => { if(window.confirm('Log out?')) { window.dispatchEvent(new CustomEvent('edulearn-logout')) } }}>Logout</button>
                  </>
                ) : (
                  <>
                    <form onSubmit={(e)=>{e.preventDefault();alert('Use main login page');}}>
                      <div className="mb-2"><input className="form-control form-control-sm" placeholder="Email"/></div>
                      <div className="mb-2"><input className="form-control form-control-sm" type="password" placeholder="Password"/></div>
                      <div className="d-grid gap-2"><button className="btn btn-primary btn-sm">Login</button></div>
                    </form>
                    <hr />
                    <a className="btn btn-sm btn-outline-secondary w-100" href="/register">Register</a>
                  </>
                )}
              </ul>
            </div>
          </div>

          {active === 'my-courses' && (
            <div>
              <h5>Your Courses</h5>
              <div className="row">
                {courses.slice(0,6).map(c => <CourseCard key={c._id} course={c} />)}
              </div>
            </div>
          )}

          {active === 'discover' && (
            <div>
              <h5>Discover Courses</h5>
              <div className="row">
                {courses.map(c => <CourseCard key={c._id} course={c} />)}
              </div>
            </div>
          )}

          {active === 'settings' && (
            <div>
              <h5>Account Settings</h5>
              <p className="text-muted">Manage account preferences, password, and notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
