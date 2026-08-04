import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const {
    image,
    title,
    instructor,
    duration,
    rating = 4.8,
    description,
    students,
    _id,
  } = course;

  const imageUrl = image || `https://source.unsplash.com/collection/190727/800x450?sig=${encodeURIComponent(title || 'course')}`;
  const instructorName = instructor?.name || instructor || 'Expert Instructor';
  const studentLabel = students || '2,400+';
  const durationLabel = duration || 'Self paced';

  return (
    <div className="col-md-6 col-xl-4 mb-4">
      <div className="card h-100 rounded-4 shadow-sm overflow-hidden">
        <div className="ratio ratio-16x9">
          <img src={imageUrl} className="card-img-top" alt={title} style={{ objectFit: 'cover' }} />
        </div>
        <div className="card-body d-flex flex-column">
          <div className="mb-3">
            <span className="badge bg-primary mb-2">{durationLabel}</span>
            <h5 className="card-title">{title}</h5>
            <p className="text-muted small mb-2">{instructorName}</p>
            <p className="card-text text-muted" style={{ minHeight: 72 }}>
              {description ? `${description.slice(0, 110)}${description.length > 110 ? '...' : ''}` : 'Practical skills and real-world projects to help you advance your career.'}
            </p>
          </div>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3 small text-muted">
              <div>
                <i className="bi bi-star-fill text-warning me-1"></i>
                {rating}
              </div>
              <div>{studentLabel} students</div>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary">Enroll Now</button>
              {_id ? (
                <Link className="btn btn-outline-secondary" to={`/courses/${_id}`}>
                  View details
                </Link>
              ) : (
                <button className="btn btn-outline-secondary" disabled>
                  View details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
