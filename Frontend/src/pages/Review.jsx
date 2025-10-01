import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { http } from "../utils/http"; // axios instance

/* ================== UI ================== */
const Page = styled.section`
  min-height: 100vh; background: #fafafa; display: flex; align-items: flex-start; justify-content: center; padding: 48px 20px 80px; box-sizing: border-box;
`;
const Wrap = styled.div` width: 100%; max-width: 1080px; `;
const Header = styled.header` display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; `;
const Title = styled.h1` font-size: 28px; font-weight: 700; color: #0b0f17; margin: 0; `;
const Tabs = styled.div` display: inline-flex; padding: 6px; background:#fff; border:1px solid #eaeaea; border-radius: 14px; gap: 6px; `;
const TabBtn = styled.button`
  border:none; background: transparent; padding:10px 14px; border-radius: 10px; cursor:pointer; font-weight:600; color:#364152;
  ${({ $active }) => $active && css`background:#0b0f17; color:#fff;`}
`;
const SubBar = styled.div`
  display: grid; grid-template-columns: 1fr minmax(140px, auto) minmax(140px, auto);
  gap: 12px; align-items: center; margin: 16px 0 20px;
  @media (max-width: 820px) { grid-template-columns: 1fr 1fr; grid-auto-rows: auto; }
`;
const Input = styled.input`
  height: 42px; border-radius: 12px; border: 1px solid #e6e6e6; background: #fff; padding: 0 14px; font-size: 14px; outline: none;
  &:focus { box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;
const Select = styled.select`
  height: 42px; border-radius: 12px; border: 1px solid #e6e6e6; background: #fff; padding: 0 12px; font-size: 14px; outline: none;
  &:focus { box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;
const Button = styled.button`
  height: 40px; border-radius: 12px; padding: 0 14px; border: 1px solid transparent; background: #0b0f17; color: #fff; font-weight: 600; font-size: 14px; cursor: pointer;
  transition: transform .02s ease, box-shadow .2s ease, background .2s ease; box-shadow: 0 6px 18px rgba(11, 15, 23, 0.15);
  &:hover { transform: translateY(-1px); } &:active { transform: translateY(0); }
`;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px;
  @media (max-width: 1080px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;
const Card = styled.article` background: #fff; border: 1px solid #efefef; border-radius: 20px; padding: 18px; box-shadow: 0 8px 24px rgba(16, 24, 40, 0.06); display:flex; flex-direction:column; gap:10px; `;
const Row = styled.div` display: flex; align-items: center; gap: 12px; `;
const Avatar = styled.div` width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg,#e6eeff,#f6f9ff); display: grid; place-items: center; color: #1c64f2; font-weight: 800; `;
const Name = styled.div` font-weight: 700; color: #0b0f17; font-size: 14px; `;
const Meta = styled.div` color: #667085; font-size: 12px; `;
const Body = styled.p` margin: 8px 0 0; color: #101828; font-size: 13px; line-height: 1.6; max-height: 3.2em; overflow:hidden; text-overflow:ellipsis; `;
const TagRow = styled.div` display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; `;
const Tag = styled.span` font-size: 12px; padding: 6px 10px; border-radius: 999px; background: #f5f7fb; color: #475467; border: 1px solid #eef2f6; `;
const FooterRow = styled.div` display:flex; align-items:center; justify-content:space-between; margin-top:8px; `;
const StarsWrap = styled.div` display: inline-flex; gap: 4px; align-items: center; `;
const starCss = css`
  width: 18px; height: 18px; display: inline-block; mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z"/></svg>') no-repeat center / contain; background: #e2e8f0;
`;
const Star = styled.i`${starCss} ${({ $filled }) => $filled && css`background: #f59e0b;`}`;
const Overlay = styled.div` position: fixed; inset: 0; background: rgba(0,0,0,.25); display: grid; place-items: center; z-index: 50; `;
const Modal = styled.div` width: min(640px, calc(100vw - 32px)); background: #fff; border-radius: 20px; border: 1px solid #efefef; padding: 20px; box-shadow: 0 12px 36px rgba(16,24,40,.18); `;
const ModalHead = styled.div` display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; `;
const ModalTitle = styled.h3` margin: 0; font-size: 18px; font-weight: 700; color: #0b0f17; `;
const CloseBtn = styled.button` border: none; background: transparent; font-size: 22px; line-height: 1; cursor: pointer; color: #667085; `;
const TextArea = styled.textarea`
  width: 100%; min-height: 120px; resize: vertical; border-radius: 12px; border: 1px solid #e6e6e6; padding: 12px; box-sizing: border-box; font-size: 14px;
  &:focus { outline: none; box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;
const Small = styled.small` color: #667085; display: block; margin-top: 6px; `;

//star rating component
const StarRating = ({ value = 0 }) => (
  <StarsWrap>{[1,2,3,4,5].map(n => <Star key={n} $filled={n <= value} />)}</StarsWrap>
);

//local average
const avgLocal = (arr) => arr.length ? (arr.reduce((s,r)=>s+Number(r.rating||0),0)/arr.length) : 0;

// fetch JSON helper
const getJSON = async (url) => (await http.get(url)).data;

// sanitize reviews: normalize fields, filter invalid, sort by date desc
const sanitizeReviews = (revs = []) =>
  (revs || [])
    .map((r) => {
      const rating = Number(r.rate);
      const name = r.student?.firstName?.trim()
        ? r.student.firstName.trim()
        : (r.studentId != null ? `Student #${r.studentId}` : "Anonymous");
      return {
        user: name,
        rating: Number.isFinite(rating) ? rating : null,
        text: r.description ?? "",
        date: r.createTime || r.created_at || r.date || ""
      };
    })
    .filter((r) => (r.rating && r.rating > 0) || (r.text && r.text.trim().length > 0))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

export default function Reviews() {
  const { user } = useAuth();
  const [tab, setTab] = useState('lecturer'); // lecturer | course
  const [lecturers, setLecturers] = useState([]);
  const [subjects, setSubjects]   = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new"); // new | top

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null); // { id, type, display }
  const [composeText, setComposeText] = useState("");
  const [composeStars, setComposeStars] = useState(0);
  const canSubmit = composeText.trim().length >= 8 && composeStars > 0;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

// view all comments
  const [openList, setOpenList] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listItems, setListItems] = useState([]); // [{user,rating,text,date}]
  const [listLoading, setListLoading] = useState(false);

