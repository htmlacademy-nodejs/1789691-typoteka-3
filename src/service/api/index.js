'use strict';

const {Router} = require(`express`);
const { ExitCode } = require(`../../../constants`);

const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService
} = require(`../data-service`);

const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const { getMockData, getMockDataSync } = require(`../lib/get-mock-data`);

const app = new Router();

// (async () => {
  // const data = await getMockData();
(() => {
  const data = getMockDataSync();
  if (data instanceof Error) {
    process.exit(ExitCode.FAIL);
  }
  articles(app, new ArticleService(data), new CommentService());
  categories(app, new CategoryService(data));
  search(app, new SearchService(data));
})();

module.exports = app;
