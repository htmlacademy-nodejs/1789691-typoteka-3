'use strict';

const {Router} = require(`express`);

const {ArticleService, CommentService} = require(`../data-service`);

const articles = require(`./articles`);
const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

( async () => {
  const data = await getMockData();
  articles(app, new ArticleService(data), new CommentService());

})();

module.exports = app;