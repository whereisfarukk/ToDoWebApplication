const express = require('express');

const router = express.Router();

// from here the register HTML page is shown //
router.get('/',(req, res) => {
    res.render('register');
}); 

module.exports = router;