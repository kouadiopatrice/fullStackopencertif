import  './ShowCont.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import History from './History'

//const  api_key = process.env.REACT_APP_API_KEY;

const ShowContrie = ({filtcontrie}) => {

  const [showAll, setShowAll] = useState(false)
  const [showWather ,setShowContrie] = useState([])

  // console.log('filtcontrie',filtcontrie)
   useEffect(() => {
     console.log('effect')
 
     axios
       .get('http://api.weatherstack.com/current?access_key=24078776b61e8f8d5fef95813ece2d1c&query=New%20York').then(response => {
         console.log('promise fulfilled')
         setShowContrie(response.data)
       })
   }, [])
   console.log('Meteo',showWather)
   console.log('metoe',showWather.location)
   const locations = showWather.location
   const temperatuer =showWather.current
   console.log('location',locations)
   //const filterMeteo = showWather.filter(value => value.name.includes(searchContie))
 

     if (filtcontrie.length > 10) {
      return (
        <div>
        <strong>  Too many match ,specify another filter </strong>
        </div>
      )
    }else if(filtcontrie.length === 1){
        return(
            <div>
                 {filtcontrie.map((value,i) =>
                 <ul key={i}>
                     <strong>  {value.name} </strong> 
                     <p>Capital {value.capital} </p>
                     <p>Population {value.population} </p> 
                     <p> 
                        <strong> Language</strong> 
                        {value.languages.map((lang,i) =>
                            <li key ={i} >{lang.name} </li>)}
                          </p>
                          <p >< img src ={value.flag} alt="drapeau pays" 
                          className ="drapeau" /> </p>                            
                              <h2> Wather in {locations.name} </h2> 
                              <p>
                                temperature:{temperatuer.temperature} Celsus
                                <p >< img src ={temperatuer.weather_icons} alt="drapeau pays" 
                                         className ="drapeau" /> </p>  
                                   <strong>Wind:</strong> {temperatuer.wind_degree } direction { temperatuer.wind_dir}                       
                              </p>
                 </ul>  )}
                 { }
            </div>
        )
    }
   const handlerClick = (event) =>{
    event.preventDefault()
    setShowAll(!showAll)
   }
    return (
      <div>
        {filtcontrie.map((value,i) =>
       <ul key={i}>
        <strong>  {value.name} </strong> 
        <button onClick ={handlerClick} >show</button> 
        <History allClicks={showAll}  value ={value} locations ={locations} temperatuer ={temperatuer} />
       </ul>  )}
      </div>
    )
  }
  export default ShowContrie;