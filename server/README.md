EduLearn backend

Quick start

1. Install dependencies

```bash
cd server
npm install
```

2. Create a `.env` file (or copy `.env.example`) and set `MONGO_URI` and `JWT_SECRET`.

3. Start the dev server

```bash
npm run dev
```

API endpoints

- `POST /api/auth/register` - body: `{ name, email, password }`
- `POST /api/auth/login` - body: `{ email, password }`
- `GET /api/users/me` - auth required
- `GET /api/courses` - list courses
- `POST /api/courses` - create course (auth required)
- `GET /api/courses/:id` - get course detail
