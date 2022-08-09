'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {API_PREFIX, DEFAULT_PORT, HttpCodes} = require(`../../../constants`);
const routes = require(`../api`);

const app = express();
app.use(express.json());

app.use(API_PREFIX, routes);
app.use(
  (req, res) => res
    .status(HttpCodes.NOT_FOUND)
    .send(`Route not found`)
);

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port, () => {
      console.info(chalk.blue(`The Express server is running on ${port} port.`));
    });
  },
  server: app,
};
