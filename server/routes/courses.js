const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { list, create, get } = require('../controllers/courseController');

router.get('/', list);
router.post('/', auth, create);
router.get('/:id', get);

module.exports = router;
