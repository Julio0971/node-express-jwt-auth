const express = require('express')
const mongoose = require('mongoose')
const auth_routes = require('./routes/auth')
const cookie_parser = require('cookie-parser')
const { requireAuth } = require('./middleware/auth-middleware');
const app = express()

// Middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookie_parser())

// View engine
app.set('view engine', 'ejs');

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
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(auth_routes);