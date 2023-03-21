import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { useActionData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import CustomMessage from './CustomMessage'

const ApplyDoctor = () => {
    const [show, setShow] = useState(false)
    const [mess, setMess] = useState({ type: "", message: "" })
    const data = useActionData();
    const navigate = useNavigate();
    useEffect(() => {
        if (data) {
            if (data.success) {
                setShow(true);
                setMess({ type: "success", message: "Account Applied Successfully" })
                setTimeout(() => {
                    setShow(false)
                    navigate('/')
                }, 1500)
            }
            else if (!data.success) {
                setShow(true)
                setMess({ type: "error", message: "Account already applied" });
                setTimeout(() => {
                    setShow(false);
                    navigate('/')
                }, 1500)
            }
        }
    }, [data])
    return (
        <>
            {show && <CustomMessage data={mess} />}

            <div className='apply'>
                <p className='apply-title'>Apply for Doctor</p>
            </div>

            <Form method='post' style={{ width: "30%", marginLeft: "auto", marginRight: "auto", marginTop: "30px" }} className='my-3' >
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" className="form-control" name='firstname' id="firstname" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name='lastname' id="lastname" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" style={{ textDecoration: "none" }} name='phoneNumber' id="phoneNumber" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" name='address' id="address" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="specialization" className="form-label">Specialization</label>
                    <input type="text" className="form-control" name='specialization' id="specialization" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="experience" className="form-label">Experience</label>
                    <input type="number" className="form-control" name='experience' id="experience" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="fees" className="form-label">Fees</label>
                    <input type="number" className="form-control" name='fees' id="fees" required />
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
        </>
    )
}

export default ApplyDoctor

export async function action({ request }) {
    const data = await request.formData();
    const res = await fetch(`http://localhost:5000/api/auth/doctoraccount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ firstname: data.get('firstname'), lastname: data.get('lastname'), phoneNumber: Number(data.get('phoneNumber')), address: data.get('address'), specialization: data.get('specialization'), experience: Number(data.get('experience')), fees: Number(data.get('fees')) })
    })
    if (res.status == 400) {
        return res.body
    }
    const json = await res.json();
    return json
}