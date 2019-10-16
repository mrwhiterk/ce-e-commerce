module.exports = (req, res, next) => {
  emailChecker(req)
  passwordChecker(req)

  next()
}

// created all the checks for fields on registration

const emailChecker = email => {
  email
    .check('email')
    .notEmpty()
    .withMessage('email field cannot be empty')
    .isEmail()
    .withMessage('Please enter a valid email')
}

const passwordChecker = password => {
  password
    .check('password')
    .notEmpty()
    .withMessage('password field cannot be empty')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d`~!@#$%^&*()_+]{5,}$/
    )
    .withMessage(
      'Password must be atleast 5 characters, at least one uppercase letter, one lower case, one number, one special char'
    )

  // password
  //   .check('password2')
  //   .notEmpty()
  //   .withMessage('Confirm password cannot be empty')
  //   .equals(password.body.password)
  //   .withMessage('Password must match');
}
