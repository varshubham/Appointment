import Login,{action as actionform} from './Components/Login';
import Navbar,{loader as loader} from './Components/Navbar';
import Signup,{action as signupaction} from './Components/Signup';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import ApplyDoctor,{action as doctoraction} from './Components/ApplyDoctor';
import Errorelement from './Components/Errorelement';
import Notifications from './Components/Notifications';
import BookAppointment from './Components/BookAppointment';
import Appointments,{loader as appointmentloader} from './Components/Appointments';
import Doctors,{loader as admindoctorloader} from './Components/Admin/Doctors';
import Users,{loader as adminuserloader} from './Components/Admin/Users';
import Appointment,{loader as doctorappointmentloader} from './Components/Doctor/Appointment';
import Home1 from './Components/Doctor/Home';
import State from './Context/State';
import CustomMessage from './Components/CustomMessage';


const router = createBrowserRouter([
  {
    path:'/',
    id : 'main',
    errorElement: <Errorelement/>,
    loader: loader,
    element:<Navbar/>,
    // element:<CustomMessage/>,
    children : [
      {index:true,element: <Home/>},
      {
        path:'/login',
        action: actionform,
        element : <Login/>
      },
      {
        path:'/signup',
        action: signupaction,
        element:<Signup/>
      },
      {
        path:'/apply-for-doctor',
        action : doctoraction,
        element : <ApplyDoctor/>
      },
      {
        path : '/notifications',
        element : <Notifications/>
      },
      {
        path: '/bookappointment/:doctorId',
        element : <BookAppointment />
      },
      {
        path : '/myappointments',
        loader : appointmentloader,
        element : <Appointments/>
      },
      {
        path : '/admin',
        children :[
          {
            path : "doctors",
            loader : admindoctorloader,
            element :<Doctors/>
          }
          // },
          // {
          //   path : "users",
          //   loader : adminuserloader,
          //   element : <Users/>
          // }
        ]
      },
      {
        path : "/doctor",
        id : 'doctor',
        loader : doctorappointmentloader,
        children :[
          {
            path:'appointments',
            element : <Appointment/>
          },
          {
            path : 'home',
            element : <Home1/>
          }
        ]
      }
      
    ]
  }
])

function App() {
  return (
    <State>
    <RouterProvider router={router}></RouterProvider>
     </State>
  );
}

export default App;
