import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/NavBar.jsx"; // optional if you have it

export default function Layout() {
  return (
    <div>
      {typeof NavBar === "function" ? <NavBar /> : (
        <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #333" }}>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
        </nav>
      )}
      <Outlet />
    </div>
  );
}
