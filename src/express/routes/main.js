'use strict';

const { defaultApi } = require('../api');
const {Router} = require(`express`);

const images = [
  '/img/skyscraper@1x.jpg',
  '/img/sea@1x.jpg',
  '/img/forest@1x.jpg'
]

const router = new Router();
router.get(`/`, async (req, res) => {
  const articles = await defaultApi.getArticles();
  res.render(`main`, { articles, images })
});

module.exports = router;
