import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { CardM } from "../components/Card.jsx";
import { Title, Text } from "../components/Text.jsx";

const Wrapper = styled.div`padding: 24px;`;
const TopBar = styled.div`
  display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 16px;
`;
const SearchInput = styled.input`
  flex: 1; min-width: 260px; padding: 12px 14px; border: 1px solid #efefef; border-radius: 12px;
  font-size: 16px; outline: none; background: #fff; &:focus{ border-color:#d0d0d0; }
`;
const Count = styled.span`font-size:14px; opacity:.7;`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`;

function highlight(text, q) {
  if (!text) return "";
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: "#fff2a8" }}>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function DiscussionBoard() {
  const [q, setQ] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts/sort?type=newest")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched posts:", data);
        // Handle both array or Spring Data Page object
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && Array.isArray(data.content)) {
          setPosts(data.content);
        } else {
          setPosts([]);
        }
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setPosts([]);
      });
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter(
      p =>
        p.title?.toLowerCase().includes(query) ||
        p.content?.toLowerCase().includes(query)
    );
  }, [q, posts]);

  return (
    <Wrapper>
      <Title>Forum</Title>
      <Text style={{ marginTop: 6, opacity: .8 }}>
        FR-118 & FR-120 — Search and sort posts from backend.
      </Text>

      <TopBar>
        <SearchInput
          placeholder="Search posts by title or content…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Count>{filtered.length} {filtered.length === 1 ? "result" : "results"}</Count>
      </TopBar>

      <Grid>
        {filtered.length > 0 ? (
          filtered.map(p => (
            <CardM key={p.id} style={{ padding: 16 }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", opacity: .6 }}>Post</div>
              <div style={{ fontWeight: 600, marginTop: 4 }}>{highlight(p.title, q)}</div>
              <div style={{ marginTop: 6, fontSize: 14, opacity: .9 }}>{highlight(p.content, q)}</div>
              <div style={{ marginTop: 6, fontSize: 12, opacity: .6 }}>
                {p.commentCount ?? 0} comments
              </div>
            </CardM>
          ))
        ) : (
          <Text style={{ marginTop: 12, opacity: .7 }}>
            No posts found.
          </Text>
        )}
      </Grid>
    </Wrapper>
  );
}
