
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs',{title:1,author:1})
  response.json(users.map(u=>u.toJSON()))
  console.log('user',users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  //const user = await User.findById(body.userId)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const userobjet = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await userobjet.save()

  response.json(savedUser)
})

module.exports = usersRouter