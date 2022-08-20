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

  test('To create an article', async () => {
    const res = await supertest(server)
      .post('/api/articles')
      .send({
        "title": "The test title",
        "announce": "It is the first test article",
        "fullText": "The article has been created by supertest",
        "category": "Разное"
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
})