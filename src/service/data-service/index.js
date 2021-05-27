'use strict';

const ArticleService = require(`./article`);
const CommentService = require(`./comment`);
const CategoryService = require(`./category`);
const SearchService = require(`./search`);

module.exports = {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
}