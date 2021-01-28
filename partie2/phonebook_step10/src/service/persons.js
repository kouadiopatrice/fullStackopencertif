import axios from 'axios'
//const baseUrl = '/api/persons'
const baseUrl = 'http://localhost:3001/api/persons';
const getAll = () =>{
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObjet =>{
    const request = axios.post(baseUrl,newObjet);
    return request.then(response => response.data)
}
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  const Delete = (id) =>{
      const request = axios.delete(`${baseUrl}/${id}`,newObject)
      return request.then(response =>response.data )
  }

  
  export default {getAll,create,update,Delete}