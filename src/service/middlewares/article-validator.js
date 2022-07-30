'use strict';

const {HttpCodes} = require(`../../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `category`];

const isArticleValid = (body) => {
  const newArticleKeys = Object.keys(body);
  return articleKeys.every((key) => newArticleKeys.includes(key));  
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
