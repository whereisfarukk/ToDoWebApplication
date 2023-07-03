const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const notesController = require('../controllers/notes');



router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/todo',authController.saveTodos)
router.get('/todo',notesController.showNotes)
// router.get('/todo',authController.showTodos)

// router.get('/show/todos', showTodos);
// router.get('/todo/:id', singleTodo);
// router.put('/update/todo/:id', updateTodo);
// router.delete('/delete/todo/:id', deleteSingleTodo);


module.exports = router;

