const localStorage = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model

const User = require('../models/User');

module.exports = function(passport) {
        passport.use(
            new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
                //match user

                User.findOne({ email: email })
                    .then(users => {
                        if (!user) {
                            return done(null, false, { messsage: 'This email is not registered' });
                        }
                        // Match Password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, { messsage: 'This password is incorrect' });
                            }
                        });
                    })
                    .catch(err => console.log(err));
            })
        );

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {

            }

        };