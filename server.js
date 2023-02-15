const express = require('express')
const path = require('path');
const sequelize = require('./config/connection');
require('dotenv').config();
const routes = require('./routes')


//const Score = require('./models/Score');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});
