const express = require('express');
const router = express.Router();

//Login Page 

router.get('/login', (req, res) => res.render('login'));

//Register Page 

router.get('/register', (req, res) => res.render('register'));

//register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check requried field

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all fields' })
    }

    //check password match
});


module.exports = router;