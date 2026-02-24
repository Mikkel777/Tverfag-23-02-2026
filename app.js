const express = require('express');
const routes = require('./router/routes');
const mongoose = require('mongoose');
const session = require("express-session");
const path = require('path');
const Review = require("./models/review");
const authRoutes = require('./router/authroutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //lese json
app.use(express.urlencoded({ extended: true }));

//Marks session cookies
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}));

mongoose.connect("mongodb://10.12.7.201:27017/wcagDB") //Temp
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use((req, res, next) => {
    res.locals.user = req.session.username;
    next();
});

//routes
app.use('/', routes);
app.use('/', authRoutes);

app.use((req, res) => {
    res.status(404).send('404 - Page not found');
});

app.listen(3000, ()=> {
    console.log("Site is running on port 3000");
});