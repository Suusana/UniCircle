import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";

const Page = styled.section`
  min-height: 100vh;
  background: #fafafa;
  padding: 24px;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
`;
const Top = styled.div`
  display: grid; grid-template-columns: 1fr 160px 160px; gap: 12px; margin-bottom: 16px;
  @media (max-width: 840px){ grid-template-columns: 1fr; }
`;
const Input = styled.input`
  height: 42px; border-radius: 12px; border: 1px solid #e6e6e6; background: #fff; padding: 0 14px; font-size: 14px;
  &:focus { box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; outline: none; }
`;
const Select = styled.select`
  height: 42px; border-radius: 12px; border: 1px solid #e6e6e6; background: #fff; padding: 0 12px; font-size: 14px;
  &:focus { box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; outline: none; }
`;
const Button = styled.button`
  height: 36px; border-radius: 10px; padding: 0 10px; border: 1px solid transparent;
  background: #0b0f17; color: #fff; font-weight: 600; font-size: 13px; cursor: pointer;
  box-shadow: 0 6px 18px rgba(11,15,23,.15);
  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;`;
const Card = styled.article`
  background: #fff; border: 1px solid #efefef; border-radius: 16px; box-shadow: 0 8px 24px rgba(16,24,40,.06);
  padding: 16px; display: grid; gap: 10px;
`;
const Title = styled.h1`margin: 0 0 12px 0; font-size: 28px; font-weight: 800;`;
const H = styled.h3`margin: 0; font-size: 16px;`;
const Meta = styled.div`font-size: 12px; color: #667085;`;
const Tag = styled.span`font-size: 12px; padding: 4px 8px; border-radius: 999px; background: #f5f7fb; color:#475467; border:1px solid #eef2f6; margin-right: 6px;`;
const Textarea = styled.textarea`
  width: 100%; min-height: 100px; resize: vertical; border-radius: 12px; border: 1px solid #e6e6e6; padding: 10px; font-size: 14px;
  &:focus { outline: none; box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;
const Small = styled.small`color:#667085;`;
const CommentRow = styled.div`display:grid; grid-template-columns: 1fr auto; gap: 8px;`;
const Comment = styled.div`padding:8px 10px; background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px;`;

function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "#fff2a8" }}>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}


const seed = [
  { id: 1, title: "Exam tips for CS201", body: "Share your best revision strategies.", tags: ["study", "cs"], comments: [{ by: "Ava", text: "Pomodoro works!", up: 2, down: 0 }], createdAt: "2025-09-25" },
  { id: 2, title: "Chess Club blitz night", body: "We meet Friday 6pm, beginners welcome.", tags: ["club", "chess"], comments: [{ by: "Liam", text: "See you there", up: 0, down: 0 }], createdAt: "2025-09-26" },
  { id: 3, title: "Robotics rover ideas", body: "Brainstorming session for autonomous rover.", tags: ["robotics"], comments: [], createdAt: "2025-09-20" },
];

