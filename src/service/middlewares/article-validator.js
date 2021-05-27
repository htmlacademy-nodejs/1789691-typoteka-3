'use strict';

const {HttpCodes} = require(`../../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `category`];

const articleValidator = (req, res, next) => {
  const newArticleKeys = Object.keys(req.body);
  const isKeyExist = articleKeys.every((key) => newArticleKeys.includes(key));
  if (!isKeyExist) {
    return res.status(HttpCodes.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};

module.exports = articleValidator;
