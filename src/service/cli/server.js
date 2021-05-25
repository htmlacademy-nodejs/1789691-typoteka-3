'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {API_PREFIX, DEFAULT_PORT, HttpCodes} = require(`../../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const routes = require(`../api`);

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port, () => {
      console.info(chalk.blue(`The Express server is running on ${port} port. The '/posts' route available.`));
    });

    app.get(`/posts`, async (req, res) => {
      try {
        const data = await getMockData();
        res.json(data);
      } catch (error) {
        res.send([]);
      }
    });

    app.use(
        (req, res) => res
          .status(HttpCodes.NOT_FOUND)
          .send(`Not found`)
    );
  },
};
