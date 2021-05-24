'use strict';

const fs = require(`fs/promises`);
const chalk = require(`chalk`);
const {FILE_NAME} = require(`../../../constants`);
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const content = await fs.readFile(FILE_NAME);
    data = JSON.parse(content);
    return Promise.resolve(data);
  } catch (error) {
    console.error(chalk.red(`Cannot get mocks. Error:`), error);
    return Promise.reject(error);
  }
}

module.exports = getMockData;