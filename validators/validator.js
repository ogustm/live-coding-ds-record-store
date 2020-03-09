const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('email')
      .isEmail()
      .exists()
      .normalizeEmail()
      .withMessage("That's not a valid email"),
    body('password')
      .isLength({ min: 10 })
      .withMessage('Your password should be 10 characters long.'),
    body('passwordConfirmation')
      .equals(body('password'))
      .withMessage('Password must match'),
    body('firstName')
      .trim()
      .exists()
      .withMessage('This field is required'),
    body('lastName')
      .trim()
      .exists()
      .withMessage('This field is required')
  ];
};

const userValidationErrorHandling = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(422).json({ errors: errors.array() });
};

module.exports = {
  userValidationRules,
  userValidationErrorHandling
};
