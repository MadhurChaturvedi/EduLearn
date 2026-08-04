import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError('Email and password are required');
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) return setError('Enter a valid email');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.msg || 'Login failed');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header text-white" style={{ background: 'linear-gradient(90deg,#0d6efd,#6f42c1)' }}>
              <h4 className="mb-0">Welcome Back</h4>
              <small>Sign in to continue to EduLearn</small>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg">Login</button>
                </div>
              </form>

              <div className="text-center my-3">or</div>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-dark"><i className="bi bi-google"></i> Continue with Google</button>
                <button className="btn btn-outline-primary"><i className="bi bi-facebook"></i> Continue with Facebook</button>
              </div>
            </div>
            <div className="card-footer text-center small">
              New here? <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
