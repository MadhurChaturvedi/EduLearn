const Course = require('../models/Course');

exports.list = async (req, res) => {
  const courses = await Course.find().populate('instructor', 'name email');
  res.json(courses);
};

exports.create = async (req, res) => {
  const { title, description } = req.body;
  const course = new Course({ title, description, instructor: req.user.id });
  await course.save();
  res.status(201).json(course);
};

exports.get = async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name email');
  if (!course) return res.status(404).json({ msg: 'Course not found' });
  res.json(course);
};
