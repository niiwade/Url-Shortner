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
        errors.push({ msg: 'Please fill all fields' });
    }

    //check password match

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //check password length

    if (password.length < 8) {
        errors.push({ msg: 'Please Passwords should be at least 8' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        res.send('pass');
    }
});


module.exports = router;