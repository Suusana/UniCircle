import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home.jsx";

import Friends from "../pages/Friends.jsx";
import Clubs from "../pages/clubs.jsx";
import DiscussionBoard from "../pages/DiscussionBoard.jsx";
import Appointment from "../pages/appointment.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Review from "../pages/Review.jsx";
import Layout from "../Layout.jsx";
import Timetable from "../pages/Timetable.jsx";
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
      { path: "clubs", element: <Clubs /> },
      { path: "appointment", element: <Appointment /> },
      { path: "discussion", element: <DiscussionBoard /> },
      { path: "review", element: <Review /> },
      { path: "timetable", element: <Timetable /> },
    ],
  },
]);
export default Router;
