import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Context from '../Context/Context'
import '../App.css'
// import axios from 'axios'
const BookAppointment = () => {
    const context = useContext(Context);
    const {user} = context
    const navigate = useNavigate()
    const [available, setIsavailable] = useState(false)
    const { doctorId } = useParams();
    const [credentials, setCredentials] = useState({ date: "", time: "" })
    const [docName,setDocname]= useState(null)
    const tdate = new window.Date()
    const fdate = moment(tdate).format('YYYY-MM-DD')
    const getdoctor = async()=>{
        const res = await fetch(`http://localhost:5000/api/doctor/getbyid`,{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({id:doctorId})
        })
        const json = await res.json();
        return json
    }
    useEffect(()=>{
        const doc = getdoctor();
        setDocname("Dr." + doc.firstname + " " +doc.lastname)
    },[])
    const datechange = (e) => {
        const formateddate = moment(e.target.value).format('DD-MM-YYYY');
        setCredentials({ ...credentials, date: formateddate })
    }
    const timechange = (e) => {
        // const formatedtime = moment(e.target.value).format('HH:mm');
        setCredentials({ ...credentials, time: e.target.value })
    }
    const check = async () => {
        if (credentials.date === "" || credentials.time === "") {
            alert("Date or Time field must not be empty")
        }
        else {
            const res = await fetch(`http://localhost:5000/api/auth/checkavailability`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ doctorId: doctorId, date: credentials.date, time: credentials.time })
            })
            const json = await res.json();
            if (json.success) {
                setIsavailable(true)
                alert("Appointment is Available,Now you can book the slot")
            }
            else if (!json.success) {
                setIsavailable(false)
                alert("Appointment is not available,try checking for different dates")
            }
        }

    }
    const bookclick = async () => {
        const res = await fetch(`http://localhost:5000/api/auth/bookappointment`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorId: doctorId, date: credentials.date, time: credentials.time,uname:user.name , dname:docName })
        })
        const json = await res.json();
        if (json.success) {
            alert('Your Appointment request is send to doctor.')
            setTimeout(() => {
                navigate('/myappointments')
            }, 1000)
        }

    }
    return (
        <>
            {/* <p>Date</p>
    <input type='date' name='date' onChange={datechange} />
    <p>Time</p>
    <input type='time' name='time' onChange={timechange} />
    <button onClick={check}>Check Appointment</button>
    <button onClick={bookclick}>Book now</button> */}
            <div className='login-form'>

                <h1>Book Appointment</h1>
                <div className='content'>
                    <div className='input-field'>
                        <label htmlFor="date">Appointment Date</label>
                        <input type="date" name='date' id='date' min={fdate} onChange={datechange} required />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="time">Appointment Time</label>
                        <input type="time" name='time' id='time' onChange={timechange} required />
                    </div>
                </div>
                <div className="action">
                    <button style={{ margin: "5px" }} onClick={check}>Check Availability</button>
                    <button style={{ margin: "5px" }} onClick={bookclick} disabled={!available}>Book Doctor</button>
                </div>
            </div>
        </>
    )
}

export default BookAppointment