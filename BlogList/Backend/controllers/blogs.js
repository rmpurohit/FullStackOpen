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

// DELETE /api/blogs/:id — delete a single blog
router.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

// PUT /api/blogs/:id — update a blog (primarily likes)
router.put('/:id', async (req, res, next) => {
  try {
    const body = req.body || {}
    const update = {}
    if ('title' in body) update.title = body.title
    if ('author' in body) update.author = body.author
    if ('url' in body) update.url = body.url
    if ('likes' in body) update.likes = body.likes

    const updated = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
      context: 'query',
    })

    if (!updated) {
      return res.status(404).json({ error: 'blog not found' })
    }
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

module.exports = router
