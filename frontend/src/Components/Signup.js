import React, { useEffect,useState } from 'react'
import { useActionData } from 'react-router-dom'
import { Form } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import CustomMessage from './CustomMessage'

const Signup = () => {
    const [show,setShow] = useState(false)
    const [mess,setMess] = useState({type:"",message:""})
    const data = useActionData();
    const navigate = useNavigate()
    useEffect(() => {
        if (data) {
            if (data.success) {
                setShow(true)
                setMess({type:"success", message: "Account Created Successfully" })
                setTimeout(() => {
                    setShow(false)
                    navigate('/')
                }, 1500)
            }
            else if (!data.success) {
                setShow(true)
                setMess({ type:"error",message: "Account Cannot Be created please try with different Email" })
                setTimeout(()=>{    
                    setShow(false)
                },1000)
            }
        }
        
    }, [data])
    return (
        <>
        {show && <CustomMessage data={mess} />}
        <div className='login-form'>
            <Form method='post'>
                <h1>Register New User</h1>
                <div className='content'>
                    <div className='input-field'>
                    <input placeholder='Name' type="text" name='name' id="name" required />
                    </div>
                    <div className='input-field'>
                    <input type="email" placeholder='Email' name='email' id="email" required />
                    </div>
                    <div className='input-field'>
                    <input type="password" placeholder='Password' name='password' id="password" required />
                    </div>
                </div>
                <div className='action'>
                <button type="submit">Register</button>
                </div>
            </Form>
            </div>
        </>
    )
}

export default Signup

export async function action({ request }) {
    const data = await request.formData();
    const res = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), password: data.get('password') })
    })
    const json =await res.json();
    if (json.success) {
        localStorage.setItem('token', json.token)
    }
    return json
}