const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('products index route: ' + __dirname)
})

module.exports = router
