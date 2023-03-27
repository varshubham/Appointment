import React, { useContext, useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Doctor from './Doctor';
import '../App.css'
// import context from '../Context/Context';

const Home = () => {
    // const context = useContext(context)
    const [doctors, setDoctors] = useState([])
    const [isadmin, setIsadmin] = useState(false)
    const navigate = useNavigate();
    const data = useRouteLoaderData('main');
    const getdoctor = async () => {
        const res = await fetch(`http://localhost:5000/api/auth/getalldoctors`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await res.json();
        setDoctors(json.doctors)
    }
    useEffect(() => {
        if (!data.success) {
            navigate('/login')
        }
        else if (data.user.isDoctor) {
            navigate('/doctor/home')
        }
        else if (data.user.isAdmin) {
            setIsadmin(true)
        }
        if (localStorage.getItem('token')) {
            getdoctor();
        }


    }, [data])


    return (
        <>
            <div className='home'>
                {isadmin && <p className='doctor-heading'>Confirmed Doctors</p>}
                { doctors.map((doc) => {
                    // return <Doctor key={doc._id} doctor={doc} />
                    return <Doctor key={doc._id} isAdmin={isadmin} access={true} doctor={doc} />
                })}
            </div>
        </>
    )
}

export default Home
