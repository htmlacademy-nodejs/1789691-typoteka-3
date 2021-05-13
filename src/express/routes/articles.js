'use strict';

const {Router} = require(`express`);

const router = new Router();

router.get(`/:id`, (req, res) => {
  res.send(`/articles/${req.params.id}`);
});

router.get(`/add`, (req, res) => {
  res.send(`/articles/add`);
});

router.get(`/edit/:id`, (req, res) => {
  res.send(`/articles/edit/${req.params.id}`);
});

router.get(`/category/:id`, (req, res) => {
  res.send(`/articles/category/${req.params.id}`);
});

module.exports = router;
