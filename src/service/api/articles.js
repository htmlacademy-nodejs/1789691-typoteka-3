'use strict';


const {Router} = require(`express`);
const {HttpCodes} = require(`../../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);

const route = new Router();

module.exports = (app, articleService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCodes.OK).json(articles);
  });

  route.get(`/:id`, articleExists(articleService), (req, res) => {
    const article = articleService.findOne(req.params.id);
    res.status(HttpCodes.OK).json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    res.status(HttpCodes.CREATED).json(article);
  });

  route.put(`/:id`, [articleValidator, articleExists(articleService)], (req, res) => {
    const article = articleService.update(req.params.id, req.body);
    res.status(HttpCodes.OK).send(`Updated`);
  });

  route.delete(`/:id`, articleExists(articleService), (req, res) => {
    const article = articleService.delete(req.params.id);
    res.status(HttpCodes.OK).json(article);
  });

  route.get(`/:id/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    res.status(HttpCodes.OK).json(article.comments);
  });
};
