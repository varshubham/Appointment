import React from 'react'
import { useRouteError } from 'react-router-dom'

const Errorelement = () => {
  let error = useRouteError()
  console.log(error.data)
  return (
    <div style={{textAlign:"center"}}>{error.data}</div>
  )
}

export default Errorelement