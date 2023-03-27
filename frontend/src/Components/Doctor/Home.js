import React, { useContext, useEffect } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import AppointmentCard from './AppointmentCard'
import Context from '../../Context/Context'


const Home = () => {
  const navigate = useNavigate();
  const data = useRouteLoaderData('doctor')
  console.log(data)
  const context = useContext(Context);
  const {appointments,setAppointments} = context
  useEffect(() => {
    if(!data.success)
    {
      navigate('/login')
    }
    if(data.success)
    {
      setAppointments(data.json.appointments)
    }
  }, [])
  return (
    <>
      <p className='doctor-heading'>Pending Appointments</p>
      <div className='doctor-container'>
        {appointments.length ===0 && <p style={{textAlign:"center"}}>No Pending Appointments</p>}
      {
        appointments.length !== 0 && appointments.map((appointment) => {
          return appointment.status === "pending" && <AppointmentCard key={appointment._id} isdoctor={true} appointment={appointment} />
        })
      }
      </div>
    </>
  )
}

export default Home