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

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/game.html'))
})
