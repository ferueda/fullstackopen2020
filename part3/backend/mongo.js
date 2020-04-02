const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@project0-ykioj.gcp.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { userNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'This ',
  date: new Date(),
  important: false
});

// note.save().then(response => {
//   console.log('note saved');
//   mongoose.connection.close();
// });

Note.find({ important: true }).then(result => {
  result.forEach(note => console.log(note));
  mongoose.connection.close();
});
