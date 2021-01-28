import ShowContrie from './ShowContrie'
const ContrieAll = (props) =>{
 const {contries,searchContie} = props
 console.log('newsearch',searchContie)

 
const filterContrie = contries.filter(value => value.name.includes(searchContie))
 const vero = filterContrie.map(v => v.capital)
 console.log('ero',vero)
 
    return(
      <div>
        <ShowContrie filtcontrie ={filterContrie} />
     </div>
  )
}
export default ContrieAll