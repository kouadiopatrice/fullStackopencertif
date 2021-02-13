import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
//import { render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from '../BlogFrom'

test('renders content', () => {
  const blog = {
    title:'tresord de la vie',
    author:'Gotier',
    url:'http://lkouhfdryy/pou',
    likes:15
  }

  const component = render(
    <Blog  blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'tresord de la vie'
  )
  expect(component.container).toHaveTextContent(
    'Gotier'
  )
  expect(component.container).toHaveTextContent(
    'http://lkouhfdryy/pou'
  )
  expect(component.container).toHaveTextContent(
    15
  )
})

test('clicking the button calls event handler once', () => {
    const blog = {
        url:'http://lkouhfdryy/pou',
        likes:15
    }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} toggleImportance={mockHandler} />
    )
  
    const button = component.getByText('show blog')
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  
test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
  
    const component = render(
      <BlogForm createBlog = {createBlog} />
    )
  
    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')
  
    fireEvent.change(input, { 
      target: { value: 'testing of forms could be easier' } 
    })
    fireEvent.submit(form)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].likes).toBe('testing of forms could be easier')
  })