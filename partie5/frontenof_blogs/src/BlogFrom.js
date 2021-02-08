import React, {useState,useEffect, useRef} from 'react' 
import Blog from './components/Blog'
import blogService from './services/blogs'
import DisplayTogglable from './DisplayTogglable'
const BlogForm =  ({ createBlog }) => {
  let [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(
    [{
      title:'',
      author:'',
      url:'',
      likes:'',
    }]) 

    useEffect(() => {
      blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )  
    }, [])

    blogs =[
      {
        title:'tresord de la vie',
        author:'Gotier',
        url:'http://lkouhfdryy/pou',
        likes:15
      }
    ]

  const handleChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author:newBlog.author,
      url:newBlog.url,
      likes:newBlog.likes
    })

    setNewBlog('')
  }
  const displayblog =() => 
  (
      <DisplayTogglable buttonLabel='show blog'>
           {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} /> 
        )}
      </DisplayTogglable>
  )
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
            title :<input 
            value ={newBlog.title}
            onChange={handleChange}/> <br/>
            author:<input 
           value ={newBlog.author}
           onChange={handleChange} /> <br/>
            url:,<input
            value ={newBlog.url}
            onChange={handleChange}  /> <br/>
             likes:<input
             value ={newBlog.likes}
            onChange={handleChange} /> <br/>

           <button type="submit">save</button>
      </form>

      <div>{displayblog()} </div> 
    </div>
  )
 
}
export default BlogForm