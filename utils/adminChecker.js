module.exports = (req, res, next) => {
  nameChecker(req)

  next()
}

const nameChecker = name => {
  name
    .check('name')
    .notEmpty()
    .withMessage('email cannot be empty')
}
