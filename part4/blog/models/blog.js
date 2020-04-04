const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    minlength: 5,
  },
  author: String,
  url: {
    type: String,
    required: false,
    unique: false,
  },
  likes: {
    type: Number,
    required: false,
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
