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

test('if likes defaults to 0 if not given', async () => {
  const newBlog = {
    title: 'This is blog number one',
    author: 'Felipe Rueda',
    url: 'fakeurl.com',
  };

  const response = await api.post('/api/blogs').send(newBlog);

  expect(response.body.likes).toBe(0);
});

test('if new blog has title and url', async () => {
  const newBlogOne = {
    author: 'Felipe Rueda',
    url: 'fakeurl.com',
    likes: 2,
  };
  const newBlogTwo = {
    title: 'This is blog number one',
    author: 'Felipe Rueda',
    likes: 7,
  };

  await api.post('/api/blogs').send(newBlogOne).expect(400);
  await api.post('/api/blogs').send(newBlogTwo).expect(400);
});

test('id a blog was deleted', async () => {
  const blogsAtTheStart = await helper.blogsInDb();
  const blogToDelete = blogsAtTheStart[0];

  const response = await api.delete(`/api/blogs/${blogToDelete.id}`);
  expect(response.status).toBe(204);

  const blogsAtTheEnd = await helper.blogsInDb();
  expect(blogsAtTheEnd).toHaveLength(blogsAtTheStart.length - 1);
});

afterAll(() => {
  mongoose.connection.close();
});
