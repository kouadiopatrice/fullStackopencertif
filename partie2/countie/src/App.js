import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ContrieAll from './ContrieAll'

const  App = () => {
  const [searchContrie, setSearchContrie] = useState([])
  const [newsearche, setNewSeache] = useState()
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setSearchContrie(response.data)
      })
  }, [])

  const handlerContrie = (event) =>{
    console.log(event.target.value)
    setNewSeache(event.target.value)
  }
  
  return (
    <div>
         <strong>  find contries</strong> <input 
              value={newsearche}
              onChange={handlerContrie}
           />
          <hr/>
           <ContrieAll contries ={searchContrie} searchContie ={newsearche} />
           
  </div>
  );
}

export default App;
