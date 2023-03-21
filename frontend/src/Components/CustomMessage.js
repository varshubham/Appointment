import React, { useContext } from 'react'
// import Context from '../Context/Context'
import '../App.css'

const CustomMessage = (props) => {
  return (
    <>
   
    <div id='message' className={props.data.type==="success" ? "info-success":"info-error"}>{props.data.message}</div>
    </>
  )
}

export default CustomMessage