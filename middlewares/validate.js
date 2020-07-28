const Joi = require('@hapi/joi');
const CustomError = require('../utils/error');

const PROTOCOL_REGEX = /^[https://|http://]/;

const schema = Joi.object({
  url: Joi.string().uri().pattern(PROTOCOL_REGEX, { name: 'protocols' }),
});

const validate = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (!error) {
    next();
  } else {
    const message = error.details[0].message;
    throw new CustomError(message, 400);
  }
};

module.exports = validate;
