const express = require('express');
const routes = require('./router/routes');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //lese json
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use((req, res) => {
    res.status(404).send('404 - Page not found');
});

app.listen(3000, ()=> {
    console.log("Site is running on port 3000");
});