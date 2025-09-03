import { useMemo, useState } from "react";
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

const POSTS = [
  { id: 1, title: "Exam tips for CS201", body: "Share your best revision strategies and resources." },
  { id: 2, title: "Chess Club blitz night", body: "We meet Friday 6pm, beginners welcome." },
  { id: 3, title: "Robotics project ideas", body: "Brainstorming session for autonomous rover." },
  { id: 4, title: "Photography walk route", body: "Sunset portraits this weekend at Barangaroo." },
  { id: 5, title: "Study group: algorithms", body: "Greedy vs DP practice problems." },
];

function highlight(text, q) {
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

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return POSTS;
    return POSTS.filter(p =>
      p.title.toLowerCase().includes(query) || p.body.toLowerCase().includes(query)
    );
  }, [q]);

  return (
    <Wrapper>
      <Title>Forum</Title>
      <Text style={{ marginTop: 6, opacity: .8 }}>
        FR-118 — Search posts by keyword (client-side). Type to filter.
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
        {filtered.map(p => (
          <CardM key={p.id} style={{ padding: 16 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", opacity: .6 }}>Post</div>
            <div style={{ fontWeight: 600, marginTop: 4 }}>{highlight(p.title, q)}</div>
            <div style={{ marginTop: 6, fontSize: 14, opacity: .9 }}>{highlight(p.body, q)}</div>
          </CardM>
        ))}
      </Grid>

      {q.trim() && filtered.length === 0 && (
        <Text style={{ marginTop: 12, opacity: .7 }}>
          No posts match “{q.trim()}”.
        </Text>
      )}
    </Wrapper>
  );
}
