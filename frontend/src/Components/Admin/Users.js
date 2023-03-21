import React from 'react'
import { useLoaderData } from 'react-router-dom'
import User from '../User'

const Users = () => {
    const loaderdata = useLoaderData()
  return (
    <>
        <div className='doctor-heading' style={{color:"black"}}>Users</div>
        <div>
            {loaderdata.success && loaderdata.users.map((user,index)=>{
                return <User key={index} user={user} />
            })}
        </div>
    </>
  )
}

export default Users

export async function loader () 
{
    const res = await fetch('http://localhost:5000/api/admin/getallusers',{
        method : 'GET',
        headers : {
            'auth-token':localStorage.getItem('token')
        }
    })
    const json = await res.json();
    return json
}