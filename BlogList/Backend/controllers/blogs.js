const router = require('express').Router()
const Blog = require('../models/blog')

// GET /api/blogs — list all blogs
router.get('/', async (_req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})

// POST /api/blogs — create a blog
router.post('/', async (req, res, next) => {
  try {
    const body = req.body || {}

    // Minimal validation for a friendly error (optional for 4.1–4.2, nice to have)
    if (!body.title || !body.url) {
      return res.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author || '',
      url: body.url,
      likes: typeof body.likes === 'number' ? body.likes : 0,
    })

    const saved = await blog.save()
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

module.exports = router