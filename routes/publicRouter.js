const express = require('express');
const publicRouter = express.Router();

const User = require('../models/userSchema');

/* Sign In */
publicRouter.route('/')
.get((req, res) => res.render('login'));

publicRouter.route('/login')
.get((req, res) => {
  res.statusCode = 200;
  res.render('login');
})
.post((req, res) => {
  User.findOne({ username: req.body.username })
  .then((user) => {
    if (user == null) {
      res.statusCode = 400;
      res.render('error', { status: 'Login Failed', message: '>> Username doesn\'t exist. Please Re-Login with correct username if already Registered (or) Register Now' });
    }
    else {
      if (user.password === req.body.password) {
        res.statusCode = 200;
        res.cookie('authenticated', 'yes', {signed: true});
        res.redirect('/home');
      }
      else {
        res.statusCode = 400;
        res.render('error', { status: 'Login Failed', message: '>> username and password doesn\'t match' });
      }
    }
  })
  .catch((err) => console.log(err));
})


/* Sign Up */
publicRouter.route('/signup')
.get((req, res) => {
  res.statusCode = 200;
  res.render('signup');
})
.post((req, res) => {
  User.findOne({ username: req.body.username })
  .then((user) => {
    if (user !== null) {
      res.statusCode = 405;
      res.render('error', { status: 'Registration Failed', message: 'Username already exists, try another one' });
    }
    else {
      User.create({
        username: req.body.username,
        password: req.body.password,
      })
        .then((user) => {
          res.statusCode = 201;
          res.redirect('/login');
        })
        .catch((err) => console.log(err));

    }
  })
  .catch((err) => console.log(err));
});

/* Logout */
publicRouter.all('/logout', (req, res) => {
  res.statusCode = 200;
  res.clearCookie('authenticated');
  res.redirect('/login');
});

module.exports = publicRouter;