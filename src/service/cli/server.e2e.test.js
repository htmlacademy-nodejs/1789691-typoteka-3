'use strict'

const supertest = require('supertest')
const server = require('./server').server
const { HttpCodes, MAX_ID_LENGTH } = require(`../../../constants`);
const { isArticleValid } = require(`../middlewares/article-validator`);

describe('Articles request testing.', () => {

  test('To get articles. The status code should be 200', async () => {
    const res = await supertest(server).get('/api/articles')
    expect(res.statusCode).toBe(HttpCodes.OK)
  })

  test('To get articles. The articles should be an array', async () => {
    const res = await supertest(server).get('/api/articles')
    expect(Array.isArray(res.body)).toBe(true)
  })

  test(`To get the first article by ID and check its' structure`, async () => {
    const articlesRes = await supertest(server).get('/api/articles')
    expect(articlesRes.body.length).toBeGreaterThan(0)

    expect(articlesRes.body[0]).toHaveProperty('id')
    const articleId = articlesRes.body[0].id
    expect(typeof articleId).toEqual('string')
    expect(articleId.length).toEqual(MAX_ID_LENGTH)

    const res = await supertest(server).get(`/api/articles/${articleId}`)
    expect(res.statusCode).toBe(HttpCodes.OK)

    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('createdDate')
    expect(isArticleValid(res.body)).toBe(true)

    expect(typeof res.body.id).toEqual('string')
    expect(res.body.id.length).toEqual(MAX_ID_LENGTH)
    expect(Array.isArray(res.body.category)).toBe(true)
    expect(res.body.category.length).toBeGreaterThan(0)

    expect(Array.isArray(res.body.comments)).toBe(true)
  })

  test('Create an article', async () => {
    const res = await supertest(server)
      .post('/api/articles')
      .send({
        "title": "The test title",
        "announce": "It is the first test article",
        "fullText": "The article has been created by supertest",
        "category": ["Разное"]
      })
      .set('Content-Type', 'application/json')

    expect(res.statusCode).toBe(HttpCodes.CREATED)

    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('createdDate')
    expect(isArticleValid(res.body)).toBe(true)

    expect(typeof res.body.id).toEqual('string')
    expect(res.body.id.length).toEqual(MAX_ID_LENGTH)

    expect(Array.isArray(res.body.comments)).toBe(true)
  })
  
  test('Failed article creation (no required fields)', async () => {
    const res = await supertest(server)
      .post('/api/articles')
      .send({
        'testField': 'testValue'
      })
      .set('Content-Type', 'application/json')

    expect(res.statusCode).toBe(HttpCodes.BAD_REQUEST)
  })

  test('Update the article', async () => {
    const articlesRes = await supertest(server).get('/api/articles')
    const articleId = articlesRes.body[0].id

    const res = await supertest(server)
      .put(`/api/articles/${articleId}`)
      .send({
        "title": "The updated test title",
        "announce": "It is the updated test article",
        "fullText": "The article has been updated by supertest",
        "category": ["Разное"]
      })
      .set('Content-Type', 'application/json')

    expect(res.statusCode).toBe(HttpCodes.OK)
    expect(typeof res.text).toEqual('string')
    expect(res.text).toEqual(`Updated`)
  })

  test('Incorrect article update', async () => {
    const articlesRes = await supertest(server).get('/api/articles')
    const articleId = articlesRes.body[0].id

    const res = await supertest(server)
      .put(`/api/articles/${articleId}`)
      .send({
        "title": "The updated test title",
        "announce": "It is the updated test article",
        "fullText": "The article has been updated by supertest",
        "category": "Разное" // incorrect value - the array required
      })
      .set('Content-Type', 'application/json')

    expect(res.statusCode).toBe(HttpCodes.BAD_REQUEST)
    expect(typeof res.text).toEqual('string')
  })

  test('Delete the last article', async () => {
    const articles = await supertest(server).get('/api/articles')
    const id = articles.body[articles.body.length - 1].id

    const res = await supertest(server).delete(`/api/articles/${id}`)
    expect(res.statusCode).toBe(HttpCodes.OK)
    expect(res.body[0]).toHaveProperty('id')
    expect(isArticleValid(res.body[0])).toBe(true)
  })

  test('Get article\'s comments', async () => {
    const articles = await supertest(server).get('/api/articles')
    const articleId = articles.body[articles.body.length - 1].id
    
    const res = await supertest(server).get(`/api/articles/${articleId}/comments`)
    expect(res.statusCode).toBe(HttpCodes.OK)
    expect(res.body[0]).toHaveProperty('id')
  })

  test('Add an article to the last comment', async () => {
    const articles = await supertest(server).get('/api/articles')
    const articleId = articles.body[articles.body.length - 1].id
    const commentText = 'The test comment'
    
    const res = await supertest(server)
      .post(`/api/articles/${articleId}/comments`)
      .send({
        text: commentText,
      })
      .set('Content-Type', 'application/json')

      expect(res.statusCode).toBe(HttpCodes.CREATED)

      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('text')
      expect(res.body.text).toBe(commentText)
  })

  test('Delete the last comment of the last article', async () => {
    const articles = await supertest(server).get('/api/articles')
    const articleId = articles.body[articles.body.length - 1].id

    const comments = await supertest(server).get(`/api/articles/${articleId}/comments`)
    const commentId = comments.body[comments.body.length - 1].id

    const res = await supertest(server).delete(`/api/articles/${articleId}/comments/${commentId}`)
    expect(res.statusCode).toBe(HttpCodes.OK)
    expect(res.body[0]).toHaveProperty('id')
    expect(res.body[0]).toHaveProperty('text')
  })
  
  test('Delete the unknown comment', async () => {
    const articles = await supertest(server).get('/api/articles')
    const articleId = articles.body[articles.body.length - 1].id

    const commentId = 'testCommentId'
    const res = await supertest(server).delete(`/api/articles/${articleId}/comments/${commentId}`)
    expect(res.statusCode).toBe(HttpCodes.NOT_FOUND)
    expect(res.text).toBe('Not found')
  })
})


describe('Categories request testing.', () => {

  test('Get categories', async () => {
    const res = await supertest(server).get('/api/categories')
    expect(res.statusCode).toBe(HttpCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
  })
})


describe('Search request testing.', () => {

  test('No query parameter', async () => {
    const res = await supertest(server).get('/api/search')
    expect(res.statusCode).toBe(HttpCodes.BAD_REQUEST)
    expect(typeof res.text).toBe('string')
  })

  test('Empty query parameter', async () => {
    const res = await supertest(server).get('/api/search?query=')
    expect(res.statusCode).toBe(HttpCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(0)
  })

  test('Succesfull search', async () => {
    const articles = await supertest(server).get('/api/articles')
    const firstTitle = articles.body[0].title

    const res = await supertest(server).get(`/api/search?query=${firstTitle}`)
    expect(res.statusCode).toBe(HttpCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })
})


describe('Common server testing.', () => {

  test('Get unreal route', async () => {
    const res = await supertest(server).get('/api/fake')
    expect(res.statusCode).toBe(HttpCodes.NOT_FOUND)
  })
})