'use strict';

const fs = require(`fs/promises`);
const fsCommon = require(`fs`);
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
};

const getMockDataSync = () => {
  if (data !== null) {
    return data;
  }

  try {
    const content = fsCommon.readFileSync(FILE_NAME);
    data = JSON.parse(content);
    return data;
  } catch (error) {
    console.error(chalk.red(`Cannot get mocks synchronously. Error:`), error);
    return error;
  }
};

module.exports = {
  getMockData,
  getMockDataSync,
}
