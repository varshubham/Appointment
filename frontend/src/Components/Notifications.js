import React, { useEffect, useState,useContext } from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import Context from '../Context/Context'
import { useNavigate } from 'react-router-dom';
import ComponentCard from './ComponentCard';
import '../App.css'
const Notifications = () => {
    const context = useContext(Context)
    const {user,setUser} = context
    const data = useRouteLoaderData('main');

    const navigate = useNavigate();
    useEffect(() => {
        if (data.success === false) {
            navigate('/login')
        }
    }, [data])

    const markasseen = async () => {
        const res = await fetch(`http://localhost:5000/api/auth/markasseen`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await res.json();
        console.log(json)
        if (json.success) {
            setUser(json.data)
        }
    }

    const deletenotifications = async () => {
        const res = await fetch(`http://localhost:5000/api/auth/deletenotifications`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await res.json();
        console.log(json)
        if (json.success) {
            setUser(json.data)
        }
    }
    return (
        <>
            <div className='notifications'>
                <div className='header'>
                    <p className='heading'>Notifications</p>
                    <div className='buttons'>
                        <p className='read' onClick={markasseen}>Mark as read</p>
                        <p className='delete' onClick={deletenotifications}>Clear all</p>
                    </div>
                </div>
                <div>
                    {user.notificationseen.length==0 && user.notificationunseen.length==0 && <p style={{textAlign:"center"}}>No Notification</p>}
                    {user && user.notificationunseen.map((notification, index) => {
                        return <ComponentCard key={index} notification={notification} unseen={true} />
                    })}
                    {/* <button onClick={markasseen}>Mark all as seen</button> */}
                </div>
                <div>
                    {user && user.notificationseen.map((notification, index) => {
                        return <ComponentCard key={index} notification={notification} />
                    })}

                    {/* <button onClick={deletenotifications}>Delete all notification</button> */}
                </div>
            </div>
        </>
    )
}

export default Notifications

// export async function loader()
// {
//     const token = localStorage.getItem('token');
//     if(token !== null)
//     {
//          const res =await fetch('http://localhost:5000/api/auth/userdetail',{
//             method:'GET',
//             headers:{
//                 'auth-token':token
//             }
//         })
//         const json = await res.json();
//         return ({success:true,data:json});
//     }
//     else{
//         return ({success:false})
//     }
// }