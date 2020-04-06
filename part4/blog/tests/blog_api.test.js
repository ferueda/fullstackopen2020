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

test('returns the right amount of blogs posts', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
