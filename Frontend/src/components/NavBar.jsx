import { useState } from "react";
import { useNavigate, createSearchParams, Link } from "react-router-dom";

export default function NavBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate({ pathname: "/search", search: `?${createSearchParams({ q })}` });
  }

  return (
    <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #333" }}>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <form onSubmit={onSubmit} style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search"
        />
        <button type="submit">Go</button>
      </form>
    </nav>
  );
}
