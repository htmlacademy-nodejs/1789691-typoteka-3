'use strict';

const { nanoid } = require("nanoid");
const { MAX_ID_LENGTH } = require("../../../constants");

class CommentService {
  constructor() {
  }

  create(article, comment) {
    console.log(`CommentService.create`, article, comment);
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
      text: comment.text,
    });
    article.comments.push(newComment);
    return newComment;
  }
}

module.exports = CommentService;