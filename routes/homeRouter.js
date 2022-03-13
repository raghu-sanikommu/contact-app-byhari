const express = require('express');
const homeRouter = express.Router();
const Contact = require('../models/contactSchema');

homeRouter.route('/')
.get((req, res) => {
  Contact.find()
  .then(contacts => res.render('home', { contacts: contacts }))
  .catch(err => console.log(err));
})
.post((req, res) => {
  Contact.create({
    contactName: req.body.contactName.trim(),
    contactNumber: req.body.contactNumber.trim(),
    contactMail: req.body.contactMail.trim()
  })
  .then(() => res.redirect('/home'))
  .catch(err => console.log(err));
})


module.exports = homeRouter;