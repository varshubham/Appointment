import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { useActionData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import CustomMessage from './CustomMessage'
// import Context from '../Context/Context'
const Login = () => {
    // const context = useContext(Context);
    // const { setCustommessage } = context
    const [show,setShow] = useState(false)
    const data = useActionData();
    const navigate = useNavigate()
    const [mess,setMess] = useState({type:"",message:""})
    useEffect(() => {
        if (data) {
            if (data.success) {
                setShow(true)
                setMess({type:"success", message: "Signed in Successfully" })
                setTimeout(() => {
                    setShow(false)
                    navigate('/')
                }, 1500)
            }
            else if (!data.success) {
                setShow(true)
                setMess({ type:"error",message: "Invalid Credentials" })
                setTimeout(()=>{    
                    setShow(false)
                },1000)
            }
        }

    }, [data])
    return (
        <>
            {/* <div>
            <Form method='post' style={{width:"30%",marginLeft:"auto",marginRight:"auto",marginTop:"30px"}} className='bg-gray-800 my-3' >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" required />

                </div>
                <div className="bg-gray-800 mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
            </div> */}
    {show && <CustomMessage data={mess}/>}
            
            <div className='login-form'>

                <Form method='post'>
                    <h1>SIGN IN</h1>
                    <div className='content'>
                        <div className='input-field'>
                            <input placeholder='Email' type="email" name='email' id='email' required />
                        </div>
                        <div className='input-field'>
                            <input placeholder='Password' type="password" name='password' id='password' required />
                        </div>
                    </div>
                    <div className="action">
                        <button type='submit'>Sign in</button>
                    </div>

                </Form>
            </div>

        </>
    )
}

export default Login

export async function action({ request }) {
    const data = await request.formData();
    const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.get('email'), password: data.get('password') })
    })

    const json = await res.json();
    if (json.success) {
        localStorage.setItem('token', json.token);
    }
    return json;
}