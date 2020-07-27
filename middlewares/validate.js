const Joi = require('@hapi/joi');

const schema = Joi.object({
  url: Joi.string().uri(),
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
