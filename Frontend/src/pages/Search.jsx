import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter.jsx";
import { fetchPosts } from "../api.js";

export default function SearchPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const qParam = params.get("q") ?? "";
  const categoriesParam = params.get("categories") ?? "";
  const initialCats = useMemo(
    () => categoriesParam.split(",").map(s => s.trim()).filter(Boolean),
    [categoriesParam]
  );

  const [q, setQ] = useState(qParam);
  const [cats, setCats] = useState(initialCats);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const next = new URLSearchParams();
    if (q && q.trim()) next.set("q", q.trim());
    if (cats.length) next.set("categories", cats.join(","));
    setParams(next, { replace: true });
  }, [q, cats, setParams]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await fetchPosts({ q: qParam, categories: initialCats });
        setPosts(results);
      } catch {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [qParam, categoriesParam]);

  const onSubmit = (e) => {
    e.preventDefault();
    setQ(q.trim());
  };

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
      <h2 style={{ marginBottom: 12 }}>Search & Filter</h2>

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts…"
          style={{ padding: "8px 10px", minWidth: 260 }}
        />
        <button type="submit" style={{ padding: "8px 14px" }}>Search</button>
      </form>

      <div style={{ marginTop: 12 }}>
        <CategoryFilter value={cats} onChange={setCats} />
      </div>

      <hr style={{ margin: "16px 0 12px" }} />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "tomato" }}>{error}</p>}
      {!loading && !error && posts.length === 0 && <p>No posts match your search.</p>}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {posts.map(p => (
          <li key={p.id} style={{ border: "1px solid #333", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{p.title}</h3>
              <span style={{
                padding: "2px 8px",
                borderRadius: 999,
                fontSize: 12,
                border: "1px solid #555",
                textTransform: "capitalize"
              }}>
                {p.category}
              </span>
            </div>
            {p.excerpt && <p style={{ margin: "8px 0 0", opacity: 0.85 }}>{p.excerpt}</p>}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16 }}>
        <button onClick={() => navigate("/")} style={{ padding: "6px 12px" }}>
          ← Back Home
        </button>
      </div>
    </div>
  );
}
