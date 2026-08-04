import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { API_BASE } from '../services/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
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
  }, []);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(q.toLowerCase()) || (c.description || '').toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Explore Courses</h2>
          <p className="text-muted">Browse popular and new courses — project based and industry aligned.</p>
        </div>
        <div className="d-flex">
          <input className="form-control me-2" placeholder="Search courses" value={q} onChange={e=>setQ(e.target.value)} />
          <Link to="/" className="btn btn-outline-secondary">Back Home</Link>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        filtered.length === 0 ? (
          <div className="text-center py-5">
            <h4>No courses found</h4>
            <p className="text-muted">Try a different search or check back later.</p>
          </div>
        ) : (
          <div className="row">
            {filtered.map(c => <CourseCard key={c._id} course={c} />)}
          </div>
        )
      )}
    </div>
  );
};

export default CoursesPage;
