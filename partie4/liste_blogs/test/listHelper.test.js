const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


const listHelper = require('../utils/list_helper')

test('dummy returns one ', () => {
  const blogs = [1] ;
  
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
   const nblikes = listWithOneBlog.map(value => value.likes)
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(nblikes)
    expect(result).toBe(5)
  })
})

describe('like over', () =>{
 const  likeoveronListe = [
   {
     title: 'Canonical string reduction',
     author:'Edsger w. Dijkstra',
     likes:12
   },
  { title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 15,
    }
 ]
const listlike = likeoveronListe.map(value => value.likes) 
test('of list blogs',() => {
  const resultlike = listHelper.favoriteblog(listlike) 
  expect(resultlike).toEqual(resultlike)
 }) 
 
})

test('blogs are returned as json ',async() => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('content-type' , /appliction\/json/)
} )
afterAll(() => {
  mongoose.connection.close()
})