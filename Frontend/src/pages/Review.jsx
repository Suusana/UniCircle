import { useState, useMemo, useEffect } from "react";
import styled, { css } from "styled-components";
import { http } from "../utils/http";
import LecturerCards from "../components/LecturerCards";
import SubjectCards from "../components/SubjectCards";
import ReviewModal from "../components/ReviewModal";
import CommentsModal from "../components/CommentsModal";
import { useAuth } from "../contexts/AuthContext";

const Page = styled.section`
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 20px 80px;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 1080px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0b0f17;
  margin: 0;
`;

const Tabs = styled.div`
  display: inline-flex;
  padding: 6px;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  gap: 6px;
`;

const TabBtn = styled.button`
  border: none;
  background: transparent;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: #364152;
  ${({ $active }) =>
    $active &&
    css`
      background: #0b0f17;
      color: #fff;
    `}
`;

const SubBar = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(140px, auto) minmax(140px, auto);
  gap: 12px;
  align-items: center;
  margin: 16px 0 20px;
`;

const Input = styled.input`
  height: 42px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 3px rgba(28, 100, 242, 0.12);
    border-color: #1c64f2;
  }
`;

const Select = styled.select`
  height: 42px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 3px rgba(28, 100, 242, 0.12);
    border-color: #1c64f2;
  }
`;

export default function Reviews() {
  const { user } = useAuth();
  const [tab, setTab] = useState("lecturer");
  const [lecturers, setLecturers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");

  // modals
  const [openReview, setOpenReview] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [target, setTarget] = useState(null);

  // load lecturers and subjects with review stats
  const loadData = async () => {
    try {
      setLoading(true);
      setErr("");
      const [LstatsRaw, SstatsRaw] = await Promise.all([
        (await http.get("/reviews/lecturers")).data,
        (await http.get("/reviews/subjects")).data,
      ]);

      const Lcards = await Promise.all(
        LstatsRaw.map(async ([id, name, faculty, avg, count]) => {
          let latest = null;
          try {
            const latestReview = (await http.get(`/reviews/lecturer/${id}/latest`)).data;
            latest = latestReview?.createTime || null;
          } catch {}
          return {
            id: String(id),
            type: "lecturer",
            name,
            dept: faculty,
            stats: { avg: Number(avg || 0), count: Number(count || 0) },
            latestReviewTime: latest,
          };
        })
      );

      const Scards = await Promise.all(
        SstatsRaw.map(async ([id, name, faculty, avg, count]) => {
          let latest = null;
          try {
            const latestReview = (await http.get(`/reviews/subject/${id}/latest`)).data;
            latest = latestReview?.createTime || null;
          } catch {}
          return {
            id: String(id),
            type: "course",
            title: name,
            faculty,
            stats: { avg: Number(avg || 0), count: Number(count || 0) },
            latestReviewTime: latest,
          };
        })
      );

      setLecturers(Lcards);
      setSubjects(Scards);
    } catch (e) {
      setErr(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // initial load and event listener for new reviews
  useEffect(() => {
    loadData(); // first load
    window.addEventListener("review-posted", loadData);
    return () => window.removeEventListener("review-posted", loadData);
  }, []);

  // determine which list to show
  const list = tab === "lecturer" ? lecturers : subjects;

  // filtering and sorting
  const filtered = useMemo(() => {
    let L = [...list];

    if (query) {
      const s = query.toLowerCase();
      L = L.filter((item) => {
        if (item.type === "lecturer") {
          return (
            item.name.toLowerCase().includes(s) ||
            (item.dept || "").toLowerCase().includes(s)
          );
        } else {
          return (
            item.title.toLowerCase().includes(s) ||
            (item.faculty || "").toLowerCase().includes(s)
          );
        }
      });
    }

    if (sort === "top") {
      L.sort((a, b) => (b.stats?.avg || 0) - (a.stats?.avg || 0));
    } else if (sort === "new") {
      L.sort((a, b) => {
        const aTime = new Date(a.latestReviewTime || 0).getTime();
        const bTime = new Date(b.latestReviewTime || 0).getTime();
        return bTime - aTime;
      });
    }

    return L;
  }, [list, query, sort, tab]);

  const handleWrite = (item) => {
    setTarget(item);
    setOpenReview(true);
  };

  const handleView = (item) => {
    setTarget(item);
    setOpenComments(true);
  };

  return (
    <Page>
      <Wrap>
        {/* change tap */}
        <Header>
          <Title>Reviews</Title>
          <Tabs>
            <TabBtn $active={tab === "lecturer"} onClick={() => setTab("lecturer")}>
              Lecturers
            </TabBtn>
            <TabBtn $active={tab === "course"} onClick={() => setTab("course")}>
              Subjects
            </TabBtn>
          </Tabs>
        </Header>

        {/* saerch bar */}
        <SubBar>
          <Input
            placeholder={
              tab === "lecturer"
                ? "Search lecturers or faculty…"
                : "Search subjects or faculty…"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="new">Newest activity</option>
            <option value="top">Top rated</option>
          </Select>
          <div style={{ textAlign: "right", color: "#667085" }}>
            {loading ? "Loading…" : err || ""}
          </div>
        </SubBar>

        {/* main */}
        {loading ? (
          <p style={{ color: "#667085", textAlign: "center" }}>Loading data...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "#667085", textAlign: "center" }}>No results found.</p>
        ) : tab === "lecturer" ? (
          <LecturerCards data={filtered} onWrite={handleWrite} onView={handleView} />
        ) : (
          <SubjectCards data={filtered} onWrite={handleWrite} onView={handleView} />
        )}

        {/* modal */}
        {openReview && (
          <ReviewModal target={target} onClose={() => setOpenReview(false)} user={user} />
        )}
        {openComments && (
          <CommentsModal target={target} onClose={() => setOpenComments(false)} />
        )}
      </Wrap>
    </Page>
  );
}
