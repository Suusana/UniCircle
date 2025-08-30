import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.jsx";
//This is react-router-dom v7
//This file defines all the routes in the application
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
export default Router;
