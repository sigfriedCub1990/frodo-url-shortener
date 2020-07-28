const Joi = require('@hapi/joi');

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
    throw new Error(message);
  }
};

module.exports = validate;
