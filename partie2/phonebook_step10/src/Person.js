import react from 'react'

const Person = (person,toggleName,label) =>{
    
    return(
   <div>
       {person.name}
       <button type ='submit'
       onClick ={toggleName} >{label}
       </button>
    
    </div>
    )
}
export default Person

