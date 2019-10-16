const bcrypt = require('bcryptjs')

async function cryptIt (password, req) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (err) {
    req.flash('errors', err)
  }
}

module.exports = cryptIt
