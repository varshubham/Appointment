import React from 'react'
// import '../App.css'

const User = (props) => {
  return (
    <>
        <div className="card usercard">
                <div className="car" style={{margin:"20px"}}>
                    <h5 className="cname">Name : {props.user.name}</h5>
                    <h6 className="email">Email : {props.user.email}</h6>
                    <p className="cadmin">{props.user.isAdmin ? "Admin" : "Not Admin"}</p>
                    <p className="cdoctor">{props.user.isDoctor && "Doctor"}</p>
                </div>
            </div>
    </>
  )
}

export default User