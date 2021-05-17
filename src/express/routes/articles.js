'use strict';

const {Router} = require(`express`);

const router = new Router();


router.get(`/add`, (req, res) => {
  res.render(`new-post`);
});

router.get(`/edit/:id`, (req, res) => {
  res.send(`/articles/edit/${req.params.id}`);
});

router.get(`/category/:id`, (req, res) => {
  res.send(`/articles/category/${req.params.id}`);
});

router.get(`/:id`, (req, res) => {
  res.render(`post`);
});

module.exports = router;
