/**
 * Blog list utility helpers for unit testing exercises (4.3–4.7)
 */

// 4.3 — dummy: always returns 1
const dummy = (_blogs) => 1

// 4.4 — totalLikes: sum of likes in all blogs
const totalLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return 0
  return blogs.reduce((sum, b) => sum + (b.likes || 0), 0)
}

// 4.5 — favoriteBlog: blog with the most likes (any one if tie)
const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null
  return blogs.reduce((fav, b) => (fav && fav.likes >= (b.likes || 0) ? fav : b))
}

// 4.6 — mostBlogs: author with the largest count of blogs
// Returns { author, blogs } or null for empty input
const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null

  const counts = new Map() // author -> count
  for (const b of blogs) {
    const a = b.author || ''
    counts.set(a, (counts.get(a) || 0) + 1)
  }

  let res = null
  for (const [author, count] of counts.entries()) {
    if (!res || count > res.blogs) res = { author, blogs: count }
  }
  return res
}

// 4.7 — mostLikes: author whose posts have the largest total likes
// Returns { author, likes } or null for empty input
const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null

  const sums = new Map() // author -> total likes
  for (const b of blogs) {
    const a = b.author || ''
    sums.set(a, (sums.get(a) || 0) + (b.likes || 0))
  }

  let res = null
  for (const [author, likes] of sums.entries()) {
    if (!res || likes > res.likes) res = { author, likes }
  }
  return res
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }