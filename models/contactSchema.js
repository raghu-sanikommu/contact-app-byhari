const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    contactName: {
        type: String,
        required: true,
    }, 
    contactNumber: {
        type: String,
        required: true,
    },
    contactMail: {
      type: String,
      required: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);
