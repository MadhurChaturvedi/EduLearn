import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) return setError('All fields are required');
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) return setError('Enter a valid email');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.msg || 'Registration failed');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header text-white" style={{ background: 'linear-gradient(90deg,#6f42c1,#0d6efd)' }}>
              <h4 className="mb-0">Create your account</h4>
              <small>Join EduLearn and start learning today</small>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg">Register</button>
                </div>
              </form>

              <div className="text-center my-3">or</div>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-dark"><i className="bi bi-google"></i> Continue with Google</button>
              </div>
            </div>
            <div className="card-footer text-center small">
              Already have an account? <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
