const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./model');
const { GetServices } = require('./services');
const { Logger } = require('./logger');
const router = require('./routes');
const configs = require('./utils/constants');

const app = express();
app.use(bodyParser.json());

app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.set('logger', Logger);

const services = GetServices({
  Models: sequelize.models,
  Logger,
  Configs: configs
});

app.set('services', services);

app.use(router);

app.use((err, req, res, next) => {
  if (err) {
    Logger.error('Something went wrong:', err);
    return res.status(err.code).json({ code: err.message });
  }
  res.status(500).send('Internal Server Error');
});

module.exports = app;
