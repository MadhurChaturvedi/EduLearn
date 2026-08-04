import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white shadow-sm ">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          EduLearn
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/courses">
                Courses
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/about">
                About Us
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex">
            <Link className="btn btn-outline-primary me-2" to="/login">
              Login
            </Link>

            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;