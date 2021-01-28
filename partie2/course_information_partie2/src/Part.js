//import App from './App'
const Part = (props) => {
  const {partie} = props
  console.log('partie part' ,partie)
    return(
        <ul> {partie.name} {partie.exercises} </ul>  

    )
  }
  export default Part;