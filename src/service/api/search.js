'use strict';


const {Router} = require(`express`);
const {HttpCodes} = require(`../../../constants`);

const route = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    if (!req.query.hasOwnProperty(`query`)) {
      return res.status(HttpCodes.BAD_REQUEST).send(`There is no 'query' parameter.`);
    }
    if (!req.query.query) {
      return res.status(HttpCodes.OK).json([]);
    }
    const result = searchService.findAll(req.query.query);
    res.status(HttpCodes.OK).json(result);
  });
};
