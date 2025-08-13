const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const noteSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
      },
      important: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )

  noteSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
      return ret
    },
  })
  

module.exports = mongoose.model('Note', noteSchema)
