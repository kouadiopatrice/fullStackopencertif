//import React, { useState } from 'react'


const Input = (props) =>{
const {newvalue,handleronchange} = props;
return(

    <input  value = {newvalue} onChange = {handleronchange} />
)

}
export default Input;