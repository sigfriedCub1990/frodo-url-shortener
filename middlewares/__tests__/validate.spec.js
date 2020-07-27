const validate = require('../validate');

const mockExpressObjects = () => {
  const req = {
    body: { url: 'bla bla bla' },
  };

  const res = jest.fn();
  const next = jest.fn();

  return {
    req,
    res,
    next,
  };
};

describe('Validate middleware tests', () => {
  test('Should call next if body is O.K', () => {
    const { req, res, next } = mockExpressObjects();
    req.body = {
      url: 'https://sigfried.xyz',
    };

    validate(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test('Should return an error if URI is invalid', () => {
    const { req, res, next } = mockExpressObjects();

    expect(() => validate(req, res, next)).toThrow();
  });
});
