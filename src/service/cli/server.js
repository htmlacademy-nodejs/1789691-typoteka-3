'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME, HttpCodes} = require(`../../../constants`);

const app = express();
app.use(express.json());

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port, () => {
      console.info(chalk.blue(`The Express server is running on ${DEFAULT_PORT} port. The '/posts' route available.`));
    });

    app.get(`/posts`, async (req, res) => {
      try {
        const content = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(content);
        res.json(mocks);
      } catch (error) {
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).send(error);
      }
    });

    app.use(
      (req, res) => res
        .status(HttpCodes.NOT_FOUND)
        .send(`Not found`)
    );
  },
};
