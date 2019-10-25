const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  (err, data) => {
    if (err) console.log(err)
  }
)
