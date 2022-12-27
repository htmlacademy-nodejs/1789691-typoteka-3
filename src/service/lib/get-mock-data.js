'use strict';

const fs = require(`fs/promises`);
const fsCommon = require(`fs`);
const chalk = require(`chalk`);
const {FILE_NAME} = require(`../../../constants`);
const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`
});
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
    logger.error(`Cannot get mocks. Error: %s`, error);
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
    logger.error(`Cannot get mocks synchronously. Error: %s`, error);
    return error;
  }
};

module.exports = {
  getMockData,
  getMockDataSync,
}
