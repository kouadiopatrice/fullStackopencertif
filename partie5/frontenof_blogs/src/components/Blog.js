import React, { useState, useRef} from 'react'
import './listeblog.css'
const Blog = ({ blog,labelle }) => {
return(
  
  <div>
    <ul className='listeblog'>
     <li className ='blog'> {blog.title}</li> 
    <li className='blog'> {blog.author} </li>     {blog.url}<br/>
   { blog.likes}<br/>
    </ul>
    
  </div>
)}

export default Blog