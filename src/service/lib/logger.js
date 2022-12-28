'use strict';

const { Environments } = require('../../../constants')
const pino = require(`pino`)
const logger = pino({
    name: `pino-and-express`,
    level: process.env.LOG_LEVEL || `info`
  },
  process.env.NODE_ENV === Environments.DEVELOPMENT
    ? process.stdout
    : pino.destination({ dest: './logs/pino.log' })
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child({}, options);
  }
}