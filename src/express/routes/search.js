'use strict';

const { defaultApi } = require('../api');
const {Router} = require(`express`);

const router = new Router();

router.get(`/`, (req, res) => {
  res.render(`search`);
});

router.post(`/`, async (req, res) => {
  const articles = await defaultApi.searchArctile(req.body.search);
  res.render(`search`, { articles });
});

module.exports = router;
