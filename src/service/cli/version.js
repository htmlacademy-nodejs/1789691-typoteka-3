'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);
const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`
});

module.exports = {
  name: `--version`,
  run() {
    logger.info(`Version: ${packageJsonFile.version}`);
  }
};
