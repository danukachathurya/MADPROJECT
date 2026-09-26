const router = require('express').Router();
const controller = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', controller.createStudent);
router.get('/me', controller.getMyStudent);
router.get('/:id', controller.getStudent);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

module.exports = router;

