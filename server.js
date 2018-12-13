const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'This is Holostore, your new home for purchasing holograms!',
}));


module.exports = app;