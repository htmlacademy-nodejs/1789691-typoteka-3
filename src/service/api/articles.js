'use strict';


const {Router} = require(`express`);
const {HttpCodes} = require(`../../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = service.findAll();
    res.status(HttpCodes.OK).json(articles);
  });
};