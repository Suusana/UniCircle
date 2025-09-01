import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchPosts } from "../api";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [value, setValue] = useState(q);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!q) { setResults([]); return; }
      setLoading(true); setErr("");
      try {
        const data = await searchPosts(q);
        if (!cancelled) setResults(data);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [q]);

  function onSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    // update the URL (reloads this route with new ?q=…)
    window.history.replaceState({}, "", `/search?${params.toString()}`);
    // trigger a manual reload of params by navigating:
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  return (
    <div style={{ padding: 16, maxWidth: 800, margin: "0 auto" }}>
      <h2>Search</h2>

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search posts…"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Search</button>
      </form>

      {!q && <p>Type a keyword and press Enter.</p>}
      {loading && <p>Searching…</p>}
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {q && !loading && !err && (
        <>
          <p style={{ color: "#888" }}>
            {results.length} result{results.length !== 1 ? "s" : ""} for “{q}”
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((p) => (
              <li key={p.id} style={{ padding: "10px 0", borderBottom: "1px solid #333" }}>
                <Link to={`/posts/${p.id}`} style={{ fontWeight: 600 }}>{p.title}</Link>
                {p.body && <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
                  {p.body.slice(0, 150)}{p.body.length > 150 ? "…" : ""}
                </div>}
                {p.tags && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>Tags: {p.tags}</div>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
