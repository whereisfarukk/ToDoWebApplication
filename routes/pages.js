const express = require('express');
const router = express.Router();
// const authController = require('../controllers/auth');

// from here the register HTML page is shown
router.get('/',(req, res) => {
    res.render('register');
}); 
router.get('/login',(req, res) => {
    res.render('login');
});
router.get('/todo',(req, res) => {
    res.render('todo');
});

// router.get('/todo', authController.showTodos);

module.exports = router;

