const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

//initialise app variable 

const app = express();


//DB config
const db = require('./config/keys').MongoURL;


//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then((console.log('Mongo DB connected')))
    .catch(err => console.log(err));

//EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');


//Bodyparser

app.use(express.urlencoded({ extended: false }));


//ROUTES 

app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`)); // runs the server