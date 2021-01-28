
const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    title: {
     type: String,
     minlength:3,
     require:true
    },
    author: {
     type: String,
    minlength:3,
    require:true
    },
    url:{
      type: String,
    minlength:10,
    require:true
  },
    likes:{ 
      type:Number,
    minlength:1,
    require:true
    }
})
blogsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogsSchema)