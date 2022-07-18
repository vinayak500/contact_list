const mongoose = require('mongoose');



//schema is tells us what fields are there 
const contactSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true
   },

   phone: {
    type: String,
    required: true
   }

});


// create a model(collection)   use these schema blueprint to populate inside collection(model)
const Contact = mongoose.model('Contact' ,contactSchema);
module.exports = Contact;


