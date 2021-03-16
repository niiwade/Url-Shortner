// HOMEPAGE

const express = require('express');
const router = express.Router();
const { ensureAuthentcated } = require('../config/auth');

// welcome page
router.get('/', (req, res) => res.render('welcome'));

//dashboard
router.get('/dashboard', (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;