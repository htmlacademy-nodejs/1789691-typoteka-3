'use strict';

const { defaultApi } = require('../api');
const {Router} = require(`express`);


const router = new Router();
router.get(`/`, async (req, res) => {
  const articles = await defaultApi.getArticles();
  res.render(`main`)
});

module.exports = router;
