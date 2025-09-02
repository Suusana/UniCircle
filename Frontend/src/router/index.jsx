import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home.jsx";

import Friends from "../pages/Friends.jsx";
import Clubs from "../pages/Clubs.jsx";
import DiscussionBoard from "../pages/DiscussionBoard.jsx";
import Appointment from "../pages/appointment.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Review from "../pages/Review.jsx";
import Layout from "../Layout.jsx";
import Timetable from "../pages/Timetable.jsx";
import ClubDetail from "../pages/ClubDetail.jsx";
import Event from "../pages/Event.jsx";
//This is react-router-dom v7
//This file defines all the routes in the application

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/main",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "friends", element: <Friends /> },
      { path: "clubs", element: <Clubs />},
      { path: "clubs/id", element: <ClubDetail /> },
      { path: "clubs/event", element: <Event /> },
      { path: "appointment", element: <Appointment /> },
      { path: "discussion", element: <DiscussionBoard /> },
      { path: "review", element: <Review /> },
      { path: "timetable", element: <Timetable /> },
    ],
  }
]);
export default Router;
