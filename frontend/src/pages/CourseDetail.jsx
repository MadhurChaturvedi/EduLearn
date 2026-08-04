import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/courses/' + id);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!course) return <div className="container py-5">Loading...</div>;

  const img = course.image || `https://source.unsplash.com/collection/190727/1200x600?sig=${course._id}`;
  const rating = 4.5;
  const students = Math.floor(Math.random() * 5000) + 200;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <img src={img} alt={course.title} className="img-fluid rounded mb-4" />
          <h2>{course.title}</h2>
          <p className="text-muted">{course.description}</p>

          <div className="mb-4">
            <strong className="me-3">{rating} ★</strong>
            <small className="text-muted">{students.toLocaleString()} students • Last updated: 2026</small>
          </div>

          <h5>What you'll learn</h5>
          <ul>
            <li>Understand core concepts and best practices</li>
            <li>Build real-world projects and portfolio-ready apps</li>
            <li>Prepare for interviews and technical assessments</li>
          </ul>

          <h5 className="mt-4">Curriculum</h5>
          <div className="list-group">
            <button className="list-group-item list-group-item-action">Introduction & Setup</button>
            <button className="list-group-item list-group-item-action">Core Concepts</button>
            <button className="list-group-item list-group-item-action">Project: Build App</button>
            <button className="list-group-item list-group-item-action">Final Project & Next Steps</button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: 20 }}>
            <div className="card-body">
              <h4 className="card-title">{course.title}</h4>
              <p className="text-muted mb-2">{rating} ★ • {students.toLocaleString()} students</p>
              <p className="h5 text-primary">Free</p>
              <button className="btn btn-primary w-100 mb-2">Enroll now</button>
              <button className="btn btn-outline-secondary w-100">Add to wishlist</button>
            </div>
            <div className="card-footer text-muted">
              <div><strong>Instructor:</strong> {course.instructor?.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
