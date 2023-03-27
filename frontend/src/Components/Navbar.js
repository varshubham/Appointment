import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useRouteLoaderData } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Context from '../Context/Context'
import '../App.css'

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(Context)
  // const [token, settoken] = useState(false)
  const { isadmin, setIsadmin, isdoctor, setIsdoctor ,setUser,token,setToken} = context;
  const loaderdata = useRouteLoaderData('main');
  useEffect(() => {
    if (loaderdata.success) {
      setToken(true)
      setUser(loaderdata.user)
      var value = loaderdata.user.isAdmin;
      if (value) {
        setIsadmin(true)
      }
      var value2 = loaderdata.user.isDoctor;
      if (value2) {
        setIsdoctor(true)
      }
    }
  }, [loaderdata])

  const logooutclick = () => {
    localStorage.clear('token');
    setToken(false)
    navigate('/login')
  }
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {token && !isadmin && !isdoctor && <li className="nav-item">
              <Link className="nav-link" to="/apply-for-doctor">Apply for Doctor Account</Link>
            </li>}
            {token && <li className="nav-item">
              <Link className="nav-link" to="/notifications">Notifications</Link>
            </li>}
            
            {token && !isadmin && !isdoctor && <li className="nav-item">
              <Link className="nav-link" to="/myappointments">My Appointments</Link>
            </li>}
            {token && !isadmin && isdoctor && <li className='nav-item'>
              <Link className='nav-link' to='/doctor/appointments'>Appointments</Link></li>}
            {
             token && isadmin && !isdoctor && <li className="nav-item">
                <Link className="nav-link" to="/admin/doctors">All Doctors</Link>
              </li>
            }

            {token && isadmin && !isdoctor && <li className="nav-item">
              <Link className="nav-link" to="/admin/users">All Users</Link>
            </li>}

            {!localStorage.getItem('token') && <button onClick={loginclick}>Login</button>}
            {!localStorage.getItem('token') && <button onClick={signupclick}>Signup</button>}
            {localStorage.getItem('token') && <button onClick={logooutclick}>Logout</button>}
          </ul>
        </div>
      </nav> */}

      <div id="container">
        <nav>

          <Link id='logo' to='/'>Appointment</Link>

          <ul>
            <li><Link id='link' to="/">Home</Link></li>
            {token && !isadmin && !isdoctor && <li><Link id='link' to="/apply-for-doctor">Apply for Doctor</Link></li>}
            {token && <li><Link id='link' to="/notifications">Notifications</Link></li>}
            {token && !isadmin && !isdoctor && <li><Link id='link' to="/myappointments">My Appointments</Link></li>}
            {token && !isadmin && isdoctor && <li><Link id='link' to="/doctor/appointments">Appointments</Link></li>}
            {token && isadmin && !isdoctor && <li><Link id='link' to="/admin/doctors">All Doctors</Link></li>}
            {/* {token && isadmin && !isdoctor && <li><Link id='link' to="/admin/users">All Users</Link></li>} */}
            {!token && <li><Link id='link' to='/login'>Login</Link></li>}
            {!token && <li><Link id='link' to='/signup'>Register</Link></li>}
            {token && <li><p id='link' style={{cursor:"pointer"}} onClick={logooutclick}>Logout</p></li>}
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar

export async function loader() {
  const token = localStorage.getItem('token');
  if (token) {
    const res = await fetch(`http://localhost:5000/api/auth/userdetail`, {
      method: 'GET',
      headers: {
        'auth-token': token
      }
    })
    const json = await res.json();
    return ({ success: true, user: json });
  }
  return ({ success: false })
}