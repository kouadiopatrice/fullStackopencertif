const express = require('express')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors')
const Blog =require('../models/blog')
const logger = require('../utils/logger')
//const mongoose = require('mongoose')
const User = require('../models/user')

app.use(express.json())
app.use(cors())

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
   const blogs = await Blog
   .find({}).populate('user',{username:1,name:1 })
   console.log('blogs',blogs)
      response.json(blogs.map(blog =>  blog.toJSON()))
})

blogRouter.get('/:id', async (request, response, next) => {
  Blog.findById(request.params.id)
  .then(blog => {
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
  . catch(error => next(error)) 
})

blogRouter.post('/', async (request, response,next) => {
  const body = request.body
  console.log('body',body)

  const token = getTokenFrom(request)
const decodedToken = jwt.verify(token, process.env.SECRET)
 if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  try { 
  const user = await User.findById(request.decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url:body.url,
    likes:body.likes||0,
    user: user._id
  })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()
    response.json(savedBlog)
  } catch(exception) {
    next(exception)
  }
  console.log('User',User)

  //response.json(savedBlogs.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
 const blog = Blog.findById(request.params.id)
  
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter