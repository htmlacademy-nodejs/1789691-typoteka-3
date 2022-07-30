'use strict';

const {HttpCodes} = require(`../../../constants`);

const articleKeys = [`title`, `announce`, `fullText`, `category`];

const isArticleValid = (reqBody) => {
  const newArticleKeys = Object.keys(reqBody);
  return newArticleKeys.every((key) => articleKeys.includes(key));  
}

const articleValidator = (req, res, next) => {  
  if (!isArticleValid(req.body)) {
    return res.status(HttpCodes.BAD_REQUEST).send(`Probably, the request contains an invalid field`);
  }

  return next();
};

module.exports = articleValidator;
