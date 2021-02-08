import React, { useState, useRef} from 'react'
import './listeblog.css'
const Blog = ({ blog,labelle }) => {
return(
  
  <div>
    <ul className='listeblog'>
    {blog.title} <br/>
   {blog.author} <br/>
    {blog.url}<br/>
   { blog.likes}<br/>
    </ul>
    
  </div>
)}

export default Blog