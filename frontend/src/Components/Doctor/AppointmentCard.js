import React, { useContext } from 'react'
import moment from 'moment'
import '../../App.css'
import Context from '../../Context/Context'

const AppointmentCard = (props) => {
  const context = useContext(Context);
  const {appointments,setAppointments} = context
    const confirm = async(id)=>{
        const res = await fetch(`http://localhost:5000/api/doctor/change-status`,{
            method : 'PUT',
            headers : {
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({id:id,status :"approved"})
        })
        const json = await res.json();
        if(json.success)
        {
          const newapp = appointments.filter((appointment)=>{
            return appointment._id!==json.appointment._id
          })
          newapp.push(json.appointment);
          setAppointments(newapp)
        }
    }
  return (
    <>
    { <div className='appointment-card'>{props.isuser && <div className='app-card'>Appointment with {props.appointment.doctorName}</div>}{props.isdoctor && <div className='app-card'>Appointment with {props.appointment.userName}</div>}<div className='appointment-date'><div>Appointment Date - {moment(props.appointment.date).format("DD-MM-YYYY")}</div>
    <div>Appointment Time - {moment(props.appointment.time).format("HH:mm")}</div></div>
    {props.appointment.status==="pending" && <p className='appointment-button' onClick={()=>{confirm(props.appointment._id)}}>Confirm Appointment</p>}
    </div>}
    </>
  )
}

export default AppointmentCard