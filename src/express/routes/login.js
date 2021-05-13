'use strict';

const {Router} = require(`express`);

const router = new Router();

router.get(`/`, (req, res) => {
  res.send(`/login`);
});

module.exports = router;
