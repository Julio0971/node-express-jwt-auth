const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookie_parser = require('cookie-parser')

const app = express()
const auth = require('./routes/auth')

// Middlewares & static files
app.use(express.static('public'))
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json())
app.use(cookie_parser())

// Connect to MongoDB & listen for requests
const db_url = 'mongodb://localhost:27017/node-express-jwt-auth'

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => app.listen(3000))
.catch(error => console.log(error))

// Auth routes
app.use(auth)