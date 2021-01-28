import Part from './Part'
const Content = (props) =>{
  const {partie} = props
  console.log('partie contenent', partie)
  
    return(
      <div>
        {partie.map(value =>
           <Part  key ={value.id} partie ={value}  />        
          )}
          
      </div>
    )
   }

   export default Content ;