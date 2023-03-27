import React, { useEffect,useState } from 'react'
import { useActionData } from 'react-router-dom'
import { Form } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import CustomMessage from './CustomMessage'

const Signup = () => {
    const [show,setShow] = useState(false)
    const [nameshow,setNameshow] = useState(false)
    const [passwordshow,setPasswordshow] = useState(false)
    const [mess,setMess] = useState({type:"",message:""})
    const [isdisable,setIsdisable] = useState(true)
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
    const namechange = (e)=>{
        if(/^[a-zA-Z]+$/.test(e.target.value))
        {
            setNameshow(false)
            setIsdisable(false)
        }
        else{
            setNameshow(true)
            setIsdisable(true)
        }
    }
    const passwordchange =(e)=>{
        if(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(e.target.value))
        {
            setPasswordshow(false)
            setIsdisable(false)
        }
        else{
            setPasswordshow(true)
            setIsdisable(true)
        }
    }
    return (
        <>
        {show && <CustomMessage data={mess} />}
        <div className='login-form'>
            <Form method='post'>
                <h1>Register New User</h1>
                <div className='content'>
                    <div className='input-field'>
                    <input placeholder='Name' type="text" name='name' id="name" onChange={namechange} required />
                    {/* <p>Name must only be string</p> */}
                    </div>
                    <p className='error-message' style={nameshow ? {display:"block"} : {display:"none"}}>*** Name is not valid</p>
                    <div className='input-field'>
                    <input type="email" placeholder='Email' name='email' id="email" required />
                    </div>
                    <div className='input-field'>
                    <input type="password" placeholder='Password' name='password' id="password" onChange={passwordchange} required />
                    </div>
                    <p className='error-message' style={passwordshow ? {display:"block"} : {display:"none"}}>*** Must Contain lower and capital alphabet,numbers,special characters.</p>
                </div>
                <div className='action'>
                <button type="submit" disabled={isdisable} >Register</button>
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