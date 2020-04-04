const http = require('http');
const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const Blog = require('./models/blog');

const server = http.createServer(app);

logger.info('Connectingo to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connectingo to MongoDB: ', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/api/blogs', (req, res, next) => {
  Blog.find({})
    .then((blogs) => res.json(blogs.map((blog) => blog.toJSON())))
    .catch((error) => next(error));
});

app.post('/api/blogs', (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => next(error));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
