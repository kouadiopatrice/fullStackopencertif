import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [newBlog, setNewBlog] = useState([{title:'',author:'',url:'',likes:''}]) 
  const [errorMessage, setErrorMessage] = useState('some error happened...')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleLogin = async  (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await blogService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  //connexion  a la plication
  const loginForm = () => (
    <div>
       <p>{errorMessage} </p>
      <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>

    </div>
          
  )
  //AJOUT des blogs
  const addBlog = (event) => {
    event.preventDefault()
      const blogObject = {
      title: newBlog.title,
      author:newBlog.author,
      url:newBlog.url,
      likes:newBlog.likes,
      id: blogs.length + 1,
    }
    setBlogs(blogs.concat(blogObject))
    setNewBlog('')

    console.log('button clicked', event.target)
  }

  const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
  }
//fonction de visite des blogs
  const blogForm = () => (
    <div>
        <h2>blogs</h2>
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form> 
    <h1>create new</h1>
        <form onSubmit={addBlog}>
            title :<input type='text'/> <br/>
            author:<input type='text' /> <br/>
            url:,<input type='text' /> <br/>
             likes:<input type='number'/> <br/>
            <button type ='submit'>create</button>
        </form>
    </div>
   
  )
 
  return (
    <div>      
      {user === null ?
        loginForm():
      <div>
        <p>{user.name} logged-in <button onClick={() => window.localStorage.removeItem('loggedNoteappUser')}
        >logout</button>  </p>
       { blogForm()}
      </div>
    }
       
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App