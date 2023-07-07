const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const notesController = require('../controllers/notes');
const middleware = require('../middlewares/auth-middleware');



router.post('/register',authController.register)
router.post('/login',authController.login)

// router.post('/todo', middleware.checkUserAuth,notesController.saveTodos);
router.post('/todo',notesController.saveTodos)



// router.get('/todo',authController.showTodos)

// router.get('/show/todos', showTodos);
router.get('/todo',notesController.showNotes)
router.put('/todo/:id', notesController.updateTodo);
router.delete('/todo/:id', notesController.deleteSingleTodo);

module.exports = router;

