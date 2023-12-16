const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const db = require('./connection/connection.js')
const cors = require('cors')
require('dotenv').config()


const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use(require('./route/route.js'))

app.post('/json', (req, res) => {
  const userInput = req.body;

  if (!userInput) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }

  // Respond with the same JSON received from the user
  res.json( userInput );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})