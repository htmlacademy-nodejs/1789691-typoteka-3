'use strict';

class ArticleService {
  constructor (articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((a) => a.id === id);
  }
}

module.exports = ArticleService;