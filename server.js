const express = require('express')
const path = require('path');
const sequelize = require('./config/connection');
require('dotenv').config();


const Score = require('./models/Score');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const startPaths = ['/', '/start', '/menu']

app.get(startPaths, (req, res) => {
    res.sendFile(path.join(__dirname, "/public/start.html"))
})

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/game.html'))
})

app.get('/options', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/options.html'))
})

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/auth.html'))
})

app.get('/score', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/highscore.html'))
})


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});
