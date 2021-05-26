'use strict';


const {Router} = require(`express`);
const {HttpCodes} = require(`../../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = service.findAll();
    res.status(HttpCodes.OK).json(articles);
  });

  route.get(`/:id`, articleExists(service), (req, res) => {
    const article = service.findOne(req.params.id);
    res.status(HttpCodes.OK).json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = service.create(req.body);
    res.status(HttpCodes.CREATED).json(article);
  });

  route.put(`/:id`, [articleValidator, articleExists(service)], (req, res) => {
    const article = service.update(req.params.id, req.body);
    res.status(HttpCodes.OK).send(`Updated`);
  });
};