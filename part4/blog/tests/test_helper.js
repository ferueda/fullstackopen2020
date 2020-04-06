const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'This is blog number one',
    author: 'Felipe Rueda',
    url: 'www.fakeurl.com',
    likes: 7,
  },
  {
    title: 'This is blog number two',
    author: 'Mayra Bravo',
    url: 'www.fakeurl2.com',
    likes: 1,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
