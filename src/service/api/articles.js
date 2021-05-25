'use strict';


const {Router} = require(`express`);
const {HttpCodes} = require(`../../../constants`);
const articleValidator = require(`../middlewares/article-validator`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = service.findAll();
    res.status(HttpCodes.OK).json(articles);
  });

  route.get(`/:id`, (req, res) => {
    const article = service.findOne(req.params.id);
    if (!article) {
      return res.status(HttpCodes.NOT_FOUND).send(`The article with id: '${req.params.id}' does not found`);
    }
    res.status(HttpCodes.OK).json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = service.create(req.body);
    res.status(HttpCodes.CREATED).json(article);
  });
};