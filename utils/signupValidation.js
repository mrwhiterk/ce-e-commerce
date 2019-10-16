const userValidation = (req, res, next) => {
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()

  next()
}

module.exports = userValidation
