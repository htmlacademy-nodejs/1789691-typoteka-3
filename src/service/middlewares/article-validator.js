'use strict';

const {HttpCodes} = require(`../../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `category`];

const isArticleValid = (body) => {
  const newArticleKeys = Object.keys(body);
  const keyCheckResult = articleKeys.every((key) => newArticleKeys.includes(key));  
  if (!keyCheckResult) {
    return false
  }
  return Array.isArray(body.category)
}

const articleValidator = (req, res, next) => {  
  if (!isArticleValid(req.body)) {
    return res.status(HttpCodes.BAD_REQUEST).send(`Probably, the request contains an invalid field`);
  }

  return next();
};

module.exports = {
  articleValidator,
  isArticleValid,
};
