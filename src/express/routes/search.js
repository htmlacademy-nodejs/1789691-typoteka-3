'use strict';

const {Router} = require(`express`);

const router = new Router();

router.get(`/`, (req, res) => {
  res.render(`search`);
});

module.exports = router;
