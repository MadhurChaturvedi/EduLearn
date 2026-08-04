import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (token) {
        localStorage.setItem('token', token);
        try {
          const me = await getMe(token);
          setUser(me);
        } catch (err) {
          console.error(err);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };
    init();
    const onLogout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
    };
    window.addEventListener('edulearn-logout', onLogout);
    return () => window.removeEventListener('edulearn-logout', onLogout);
  }, [token]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setToken(data.token);
    navigate('/dashboard');
  };

  const register = async (name, email, password) => {
    const data = await apiRegister(name, email, password);
    setToken(data.token);
    navigate('/dashboard');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
