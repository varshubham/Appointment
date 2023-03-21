import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Context from '../Context/Context'

const Doctor = (props) => {
    const context = useContext(Context);
    const {setAlldoctors,alldoctors} = context;
    const navigate = useNavigate()
    const bookappointment = () => {
        navigate(`/bookappointment/${props.doctor._id}`)
    }
    const confirm = async () => {
        const res = await fetch(`http://localhost:5000/api/admin/changedoctorstatus`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doctorId: props.doctor._id, status: "approved" })
        })
        const json = await res.json();
        console.log(json)

        if(json.success)
        {
            alldoctors.map((doc,index)=>{
                if(doc._id===json.newdoctor._id)
                {
                    alldoctors[index] = json.newdoctor;
                }
            })
            setAlldoctors(alldoctors)
        }

    }
    return (
        <>
            <div className="card doctor-card">
                <div className="card-body">
                    <div className='div-one' >
                        <h5 className="card-title">Dr.{props.doctor.firstname + " " + props.doctor.lastname}</h5>
                        <p className="card-text">{props.doctor.specialization}</p>

                        {/* </div> */}
                        {/* <div className='one'> */}
                        <p className="card-text">Address : {props.doctor.address}</p>
                        <p className="card-text">{props.doctor.phoneNumber}</p>
                        {/* </div> */}
                        {/* <div className='one'> */}
                        <p className="card-text">Experience(in years) : {props.doctor.experience}</p>
                        <p className="card-text">Fees per visit : {props.doctor.fees} Rs</p>
                    </div>
                    <div className='div-two'>
                        {props.access && <p className='card-text'>{props.doctor.status}</p>}

                        {props.access && props.doctor.status !== "approved" && <button className='button' onClick={confirm}>Confirm doctor</button>}
                        {!props.access && !props.isAdmin && <button className='button' onClick={bookappointment}>Book appointment</button>}
                    </div>


                </div>

            </div>
        </>
    )
}

export default Doctor