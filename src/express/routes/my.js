'use strict';

const { defaultApi } = require('../api');
const {Router} = require(`express`);
const { CommentService } = require('../../service/data-service');
const router = new Router();

router.get(`/`, async (req, res) => {
  const articles = await defaultApi.getArticles()
  res.render(`my`);
});

router.get(`/comments`, async (req, res) => {
  const articles = await defaultApi.getArticles()
  const comments = articles.map(article => article.comments)
  console.log('comments:', comments)
  res.render(`comments`);
});

module.exports = router;
