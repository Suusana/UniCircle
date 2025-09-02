export async function fetchPosts({ q = "", categories = [] } = {}) {
  const params = new URLSearchParams();
  if (q && q.trim()) params.set("q", q.trim());
  if (categories?.length) params.set("categories", categories.join(","));

  const url = `http://localhost:8080/api/posts?${params.toString()}`;

  try {
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    const all = [
      { id: 1, title: "Chess Club weekly meetup", category: "clubs", excerpt: "Casual games and tactics." },
      { id: 2, title: "Midterm prep session", category: "academics", excerpt: "Study group for COMP subjects." },
      { id: 3, title: "Careers Fair 2025", category: "events", excerpt: "Connect with employers on campus." },
      { id: 4, title: "Debate Club sign-ups", category: "clubs", excerpt: "Join the debate team." },
      { id: 5, title: "Library workshop: referencing", category: "academics", excerpt: "APA & EndNote basics." },
    ];

    const text = (q ?? "").trim().toLowerCase();
    let filtered = all.filter(
      p => !text || p.title.toLowerCase().includes(text) || p.excerpt.toLowerCase().includes(text)
    );

    if (categories?.length) {
      const set = new Set(categories.map(c => c.toLowerCase()));
      filtered = filtered.filter(p => set.has(p.category));
    }
    await new Promise(r => setTimeout(r, 200));
    return filtered;
  }
}
