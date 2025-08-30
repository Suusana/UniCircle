import { createBrowserRouter } from "react-router-dom";
import Club from "../page/Club";
import Login from "../page/Login";
import Appointment from "../page/Appointment";
import Discussion from "../page/Discussion";
import Profile from "../page/Profile";
import Review from "../page/Review";

const router = createBrowserRouter([
  {
    path:'/club',
    element: <Club />
  },
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/appointment',
    element:<Appointment/>
  },
  {
    path:'/discussion',
    element:<Discussion/>
  },
  {
    path:'/profile',
    element: <Profile />
  },
  {
    path:'/signup',
    element:<Register/>
  },
  {
    path:'/review',
    element:<Review/>
  },
  {
    path:'/timetable',
    element:<Timetable/>
  }
])

export default router