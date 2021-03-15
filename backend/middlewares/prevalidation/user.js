const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlValidator = (url, helpers) => (validator.isURL(url) ? url : helpers.message('Given isn\'t correct URL.'));
const emailValidator = (email, helpers) => (validator.isEmail(email) ? email : helpers.message('Given isn\'t correct email.'));

const getUserValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidator, 'URL validation.'),
    email: Joi.string().required().custom(
      emailValidator,
      'Email validation.',
    ),
    password: Joi.string().required().min(2).max(30),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(
      emailValidator,
      'Email validation.',
    ),
    password: Joi.string().required().min(2).max(30),
  }),
});

const updateProfileValidator = celebrate({
  body: Joi.object().min(1).max(2).keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidator, 'URL validation.'),
  }),
});

module.exports = {
  getUserValidator,
  createUserValidator,
  loginValidator,
  updateProfileValidator,
  updateAvatarValidator,
};
