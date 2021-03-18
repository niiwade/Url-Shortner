const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');


// User Model

const User = require('../models/User');

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
        // validation pass
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User exists
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // password hashing
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            // set password to hash
                            newUser.password = hash;

                            //save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can login');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log('err'));
                        }));
                }
            });
    }
});

//login Handle
router.post('./login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
});


//logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logout');
    res.redirect('/users/login');
});

module.exports = router;