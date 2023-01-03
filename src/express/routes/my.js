'use strict';

const { defaultApi } = require('../api');
const {Router} = require(`express`);
const router = new Router();

router.get(`/`, async (req, res) => {
  const articles = await defaultApi.getArticles()
  res.render(`my`, { articles });
});

router.get(`/comments`, async (req, res) => {
  const articles = await defaultApi.getArticles()
  const comments = articles.map(article => article.comments)
  res.render(`comments`, { comments });
});

module.exports = router;
