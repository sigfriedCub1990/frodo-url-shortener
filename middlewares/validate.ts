import Joi from 'joi';
import CustomError from '../utils/error';
import { Request, Response } from 'express';

const PROTOCOL_REGEX = /^[https://|http://]/;

const schema = Joi.object({
  url: Joi.string().uri().pattern(PROTOCOL_REGEX, { name: 'protocols' }),
});

const validate = (req: Request, _: Response, next: () => void) => {
  const { error } = schema.validate(req.body);
  if (!error) {
    next();
  } else {
    const message = error.details[0].message;
    throw new CustomError(message, 400);
  }
};

export default validate;
