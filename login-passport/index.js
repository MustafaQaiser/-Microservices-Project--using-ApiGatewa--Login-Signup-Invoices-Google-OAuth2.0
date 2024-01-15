const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const routes = require('./Routes/index');
require('dotenv').config();
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
