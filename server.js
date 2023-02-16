const express = require('express')
const path = require('path');
const sequelize = require('./config/connection');
require('dotenv').config();
const session = require('express-session');
const routes = require('./routes')

const SequelizeStore = require('connect-session-sequelize')(session.Store);



//const Score = require('./models/Score');


const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
    secret: process.env.SECRET_TUNNEL,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  // Add express-session and store as Express.js middleware
  app.use(session(sess));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});


