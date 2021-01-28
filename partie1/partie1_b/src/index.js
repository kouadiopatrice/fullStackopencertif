import React from 'react'
import ReactDOM from 'react-dom'
 
const Header = (props) => {

  return(
    <div>
        <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) =>{
  const {part} = props
  console.log('content', props)
  return(
    <div>
       {part}  
    </div>
  )
 }
    
 const Total = (props) =>{
   console.log('toatl',props)
    const {total} = props
   return(
     <div>
        <p>Number of exercise:  {total} </p>
      
     </div>
   )
 }

const App = () => {

  const course = {
    name :'Half Stack application development',
   parts :[
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
       {
        name: 'Using props to pass data',
        exercises: 7
      },
       {
        name: 'State of a component',
        exercises: 14
      }
    ]
  } 
 
  const part = course.parts.map((value,i) =><p key = {i}>{ value.name}  {value.exercises} </p>)
  const partie = course.parts.map(exo => exo.exercises)
  console.log('partie',partie)
  let total= 0
  partie.forEach(value =>{
    total += value
  })
 
  return (
    <div>
      <Header course = {course.name}/>
        <Content part = {part} />

        <Total total={total} />
        
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))