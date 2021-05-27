'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.reduce((acc, article) => {
      article.category.forEach((cat) => acc.add(cat));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
