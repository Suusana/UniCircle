import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
function Home() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default Home;
