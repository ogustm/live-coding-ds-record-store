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
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password must match');
      }
      return true;
    }),
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
  console.log(req.body);
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
