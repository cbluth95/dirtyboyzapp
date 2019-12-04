const express = require('express')
const mail = require('./routes/email')
const bodyParser = require('body-parser')
const app = express()

app.get('/', (req, res, next) => {
  res.send('Api Root')
})

app.use(
  '/email',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  mail
)
// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
