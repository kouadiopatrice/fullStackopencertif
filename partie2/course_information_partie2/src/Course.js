

import Header from './Header'
const Course = (props) =>{
    const {course} = props
    
    console.log('compo cours',course)
    const selecteParts = course.map(value => value.parts.map(nom =>nom.name))
    console.log('reccupere',selecteParts)

   /*const nombreExo = course.parts.map(exo => exo.exercises)
    let total = 0
    nombreExo.forEach(value => {
       total += value 
    });
    console.log('total exo',total)
*/
    return(
        <div>
            <h1>Web developpement curriculum</h1>
          <Header course ={course}   />
        </div>
    )
  }
  export default Course