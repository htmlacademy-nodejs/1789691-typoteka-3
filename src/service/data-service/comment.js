'use strict';

const { nanoid } = require("nanoid");
const { MAX_ID_LENGTH } = require("../../../constants");

class CommentService {
  constructor() {
  }

  create(article, comment) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
      text: comment.text,
    });
    article.comments.push(newComment);
    return newComment;
  }

  delete(article, commentId) {
    const commentIdx = article.comments.findIndex((c) => c.id === commentId);
    if (commentIdx === -1) {
      return null;
    }
    return article.comments.splice(commentIdx, 1);
  }
}

module.exports = CommentService;