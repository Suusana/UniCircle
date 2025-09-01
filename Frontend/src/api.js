const API_BASE = "http://localhost:8080/api";

export async function searchPosts(q) {
  if (!q?.trim()) return [];
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q.trim())}`);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json(); // expect [{id, title, body, tags}]
}