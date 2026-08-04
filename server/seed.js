require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');

const seed = async () => {
  await connectDB();

  // Create or find instructor
  let instructor = await User.findOne({ email: 'instructor@edulearn.test' });
  if (!instructor) {
    const hash = await bcrypt.hash('password123', 10);
    instructor = await User.create({ name: 'Instructor One', email: 'instructor@edulearn.test', password: hash, role: 'instructor' });
    console.log('Created instructor:', instructor.email);
  } else {
    console.log('Found instructor:', instructor.email);
  }

  // Remove existing courses created by seed (optional)
  await Course.deleteMany({});

  const sampleCourses = [
    {
      title: 'React Fundamentals',
      description: 'Build modern web apps with React: components, hooks, state management, and routing.',
      instructor: instructor._id,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Full-Stack Java with Spring',
      description: 'Backend APIs, persistence, and full-stack patterns using Java and Spring Boot.',
      instructor: instructor._id,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'UI/UX Design Essentials',
      description: 'Design beautiful and usable interfaces — from wireframes to prototypes.',
      instructor: instructor._id,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const created = await Course.insertMany(sampleCourses);
  console.log('Inserted courses:', created.map(c => c.title));

  mongoose.connection.close();
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
