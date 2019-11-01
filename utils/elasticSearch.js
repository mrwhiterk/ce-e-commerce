const Product = require('../models/Product')

module.exports = () => {
  // elastic search - indexing
  Product.createMapping((err, mapping) => {
    if (err) throw err

    console.log('successfully mapped')
  })

  const stream = Product.synchronize()
  let count = 0

  stream.on('data', (err, chunk) => {
    // console.log(chunk.name)
    count++
  })

  stream.on('close', () => {
    console.log(`Indexed ${count} document`)
  })

  stream.on('error', error => {
    console.log('Error', error)
  })
}
