import React, { useContext, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import Doctor from '../Doctor';
import Context from '../../Context/Context';

const Doctors = () => {
    const context = useContext(Context);
    const {alldoctors,setAlldoctors} = context;
    const loaderdata = useLoaderData();
    useEffect(()=>{
        if(loaderdata.success)
        {
            setAlldoctors(loaderdata.doctors)
        }
    },[])
  return (
    <>
        <div className='doctor-heading'>Doctors</div>
        {
            alldoctors.length===0 && <p style={{textAlign:"center"}}>No Doctor</p>
        }
        <div>
            {alldoctors.map((doctor,index)=>{
                return <Doctor key={index} access={true} doctor={doctor} />
            })}
        </div>
    </>
  )
}

export default Doctors

export async function loader()
{
    const res = await fetch('http://localhost:5000/api/admin/getalldoctors',{
        method : 'GET',
        headers : {
            'auth-token': localStorage.getItem('token')
        }
    })
    const json = await res.json();
    return json; 
}