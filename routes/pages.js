const express = require('express');
const router = express.Router();

// from here the register HTML page is shown
router.get('/',(req, res) => {
    res.render('register');
}); 
router.get('/login',(req, res) => {
    res.render('login');
});



module.exports = router;