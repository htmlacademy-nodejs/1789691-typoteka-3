'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {API_PREFIX, SERVER_PORT, HttpCodes} = require(`../../../constants`);
const routes = require(`../api`);

const app = express();
app.use(express.json());

const { getLogger } = require('../lib/logger.js')
const logger = getLogger()

app.use(
  (req, res, next) => {
    logger.debug('Request: %s', req.url)

    res.on('finish', () => {
      logger.info('Response status code: %d', res.statusCode)
    })
    next()
  }
);

app.use(API_PREFIX, routes);
app.use(
  (req, res) => {
    const message = `Route not found`
    logger.error(message)
    res
      .status(HttpCodes.NOT_FOUND)
      .send(message)
  }
);

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = Number(customPort) || SERVER_PORT;

    app.listen(port, () => {
      logger.info(`The Express server is running on port ${port}.`)
    })
    .on('error', (error) => {
      logger.error('Express server error: %o', error)
    })
  },
  server: app,
};
