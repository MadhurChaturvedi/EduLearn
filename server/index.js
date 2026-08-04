require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('EduLearn API'));

// Serve built frontend (only in production) at /EduLearn
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	const frontendPath = path.join(__dirname, 'public', 'EduLearn');
	app.use('/EduLearn', express.static(frontendPath));
	app.get('/EduLearn/*', (req, res) => {
		res.sendFile(path.join(frontendPath, 'index.html'));
	});
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