export default function DiscussionBoard() {
  const [posts, setPosts] = useState(seed);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [form, setForm] = useState({ title: "", body: "", tags: "" });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔁 Search index refreshed at", new Date().toLocaleTimeString());
      
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let out = [...posts];
    if (query) {
      out = out.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.body.toLowerCase().includes(query) ||
        p.tags.join(",").toLowerCase().includes(query)
      );
    }
    if (sortBy === "newest") {
      out.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    } else if (sortBy === "mostCommented") {
      out.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
    } else if (sortBy === "trending") {
      out.sort((a, b) => (b.comments.length * 2 + +new Date(b.createdAt)) - (a.comments.length * 2 + +new Date(a.createdAt)));
    }
    return out;
  }, [posts, q, sortBy]);


  const submitPost = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const newPost = {
      id: Math.max(0, ...posts.map(p => p.id)) + 1,
      title: form.title.trim(),
      body: form.body.trim(),
      tags,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setForm({ title: "", body: "", tags: "" });
  };


  const addComment = (postId, text) => {
    if (!text.trim()) return;
    setPosts(ps =>
      ps.map(p => p.id === postId
        ? { ...p, comments: [...p.comments, { by: "You", text: text.trim(), up: 0, down: 0 }] }
        : p
      )
    );
  };

  const startEdit = (postId, i, text) => {
    setEditingId(`${postId}-${i}`);
    setEditText(text);
  };

  const saveEdit = (postId, i) => {
    setPosts(ps =>
      ps.map(p => p.id === postId
        ? { ...p, comments: p.comments.map((c, j) => j === i ? { ...c, text: editText } : c) }
        : p
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const deleteComment = (postId, i) => {
    setPosts(ps =>
      ps.map(p => p.id === postId
        ? { ...p, comments: p.comments.filter((_, j) => j !== i) }
        : p
      )
    );
  };

  const voteComment = (postId, i, dir) => {
    setPosts(ps =>
      ps.map(p =>
        p.id === postId
          ? {
            ...p,
            comments: p.comments.map((c, j) =>
              j === i
                ? {
                  ...c,
                  up: dir === "up" ? (c.up ?? 0) + 1 : c.up,
                  down: dir === "down" ? (c.down ?? 0) + 1 : c.down,
                }
                : c
            ),
          }
          : p
      )
    );
  };

  return (
    <Page>
      <Title>Forum</Title>

      <Top>
        <Input placeholder="Search posts…" value={q} onChange={e => setQ(e.target.value)} />
        <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="mostCommented">Most Commented</option>
          <option value="trending">Trending</option>
        </Select>
        <div />
      </Top>

      {/* Create post */}
      <Card style={{ marginBottom: 16 }}>
        <H>Create a discussion</H>
        <Input placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ marginTop: 8 }} />
        <Textarea placeholder="Write your post…" value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
        <Input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button onClick={submitPost}>Post</Button>
        </div>
      </Card>

      {/* Results */}
      <Grid>
        {filtered.map(p => (
          <Card key={p.id}>
            <div>
              <H>{highlight(p.title, q)}</H>
              <Meta>{new Date(p.createdAt).toLocaleString()} · {p.comments.length} comment{p.comments.length !== 1 ? "s" : ""}</Meta>
            </div>
            <div>{highlight(p.body, q)}</div>
            <div>{p.tags.map(t => <Tag key={t}>#{t}</Tag>)}</div>

            {/* Comments */}
            <div style={{ display: "grid", gap: 6 }}>
              {p.comments.map((c, i) => (
                <Comment key={i}>
                  <b>{c.by}:</b>{" "}
                  {editingId === `${p.id}-${i}` ? (
                    <>
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{ marginTop: 4 }}
                      />
                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        <Button onClick={() => saveEdit(p.id, i)}>Save</Button>
                        <Button onClick={() => setEditingId(null)}>Cancel</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {c.text}
                      {c.by === "You" && (
                        <>
                          <Button
                            style={{ marginLeft: 6, background: "#1c64f2" }}
                            onClick={() => startEdit(p.id, i, c.text)}
                          >
                            ✏️
                          </Button>
                          <Button
                            style={{ marginLeft: 4, background: "#ef4444" }}
                            onClick={() => deleteComment(p.id, i)}
                          >
                            🗑️
                          </Button>
                        </>
                      )}
                      <Button onClick={() => voteComment(p.id, i, "up")} style={{ marginLeft: 8 }}>
                        👍 {c.up ?? 0}
                      </Button>
                      <Button onClick={() => voteComment(p.id, i, "down")}>
                        👎 {c.down ?? 0}
                      </Button>
                    </>
                  )}
                </Comment>
              ))}
              <InlineComment postId={p.id} onAdd={addComment} />
            </div>
          </Card>
        ))}
      </Grid>

      {q.trim() && filtered.length === 0 && <Small style={{ display: "block", marginTop: 12 }}>No posts match “{q.trim()}”.</Small>}
    </Page>
  );
}

function InlineComment({ postId, onAdd }) {
  const [val, setVal] = useState("");
  return (
    <CommentRow>
      <Input placeholder="Write a comment…" value={val} onChange={e => setVal(e.target.value)} />
      <Button onClick={() => { onAdd(postId, val); setVal(""); }}>Comment</Button>
    </CommentRow>
  );
}
