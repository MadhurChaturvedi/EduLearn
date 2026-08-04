const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }
  return res.json();
}

export const register = (name, email, password) => request('/api/auth/register', 'POST', { name, email, password });
export const login = (email, password) => request('/api/auth/login', 'POST', { email, password });
export const getMe = (token) => request('/api/users/me', 'GET', null, token);
export const listCourses = () => request('/api/courses');
export const getCourse = (id) => request(`/api/courses/${id}`);
export const createCourse = (token, body) => request('/api/courses', 'POST', body, token);
