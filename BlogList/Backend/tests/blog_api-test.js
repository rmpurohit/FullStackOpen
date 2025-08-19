// node:test runner
const { before, after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const dotenv = require('dotenv')

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('blog API', () => {
  before(async () => {
    // Connect once for all tests (uses TEST_MONGODB_URI via config)
    // app/index.js already uses config; here we only need mongoose connection if not initiated
    if (mongoose.connection.readyState === 0) {
      const { MONGODB_URI } = require('../utils/config')
      await mongoose.connect(MONGODB_URI)
    }
  })

  beforeEach(async () => {
    // Clean and seed
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  after(async () => {
    await mongoose.connection.close()
  })

  // 4.8: GET returns correct amount in JSON
  test('GET /api/blogs returns JSON with correct amount', async () => {
    const res = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })

  // 4.9: unique identifier is "id"
  test('blogs use "id" field instead of "_id"', async () => {
    const res = await api.get('/api/blogs').expect(200)
    for (const blog of res.body) {
      assert.ok('id' in blog)
      assert.ok(!('_id' in blog))
    }
  })

  // 4.10: POST creates a new blog
  test('POST /api/blogs creates a new blog', async () => {
    const newBlog = {
      title: 'New adventures',
      author: 'Jane Dev',
      url: 'https://example.com/new',
      likes: 3,
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)

    const titles = blogsAfter.map(b => b.title)
    assert.ok(titles.includes('New adventures'))
  })

  // 4.11*: likes default to 0 if missing
  test('POST defaults likes to 0 when missing', async () => {
    const newBlog = {
      title: 'Zero like default',
      author: 'Anon',
      url: 'https://example.com/zero',
      // no likes
    }

    const res = await api.post('/api/blogs').send(newBlog).expect(201)
    assert.strictEqual(res.body.likes, 0)
  })

  // 4.12*: 400 when title or url missing
  test('POST 400 when title is missing', async () => {
    const bad = { author: 'No Title', url: 'https://x.y' }
    await api.post('/api/blogs').send(bad).expect(400)

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
  })

  test('POST 400 when url is missing', async () => {
    const bad = { title: 'No URL', author: 'No Url Guy' }
    await api.post('/api/blogs').send(bad).expect(400)

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
  })

  // 4.13: DELETE a single blog
  test('DELETE /api/blogs/:id removes a blog', async () => {
    const startBlogs = await helper.blogsInDb()
    const toDelete = startBlogs[0]

    await api.delete(`/api/blogs/${toDelete.id}`).expect(204)

    const afterBlogs = await helper.blogsInDb()
    assert.strictEqual(afterBlogs.length, startBlogs.length - 1)

    const ids = afterBlogs.map(b => b.id)
    assert.ok(!ids.includes(toDelete.id))
  })

  // 4.14: PUT updates a blog (likes)
  test('PUT /api/blogs/:id updates likes', async () => {
    const startBlogs = await helper.blogsInDb()
    const target = startBlogs[0]
    const newLikes = (target.likes || 0) + 10

    const res = await api
      .put(`/api/blogs/${target.id}`)
      .send({ likes: newLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.likes, newLikes)

    const after = await helper.blogsInDb()
    const updated = after.find(b => b.id === target.id)
    assert.strictEqual(updated.likes, newLikes)
  })

  // Extra: PUT non-existing id -> 404
  test('PUT returns 404 for non-existing id', async () => {
    const nonExistingId = new mongoose.Types.ObjectId().toString()
    await api.put(`/api/blogs/${nonExistingId}`).send({ likes: 99 }).expect(404)
  })

  // Extra: DELETE with malformed id -> 400 via middleware
  test('DELETE with malformed id -> 400', async () => {
    await api.delete('/api/blogs/not-a-valid-id').expect(400)
  })
})
