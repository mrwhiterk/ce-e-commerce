const userValidation = (req, res, next) => {
  req
    .checkBody('email', 'email is required')
    .notEmpty()
    .withMessage('Invalid Username or Password')
  req
    .checkBody('password', 'password is required')
    .notEmpty()
    .withMessage('Password cannot be empty')

  req.flash('errors', req.validationErrors())

  next()
}

module.exports = userValidation
