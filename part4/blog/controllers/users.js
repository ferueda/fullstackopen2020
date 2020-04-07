const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();
    res.json(savedUser.toJSON());
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users.map((u) => u.toJSON()));
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
