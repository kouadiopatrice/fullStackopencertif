const History = ({allClicks,value,locations,temperatuer}) => {
    console.log('historique',value)
    if (allClicks) {
      return (
        <div>
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
        </div>
      )
    }
  
    return (
      <div>
        {}
      </div>
    )
  }
  export  default History