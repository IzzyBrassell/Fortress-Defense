const express = require('express')
const _ = require('underscore')
const path = require('path');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5800;

app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`)
} )
