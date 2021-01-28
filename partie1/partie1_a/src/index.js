import React from 'react'
import ReactDOM from 'react-dom'
 
const Header = (props) => {

  return(
    <div>
        <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  return(
    <div>
        <p>{props.name} {props.exercice} </p>
    </div>
    
  )
}
const Content = () =>{
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return(
    <div>
       <Part name ={part1} exercice ={exercises1} /> 
       <Part name ={part2} exercice ={exercises2} /> 
       <Part name ={part3} exercice ={exercises3} /> 
    </div>
  )
 }
    
 const Total = (props) =>{
   return(
     <div>
        <p>Number of exercise: {props.total}</p>
      
     </div>
   )
 }

const App = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const total = exercises1 + exercises2 +exercises3 ;

   const course = 'Half Stack application development'

  return (
    <div>
      <Header course = {course}/>
        <Content />
        <Total total ={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))