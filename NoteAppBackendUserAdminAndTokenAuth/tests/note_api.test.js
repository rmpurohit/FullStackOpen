const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')
const User = require('../models/user')

const api = supertest(app)

let token // <-- will hold a valid JWT for each test run

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    // reset notes
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)

    // reset users and create one we can log in with
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'tester', name: 'Test User', passwordHash })
    await user.save()

    // login to get a token
    const loginRes = await api
      .post('/api/login')
      .send({ username: 'tester', password: 'sekret' })
      .expect(200)

    token = loginRes.body.token
    assert.ok(token, 'login did not return a token')
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api.get(`/api/notes/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api.get(`/api/notes/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)   // <-- send token
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = { important: true } // missing content

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)   // <-- still send token
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      // your DELETE route does not require auth; if you later protect it, add .set('Authorization', `Bearer ${token}`)
      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

      const notesAtEnd = await helper.notesInDb()
      const contents = notesAtEnd.map(n => n.content)
      assert(!contents.includes(noteToDelete.content))
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
    })
  })
})

/* user tests you already have can stay as they are */

after(async () => {
  await mongoose.connection.close()
})
