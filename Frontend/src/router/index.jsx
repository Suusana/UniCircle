import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";        // you already have this
import Home from "../pages/Home.jsx";  // you already have this
import Search from "../pages/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,               // Layout should render <NavBar/> and <Outlet/>
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      // later: { path: "posts/:id", element: <PostDetail /> },
    ],
  },
]);

export default router;
