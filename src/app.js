const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

//Rotas
const index = require('../routes');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);

module.exports = app;