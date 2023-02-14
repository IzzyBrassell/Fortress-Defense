const express = require('express')
const _ = require('underscore')
const path = require('path');
const sequelize = require('./config/connection');

// const Book = require('./models/Book');


const app = express();
const PORT = process.env.PORT || 5800;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`)
} )

const startPaths = ['/' , '/start', '/menu']

app.get(startPaths, (req, res) => {
    res.sendFile(path.join(__dirname, "/public/start.html"))
})

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/game.html'))
})

app.get('/options', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/options.html'))
})

app.get('/auth', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/auth.html'))
})

app.get('/score', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/highscore.html'))
})