import Context from "./Context";
import { useState } from "react";

const State = (props)=>{
    const [isadmin,setIsadmin] = useState(false)
    const [isdoctor,setIsdoctor] = useState(false)
    const [user,setUser] = useState(null)
    const [custommessage,setCustommessage] = useState({type:"",message:""})
    const [appointments,setAppointments] = useState([])
    const [token,setToken] = useState(false)
    const [alldoctors,setAlldoctors] = useState([])
    return(
        <Context.Provider value={{alldoctors,setAlldoctors,custommessage,setCustommessage,isadmin,setIsadmin,isdoctor,setIsdoctor,user,setUser,appointments,setAppointments,token,setToken}}>
            {props.children}
        </Context.Provider>
    )
}

export default State