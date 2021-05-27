'use strict';


const {Router} = require(`express`);
const {HttpCodes} = require(`../../../constants`);

const route = new Router();

module.exports = (app, categoryService) => {
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    const categories = categoryService.findAll();
    res.status(HttpCodes.OK).json(categories);
  });
};
