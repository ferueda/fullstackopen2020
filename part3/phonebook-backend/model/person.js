const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
