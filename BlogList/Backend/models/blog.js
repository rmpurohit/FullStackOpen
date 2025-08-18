const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, default: '' },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Convert _id to id and remove __v in JSON output
blogSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

module.exports = mongoose.model('Blog', blogSchema)