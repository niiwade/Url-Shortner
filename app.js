const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


//initialise app variable 

const app = express();

//passport config
require('./config/passport')(passport);


//DB config
const db = require('./config/keys').MongoURL;


//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then((console.log('Mongo DB connected')))
    .catch(err => console.log(err));

//EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');


// Static file 
app.use('./static', express.static(__dirname + '/static'));

//Bodyparser

app.use(express.urlencoded({ extended: false }));


// Express Session

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialised: true
}));

//passport midware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash

app.use(flash());

//Global Var

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//ROUTES 

app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`)); // runs the server