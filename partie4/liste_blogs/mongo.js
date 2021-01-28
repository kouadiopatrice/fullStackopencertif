const mongoose = require('mongoose')
const uniqueValidator  =  require ( 'mongoose-unique-validator' ) ; 

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://patrice_2021:${password}@cluster0.cmmta.mongodb.net/blogsbd?retryWrites=true&w=majority`

 
  mongoose.set('useNewUrlParser', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


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
blogsSchema.plugin(uniqueValidator);
blogsSchema.set('validateBeforeSave', false)
blogsSchema.path('title').validate(value => {
  return value != null;
});
const Blog = mongoose.model('blogs', blogsSchema)

const blog = new Blog({
    title:process.argv[3], 
    author: process.argv[4], 
    url:process.argv[5],
    likes: process.argv[6]
})

blog.save().then(response => {

  console.log('message saved!');

  mongoose.connection.close();
})

Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
  
