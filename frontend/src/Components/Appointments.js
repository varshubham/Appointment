import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
// import moment from 'moment';
import '../App.css'
import AppointmentCard from './Doctor/AppointmentCard';

const Appointments = () => {
  const navigate = useNavigate();
  // const [Doctor,setDoctor] = useState(null)
  const data = useLoaderData();
  useEffect(() => {
    if (!data.success) {
      navigate('/login')
    }
  }, [])
  // useEffect(()=>{
  //   if(data)

  //   }
  // },[data])
  // const clickedme = async()=>{
  //   const res = await fetch(`http://localhost:5000/api/auth/getbyid/${data.json.appointments[0].userId}`,{
  //     method:'GET'
  //   })
  //   const json =await res.json();
  //   console.log(json)
  // }
  return (
    <>
    {/* <button onClick={clickedme}>CLick me</button> */}
      <p className='doctor-heading'>Appointments</p>
      <div className='doctor-container'>
      <div className='appointment-card'>
        {data.success && data.json.appointments.length !== 0 && data.json.appointments.map((appointment)=>{
          return appointment.status==="approved" && <AppointmentCard isuser={true} key={appointment._id} appointment={appointment}/>
        })}
          </div>
      </div>
    </>
  )
}

export default Appointments

export async function loader() {
  if (localStorage.getItem('token')) {
    const res = await fetch(`http://localhost:5000/api/auth/getappointment`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await res.json();
    return { success: true, json: json }
  }
  else {
    return ({ success: false })
  }
}
