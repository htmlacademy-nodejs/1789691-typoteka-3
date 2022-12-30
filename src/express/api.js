'use strict';

const axios = require('axios')

const port = process.env.SERVER_PORT || 8081;

class Api {
  constructor(baseURL) {
    this._httpClient = axios.create({
      baseURL,
      timeout: 1000
    })
  }

  async getArticles() {
    try {
      return (await this._httpClient.get(`/articles`)).data
    }
    catch(error) {
      console.error('getArticles.error:', error);
    }
  }

  async getArticle(id) {
    try {
      return (await this._httpClient.get(`/articles/${id}`)).data
    }
    catch(error) {
      console.error('getArticle.error:', error);
    }
  }
}

const defaultApi = new Api(`http://localhost:${port}/api`)

module.exports = {
  Api,
  defaultApi
}