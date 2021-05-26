'use strict';

const {HttpCodes} = require(`../../../constants`);

const commentKeys = [`text`];

const commentValidator = (req, res, next) => {
  const newCommentKeys = Object.keys(req.body);
  const isKeyExist = commentKeys.every((key) => newCommentKeys.includes(key));
  if (!isKeyExist) {
    return res.status(HttpCodes.BAD_REQUEST).send(`Bad request`);
  }

  next();
}

module.exports = commentValidator;