import React from 'react'
import '../App.css'

const ComponentCard = (props) => {
  return (
    <>
    <div className="notification-card">
                <div className="card-body" style={props.unseen ? {backgroundColor:"gray"} : {backgroundColor:"white"}}>
                    <h5 className="card-title">{props.notification.type}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.notification.message}</h6>
                </div>
            </div>
    </>
  )
}

export default ComponentCard