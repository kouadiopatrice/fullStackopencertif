import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
const Button = (props) =>{
  const {onclick ,text} = props
  return(
    <button onClick = {onclick}>{text}</button>
  )
}

const Statistic = (props) =>{
  const {text,value ,pers} = props
return(
<div>
  <table>
    <tbody>
     <tr>
         <td>{text} </td>
         <td> {value}  {pers}</td>
      </tr>
    </tbody>
  </table>
  
  
</div>
)}

const Statistics = (props) =>{
  const {allclick,good,neutral,bad} = props
  let all = good + neutral + bad
  const average = good/all
  let positive = good*100/all
  if(!allclick){
    return(
      <div>
        no feedback given
      </div>
    )
  } else{

    return(
      <div>
         <Statistic text ='good' value ={good}  />
     <Statistic text ='neutral' value ={neutral}  />
     <Statistic text ='bad'   value =   {bad}  />
     <Statistic text ='all' value ={all}  />
     <Statistic text ='average' value ={average.toFixed(1)}  />
     <Statistic text ='positive' value ={positive.toFixed(1)} pers='%'  />
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allclick,setAllclick] = useState(false)

  const handlerGood = () => {
    setAllclick(true)
     setGood(good +1)
  }
  const handlerNeutral = () => {
    setAllclick(true)
    setNeutral(neutral +1)
  }

  const handlerBad = () =>{
    setAllclick(true)
 setBad(bad +1)
  }
 
  return (
    <div>
      <h1>give feedback</h1>
        <Button onclick ={handlerGood} text='good'  />
        <Button onclick={handlerNeutral} text='neutral' />
        <Button onclick ={handlerBad} text ='bad' />
        
      <h1>statistics</h1>
    
      <Statistics allclick={allclick} good ={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)