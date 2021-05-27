'use strict';

const {Router} = require(`express`);

const {
  ArticleService,
  CategoryService,
  CommentService
} = require(`../data-service`);

const articles = require(`./articles`);
const categories = require(`./categories`);
const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

( async () => {
  const data = await getMockData();
  articles(app, new ArticleService(data), new CommentService());
  categories(app, new CategoryService(data));
})();

module.exports = app;