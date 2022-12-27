'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);
const logger = require(`pino`)({
  name: `pino-and-express`,
  level: `debug`
});

module.exports = {
  name: `--version`,
  run() {
    logger.info(`Version: ${packageJsonFile.version}`);
  }
};
