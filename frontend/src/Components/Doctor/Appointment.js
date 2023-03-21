import React, { useContext, useEffect } from 'react'
// import { useRouteLoaderData } from 'react-router-dom';
import AppointmentCard from './AppointmentCard';
import Context from '../../Context/Context';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
// import moment from 'moment';

const Appointment = () => {
    const context = useContext(Context);
    const navigate =useNavigate()
    const {appointments} = context;
    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/login')
        }
    },[])
    // const data = useRouteLoaderData('doctor')
  return (
    <>
    <p className='doctor-heading'>Appointments</p>
    <div className='doctor-container'>
  
    {
        appointments.length !==0 && appointments.map((appointment)=>{
            return appointment.status==="approved" && <AppointmentCard key={appointment._id} isdoctor={true} appointment={appointment}/>
        })
     }
     </div>
    </>
  )
}

export default Appointment

export async function loader()
{
    if(localStorage.getItem('token'))
    {
        const res = await fetch('http://localhost:5000/api/doctor/getappointments',{
        method:'GET',
        headers:{
            'auth-token':localStorage.getItem('token')
        }
    })
    const json = await res.json();
    return ({success:true,json:json});
    }
    else {
        return ({success:false})
    }
    
}