import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1>About EduLearn</h1>
        <p className="lead text-muted">We help learners build real skills through practical, project-based courses.</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Our mission</h4>
          <p>To make high-quality education accessible and practical for everyone. Our courses focus on real-world skills and employability.</p>
        </div>
        <div className="col-md-6">
          <h4>Why choose us</h4>
          <ul>
            <li>Industry aligned curriculum</li>
            <li>Experienced instructors</li>
            <li>Project-based learning and certificates</li>
          </ul>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="mb-3">Meet the team</h3>
        <div className="row">
          {[1,2,3].map(i => (
            <div key={i} className="col-md-4 mb-3">
              <div className="card h-100 text-center p-3">
                <img src={`https://i.pravatar.cc/150?img=${10+i}`} alt="team" className="rounded-circle mx-auto mb-2" style={{width:100,height:100,objectFit:'cover'}} />
                <h5>Member {i}</h5>
                <p className="text-muted small">Instructor</p>
                <p className="small">Brings experience from industry and builds practical courses.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light p-4 rounded">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h4>Trusted by thousands of learners</h4>
            <p className="text-muted mb-0">Our platform has helped learners land jobs and grow careers.</p>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <span className="badge bg-primary me-2">10k+ Learners</span>
            <span className="badge bg-success me-2">Industry Mentors</span>
            <span className="badge bg-warning text-dark">Certificates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
