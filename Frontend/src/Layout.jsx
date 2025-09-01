import { Outlet } from "react-router-dom";
import NavBar from "../src/components/NavBar.jsx";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default Layout;