// load stats & initial data
  useEffect(() => {
    (async () => {
      setErr(""); setLoading(true);
      try {
        const [LstatsRaw, SstatsRaw] = await Promise.all([
          getJSON(`/reviews/lecturers`),
          getJSON(`/reviews/subjects`)
        ]);

        const Lstats = (LstatsRaw || []).filter(row => Number(row?.[0]) > 0);
        const Sstats = (SstatsRaw || []).filter(row => Number(row?.[0]) > 0);

        const loadLecturerCards = Promise.all(
          Lstats.map(async (row) => {
            const [id, avg, count] = row;
            const idNum = Number(id);
            let name = `Lecturer #${idNum}`, dept = "", reviews = [];
            try {
              const revs = await getJSON(`/reviews/lecturer/${idNum}`);
              reviews = sanitizeReviews(revs);
              const lec = revs?.[0]?.lecturer;
              if (lec) {
                name = `${lec.firstName ?? ""} ${lec.lastName ?? ""}`.trim() || name;
                dept = lec.faculty ?? "";
              }
            } catch {}
            return { id: String(idNum), type:'lecturer', name, dept, reviews, stats:{ avg:Number(avg||0), count:Number(count||0) } };
          })
        );

        const loadSubjectCards = Promise.all(
          Sstats.map(async (row) => {
            const [id, avg, count] = row;
            const idNum = Number(id);
            let title = `Subject #${idNum}`, faculty = "", reviews = [];
            try {
              const revs = await getJSON(`/reviews/subject/${idNum}`);
              reviews = sanitizeReviews(revs);
              const subj = revs?.[0]?.subject;
              if (subj) {
                title   = subj.name ?? title;
                faculty = subj.faculty ?? "";
              }
            } catch {}
            return { id: String(idNum), type:'course', title, faculty, reviews, stats:{ avg:Number(avg||0), count:Number(count||0) } };
          })
        );

        const [Lcards, Scards] = await Promise.all([loadLecturerCards, loadSubjectCards]);
        setLecturers(Lcards);
        setSubjects(Scards);
      } catch (e) {
        setErr(e.message || "Load failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

// filtered list
  const list = tab === 'lecturer' ? lecturers : subjects;

// memoized filtered & sorted
  const filtered = useMemo(() => {
    let L = [...list];
    if (query) {
      const s = query.toLowerCase();
      L = L.filter(item => {
        if (item.type === 'lecturer') {
          return item.name.toLowerCase().includes(s) || (item.dept||"").toLowerCase().includes(s);
        }
        return item.title.toLowerCase().includes(s) || (item.faculty||"").toLowerCase().includes(s);
      });
    }
    if (sort === 'top') {
      L.sort((a,b) => (b.stats?.avg||0) - (a.stats?.avg||0));
    } else {
      const lastDate = it => it.reviews.length ? Math.max(...it.reviews.map(r=>+new Date(r.date))) : 0;
      L.sort((a,b) => lastDate(b) - lastDate(a));
    }
    return L;
  }, [list, query, sort, tab]);

// write review
  // open write review modal
  const openCompose = (item) => {
    setTarget({
      id:item.id,
      type:item.type,
      display: item.type==='lecturer' ? item.name : `${item.faculty ? item.faculty + ' · ' : ''}${item.title}`
    });
    setComposeText(""); setComposeStars(0); setOpen(true);
  };

  // open view comments modal
  const openComments = async (item) => {
    setListTitle(item.type === 'lecturer'
      ? item.name
      : `${item.faculty ? item.faculty + ' · ' : ''}${item.title}`);
    setOpenList(true);
    setListLoading(true);
    try {
      const url = item.type === 'lecturer'
        ? `/reviews/lecturer/${item.id}`
        : `/reviews/subject/${item.id}`;
      const revs = await getJSON(url);
      setListItems(sanitizeReviews(revs));
    } catch (e) {
      setListItems([]);
      console.error(e);
    } finally {
      setListLoading(false);
    }
  };

  // submit review and refresh list
  const submit = async () => {
    if (!canSubmit || !target) return;
    try {
      setLoading(true);

      if (!user || !("studentId" in user)) {
        alert("Please login first.");
        setLoading(false);
        return;
      }
      const body = new URLSearchParams();
      body.set("studentId", String(user.studentId));
      const isLect = target.type === 'lecturer';
      body.set("targetType", isLect ? "Lecturer" : "Subject");
      if (isLect) body.set("lecturerId", String(target.id));
      else body.set("subjectId", String(target.id));
      body.set("rate", String(composeStars));
      body.set("description", composeText);

      await http.post(`/reviews/add`, body);

      if (target.type === 'lecturer') {
        const [revs, stats] = await Promise.all([
          getJSON(`/reviews/lecturer/${target.id}`),
          getJSON(`/reviews/lecturer/${target.id}/stats`)
        ]);
        const lec = revs?.[0]?.lecturer;
        const card = {
          id: String(target.id),
          type:'lecturer',
          name: lec ? `${lec.firstName ?? ""} ${lec.lastName ?? ""}`.trim() || `Lecturer #${target.id}` : `Lecturer #${target.id}`,
          dept: lec?.faculty ?? "",
          reviews: sanitizeReviews(revs),
          stats: Array.isArray(stats) ? { avg:Number(stats[0]||0), count:Number(stats[1]||0) } : { avg:Number(stats?.avg||0), count:Number(stats?.count||0) }
        };
        setLecturers(prev => [card, ...prev.filter(x => x.id !== card.id)]);
      } else {
        const [revs, stats] = await Promise.all([
          getJSON(`/reviews/subject/${target.id}`),
          getJSON(`/reviews/subject/${target.id}/stats`)
        ]);
        const subj = revs?.[0]?.subject;
        const card = {
          id: String(target.id),
          type:'course',
          title: subj?.name ?? `Subject #${target.id}`,
          faculty: subj?.faculty ?? "",
          reviews: sanitizeReviews(revs),
          stats: Array.isArray(stats) ? { avg:Number(stats[0]||0), count:Number(stats[1]||0) } : { avg:Number(stats?.avg||0), count:Number(stats?.count||0) }
        };
        setSubjects(prev => [card, ...prev.filter(x => x.id !== card.id)]);
      }

      setOpen(false);
    } catch (e) {
      alert(e.message || "Post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Wrap>
        <Header>
          <Title>Reviews</Title>
          <Tabs>
            <TabBtn $active={tab==='lecturer'} onClick={()=>setTab('lecturer')}>Lecturers</TabBtn>
            <TabBtn $active={tab==='course'} onClick={()=>setTab('course')}>Subjects</TabBtn>
          </Tabs>
        </Header>

        <SubBar>
          <Input placeholder={tab==='lecturer' ? 'Search lecturers…' : 'Search subjects…'} value={query} onChange={e=>setQuery(e.target.value)} />
          <Select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="new">Newest activity</option>
            <option value="top">Top rated (backend avg)</option>
          </Select>
          <div style={{textAlign:'right', color:'#667085'}}>{loading ? "Loading…" : err || ""}</div>
        </SubBar>

        <Grid>
          {filtered.map(item => {
            const aBackend = item.stats?.avg ?? 0;
            const cBackend = item.stats?.count ?? 0;
            const aLocal = avgLocal(item.reviews);
            const countLocal = item.reviews.length;
            const avgToShow = (aBackend && aBackend > 0) ? aBackend : aLocal;
            const cntToShow = (cBackend && cBackend > 0) ? cBackend : countLocal;
            const last = item.reviews[0];

            return (
              <Card key={item.id}>
                <Row>
                  <Avatar>{(item.type==='lecturer' ? item.name : item.title).slice(0,1)}</Avatar>
                  <div>
                    <Name>{item.type==='lecturer' ? item.name : item.title}</Name>
                    <Meta>{item.type==='lecturer' ? (item.dept || `#${item.id}`) : (item.faculty || '—')}</Meta>
                  </div>
                </Row>

                <FooterRow>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <StarRating value={Math.round(avgToShow)} />
                    <Meta>{avgToShow ? avgToShow.toFixed(1) : '—'} ({cntToShow})</Meta>
                  </div>
                  <div style={{display:'flex', gap:8}}>
                    <Button onClick={()=>openComments(item)} style={{background:'#fff', color:'#0b0f17', borderColor:'#e6e6e6'}}>View comments</Button>
                    <Button onClick={()=>openCompose(item)}>Write review</Button>
                  </div>
                </FooterRow>

                {last && ((last.text && last.text.trim().length > 0) || (last.rating && last.rating > 0)) && (
                  <>
                    {last.text && last.text.trim().length > 0 && <Body>“{last.text}”</Body>}
                    <TagRow>
                      <Tag>Latest · {last?.date ? new Date(last.date).toLocaleDateString() : '—'}</Tag>
                      {last.rating && last.rating > 0 && <Tag>{last.rating}★</Tag>}
                    </TagRow>
                  </>
                )}
              </Card>
            );
          })}
        </Grid>

        {/* write comments */}
        {open && (
          <Overlay>
            <Modal role="dialog" aria-modal="true">
              <ModalHead>
                <ModalTitle>Review — {target?.display}</ModalTitle>
                <CloseBtn onClick={()=>setOpen(false)} aria-label="Close">×</CloseBtn>
              </ModalHead>

              <div style={{display:'flex', alignItems:'center', gap:12, margin:'8px 0 14px'}}>
                <span style={{color:'#475467', fontSize:14}}>Your rating:</span>
                <div>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={()=>setComposeStars(n)} style={{background:'none', border:'none', padding:4, cursor:'pointer'}} aria-label={`Set rating ${n}`}>
                      <Star $filled={n <= composeStars} />
                    </button>
                  ))}
                </div>
              </div>

              <TextArea placeholder="Share details about your experience…" value={composeText} onChange={e=>setComposeText(e.target.value)} />
              <Small>Min 8 characters. Be respectful and specific.</Small>

              <div style={{display:'flex', justifyContent:'flex-end', gap:12, marginTop:16}}>
                <Button style={{background:'#fff', color:'#0b0f17', borderColor:'#e6e6e6'}} onClick={()=>setOpen(false)}>Cancel</Button>
                <Button disabled={!canSubmit || loading} onClick={submit} style={!canSubmit?{opacity:.6, cursor:'not-allowed'}:undefined}>
                  {loading ? "Posting…" : "Post"}
                </Button>
              </div>
            </Modal>
          </Overlay>
        )}

        {/* view all comments */}
        {openList && (
          <Overlay>
            <Modal role="dialog" aria-modal="true">
              <ModalHead>
                <ModalTitle>Comments — {listTitle}</ModalTitle>
                <CloseBtn onClick={()=>setOpenList(false)} aria-label="Close">x</CloseBtn>
              </ModalHead>

              {listLoading ? (
                <div style={{padding:'12px 2px', color:'#667085'}}>Loading…</div>
              ) : (
                <div style={{maxHeight: '60vh', overflowY: 'auto', display:'flex', flexDirection:'column', gap:12}}>
                  {listItems.length === 0 && <div style={{color:'#667085'}}>No comments yet.</div>}
                  {listItems.map((r, idx) => (
                    <div key={idx} style={{border:'1px solid #efefef', borderRadius:12, padding:12}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6}}>
                        <div style={{fontWeight:600}}>{r.user}</div>
                        <div style={{display:'flex', alignItems:'center', gap:8}}>
                          <StarsWrap>
                            {[1,2,3,4,5].map(n => <Star key={n} $filled={n <= (r.rating||0)} />)}
                          </StarsWrap>
                          <Meta>{r.rating ?? '—'}★</Meta>
                        </div>
                      </div>
                      <div style={{color:'#101828', fontSize:13, lineHeight:1.6}}>{r.text || <i style={{color:'#98a2b3'}}>No details</i>}</div>
                      <div style={{marginTop:8, display:'flex', gap:8, flexWrap:'wrap'}}>
                        <Tag>Posted · {r.date || '—'}</Tag>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{display:'flex', justifyContent:'flex-end', marginTop:14}}>
                <Button onClick={()=>setOpenList(false)} style={{background:'#fff', color:'#0b0f17', borderColor:'#e6e6e6'}}>Close</Button>
              </div>
            </Modal>
          </Overlay>
        )}
      </Wrap>
    </Page>
  );
}
