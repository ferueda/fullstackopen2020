const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeAll(async () => {
  await Blog.deleteMany({});

  const blogsArray = helper.initialBlogs.map((blog) => new Blog(blog));

  const promisesArray = blogsArray.map((blog) => blog.save());

  await Promise.all(promisesArray);
});

test('id name property is correct', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((res) => {
    expect(res.id).toBeDefined();
  });
});

test('returns the right amount of blogs posts', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test('creates a new blog', async () => {
  const newBlog = {
    title: 'This is blog number one',
    author: 'Felipe Rueda',
    url: 'fakeurl.com',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtTheEnd = await helper.blogsInDb();
  expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtTheEnd.map((blog) => blog.title);
  expect(titles).toContain('This is blog number one');
});

afterAll(() => {
  mongoose.connection.close();
});
