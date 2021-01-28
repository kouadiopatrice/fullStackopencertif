import Content from './Content'
const Header = (props) => {
    const {course} = props
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
    return(
      <div>
        {course.map(value => 
         <span key = {value.id}><h2> {value.name} </h2> 
           <  Content  partie ={value.parts}  />
           <strong>Total of {value.parts.map(exo => exo.exercises).reduce(reducer)} exercise: </strong>
           </span>
          )}
         
         
          
      </div>
    )
  }
  export default Header;