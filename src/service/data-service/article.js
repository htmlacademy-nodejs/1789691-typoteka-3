'use strict';

const { nanoid } = require("nanoid");
const { MAX_ID_LENGTH } = require("../../../constants");

class ArticleService {
  constructor (articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
      createdDate: new Date().toLocaleString(),
      comments: [],
    }, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((a) => a.id === id);
  }

  update(id, newArticle) {
    const currentArticle = this.findOne(id);
    return Object.assign(currentArticle, newArticle);
  }
}

module.exports = ArticleService;