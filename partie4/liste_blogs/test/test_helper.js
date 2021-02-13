const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
  {
    title:'vorete vient',
    author :'pierre',
    url:'http://routenht/jdgjg',
    like:16
  },
  {
    title:'Browser can execute only Javascript',
    author:'Franck',
    url:'http://retouty/opl/7845',
    likes:10
  },
]
const nonExistingId = async () => {
  const blog  = new Blog({ title: 'vorete vient', likes:12 })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
  
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlog,
  nonExistingId,
  blogsInDb,
  usersInDb,
}

