const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@project0-ykioj.gcp.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
    process.exit(1);
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
  });

  Person.find({}).then(response => {
    response.forEach(person => console.log(person));
    mongoose.connection.close();
  });
}
