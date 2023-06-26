const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');

// load dotenv only in non-production environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// get the database connection status
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set routes
app.get('/', (req, res) => {
  res.render('index')
})

// start the express server and listen for connections
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})