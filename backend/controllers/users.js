const { NODE_ENV, JWT_SECRET } = process.env;

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BadRequestError = require('../errors/BadRequestError');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Пользователь с указанным id не существует.'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) throw new BadRequestError('Пользователь с таким email уже существует.');
      return bcryptjs.hash(password, 10);
    })
    .then((passHash) => User.create({
      name,
      about,
      avatar,
      email,
      password: passHash,
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь с указанным id не существует.'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'prod' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', `Bearer ${token}`, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .send({});
    })
    .catch(next);
};

const logout = (req, res) => {
  res
    .clearCookie('jwt', { path: '/' })
    .status(200)
    .send({});
};

module.exports = {
  getAllUsers,
  getMe,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  logout,
};
