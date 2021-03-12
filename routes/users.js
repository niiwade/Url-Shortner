const express = require('express');
const router = express.Router();

//Login Page 

router.get('/login', (req, res) => res.render('login'));

//Register Page 

router.get('/register', (req, res) => res.render('register'));


//register handle
router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Hello world');
});


module.exports = router;