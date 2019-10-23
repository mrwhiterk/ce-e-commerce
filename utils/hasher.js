const bcrypt = require('bcryptjs')

module.exports = async function (password, req) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (err) {
    req.flash('errors', 'error from hash: ' + err)
  }
}
