import React, { useState, useEffect, useRef} from 'react'
import blogService from './services/blogs'
import LoginForm from './LoginForm'
import BlogForm from './BlogFrom'
import Togglable from './Togglable'

const App = () => {
  let [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [newBlog, setNewBlog] = useState([{title:'',author:'',url:'',likes:''}]) 
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [loginVisible, setLoginVisible] = useState(false)
  const [createBlog, setCreateBlog] = useState(false)
  
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
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
    <div>
         <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
        </div>
  )
}
  //AJOUT des blogs
  const addBlog = (blogObject) => {
    blogService
    .create(blogObject)
    .then(returnblog => {
      setBlogs(blogs.concat(returnblog))
    })
   
  }

  //reference a chaque blog
  const blogFormRef = useRef()
//fonction de visite des blogs
  const blogForm = () => (

    <Togglable buttonLabel='New blog' ref={blogFormRef}>
     <BlogForm createBlog ={addBlog} />
  </Togglable>
  )
  
  /*{
    const hideWhenVisible = { display: createBlog ? 'none' : '' }
    const showWhenVisible = { display: createBlog ? '' : 'none' }
    return (
    <div>
    <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlog(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
        <BlogForm createBlog ={addBlog} />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
  </div>
  </div>
  )
 }
 */
console.log('blogs',blogs)

  return (
    <div>  
      <h1>Blogs</h1>    
      {user === null ?
        loginForm():
      <div>
        <p>{user.name} 
        logged-in 
        <button onClick={() =>
         window
         .localStorage
         .removeItem('loggedNoteappUser')}
        >logout</button>  </p>
       {  blogForm()}
      </div>
    } 
     
    </div>
  )
}

export default App