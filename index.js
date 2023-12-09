const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const db = require('./connection/connection.js')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

app.use(require('./route/route.js'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})