'use strict';

const { defaultApi } = require('../api');
const {Router} = require(`express`);
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = new Router();

router.get(`/add`, (req, res) => {
  res.render(`new-post`);
});

router.post(`/add`, upload.single('upload'), (req, res) => {
  res.send(`Body: ${JSON.stringify(req.body)}.<br> File: ${JSON.stringify(req.file)}`);
});

router.get(`/edit/:id`, async (req, res) => {
  const article = await defaultApi.getArticle(req.params.id);
  res.send(`${JSON.stringify(article)}`);
  // res.send(`/articles/edit/${req.params.id}`);
});

router.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});

router.get(`/:id`, (req, res) => {
  res.render(`post`);
});

module.exports = router;
