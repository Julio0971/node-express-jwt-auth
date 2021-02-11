const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Auth routes
const auth = require('./routes/auth')

// Middlewares & static files
app.use(express.static('public'))
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Register view engine
app.set('view engine', 'ejs')

// Connect to MongoDB & listen for requests
const db_url = 'mongodb://localhost:27017/node-express-jwt-auth'

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => app.listen(3000))
.catch(error => console.log(error))

// Routes
// Home
app.get('/', (req, res) => {
    res.render('home', { title: 'Inicio' })
})

// Smoothies list
app.get('/smoothies', (req, res) => {
    res.render('smoothies', { title: 'Listado' })
})

// Auth
app.use(auth)

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' })
})