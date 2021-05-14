'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME, HttpCodes} = require(`../../../constants`);

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF8`
  });
  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessage = `Not found`;
  switch (req.url) {
    case `/`:
      try {
        const content = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(content);
        const listItems = mocks.map((mock) => `<li>${mock.title}</li>`).join(``);
        sendResponse(res, HttpCodes.OK, `<ul>${listItems}</ul>`);
      } catch (error) {
        sendResponse(res, HttpCodes.NOT_FOUND, notFoundMessage);
      }
      break;
    default:
      sendResponse(res, HttpCodes.NOT_FOUND, notFoundMessage);
  }
};

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = Number(customPort) || DEFAULT_PORT;
    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, () => {
        console.info(chalk.green(`Server is running on ${port}`));
      })
      .on(`error`, (error) => {
        console.error(chalk.red(`Server error:`), error);
      });

  },
};
