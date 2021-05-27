'use strict';

const {Router} = require(`express`);

const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService
} = require(`../data-service`);

const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

(async () => {
  const data = await getMockData();
  articles(app, new ArticleService(data), new CommentService());
  categories(app, new CategoryService(data));
  search(app, new SearchService(data));
})();

module.exports = app;
