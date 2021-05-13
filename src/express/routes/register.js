'use strict';

const {Router} = require(`express`);

const router = new Router();

router.get(`/`, (req, res) => {
  res.send(`/register`);
});

module.exports = router;
