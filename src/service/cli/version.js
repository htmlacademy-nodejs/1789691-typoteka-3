'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);
const { getLogger } = require('../logger.js')
const logger = getLogger()

module.exports = {
  name: `--version`,
  run() {
    logger.info(`Version: ${packageJsonFile.version}`);
  }
};
