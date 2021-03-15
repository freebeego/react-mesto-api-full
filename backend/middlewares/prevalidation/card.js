const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(
      (url, helpers) => (validator.isURL(url) ? url : helpers.message('Given isn\'t correct URL.')),
      'URL validation.',
    ),
  }),
});

const CardValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = { createCardValidator, CardValidator };
