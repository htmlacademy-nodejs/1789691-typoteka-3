'use strict';


const {Router} = require(`express`);
const {HttpCodes} = require(`../../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
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
    articleService.update(req.params.id, req.body);
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

  route.post(`/:id/comments`, [articleExists(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);
    res.status(HttpCodes.CREATED).json(comment);
  });

  route.delete(`/:id/comments/:commentId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const comment = commentService.delete(article, req.params.commentId);
    if (!comment) {
      return res.status(HttpCodes.NOT_FOUND).send(`Not found`);
    }
    return res.status(HttpCodes.OK).json(comment);
  });
};
