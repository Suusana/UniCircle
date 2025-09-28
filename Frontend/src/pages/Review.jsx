import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const API = "http://localhost:8080";

// 简单封装 fetch + JSON + 错误处理
async function fetchJSON(url, opts) {
  const res = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Styled components
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

// 星级评分组件
const StarRating = ({ value = 0 }) => (
  <StarsWrap>{[1,2,3,4,5].map(n => <Star key={n} $filled={n <= value} />)}</StarsWrap>
);

/** 本地平均（仅用于卡片内部显示） */
const avgLocal = (arr) => arr.length ? (arr.reduce((s,r)=>s+r.rating,0)/arr.length) : 0;

export default function Reviews() {
  const { student } = useAuth(); // 需要 student.studentId
  const [tab, setTab] = useState('lecturer'); // lecturer | course
  const [lecturers, setLecturers] = useState([]); // [{id,name,dept,reviews:[{user,rating,text,date}], stats:{avg,count}}]
  const [subjects, setSubjects]   = useState([]); // [{id,title,code,reviews:[], stats:{avg,count}}]
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new"); // new | top

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null); // { id, type, display }
  const [composeText, setComposeText] = useState("");
  const [composeStars, setComposeStars] = useState(0);
  const canSubmit = composeText.trim().length >= 8 && composeStars > 0;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  /** 一次性加载全部统计，再补齐详情 */
  useEffect(() => {
    (async () => {
      setErr(""); setLoading(true);
      try {
        // 1) 统计（Object[]）
        const [Lstats, Sstats] = await Promise.all([
          fetchJSON(`${API}/reviews/lecturers`),
          fetchJSON(`${API}/reviews/subjects`)
        ]);

        // 2) 逐个补齐详情（名字/最近评论）
        const loadLecturerCards = Promise.all(
          (Lstats || []).map(async (row) => {
            const [id, avg, count] = row; // Object[]
            const idNum = Number(id);
            let name = `Lecturer #${idNum}`, dept = "", reviews = [];
            try {
              const revs = await fetchJSON(`${API}/reviews/lecturer/${idNum}`);
              reviews = (revs || []).map(r => ({
                user: `Student #${r.studentId}`,
                rating: r.rate,
                text: r.description ?? "",
                date: new Date().toISOString().slice(0,10),
              }));
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
          (Sstats || []).map(async (row) => {
            const [id, avg, count] = row;
            const idNum = Number(id);
            let title = `Subject #${idNum}`, code = "", reviews = [];
            try {
              const revs = await fetchJSON(`${API}/reviews/subject/${idNum}`);
              reviews = (revs || []).map(r => ({
                user: `Student #${r.studentId}`,
                rating: r.rate,
                text: r.description ?? "",
                date: new Date().toISOString().slice(0,10),
              }));
              const subj = revs?.[0]?.subject;
              if (subj) {
                title = subj.name ?? title;
                code  = subj.subjectCode ?? `ID ${idNum}`;
              }
            } catch {}
            return { id: String(idNum), type:'course', title, code, reviews, stats:{ avg:Number(avg||0), count:Number(count||0) } };
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

  /** 当前列表（按 Tab） */
  const list = tab === 'lecturer' ? lecturers : subjects;

  /** 搜索 + 排序 */
  const filtered = useMemo(() => {
    let L = [...list];
    // 搜索
    if (query) {
      const s = query.toLowerCase();
      L = L.filter(item => {
        if (item.type === 'lecturer') {
          return item.name.toLowerCase().includes(s) || (item.dept||"").toLowerCase().includes(s);
        }
        return item.title.toLowerCase().includes(s) || (item.code||"").toLowerCase().includes(s);
      });
    }
    // 排序
    if (sort === 'top') {
      L.sort((a,b) => (b.stats?.avg||0) - (a.stats?.avg||0));
    } else {
      const lastDate = it => it.reviews.length ? Math.max(...it.reviews.map(r=>+new Date(r.date))) : 0;
      L.sort((a,b) => lastDate(b) - lastDate(a));
    }
    return L;
  }, [list, query, sort, tab]);

  /** 打开撰写 */
  const openCompose = (item) => {
    setTarget({ id:item.id, type:item.type, display: item.type==='lecturer' ? item.name : `${item.code} · ${item.title}` });
    setComposeText(""); setComposeStars(0); setOpen(true);
  };

  /** 提交评论（POST /reviews/add）并刷新该卡片 */
  const submit = async () => {
    if (!canSubmit || !target) return;
    try {
      setLoading(true);
      const body = new URLSearchParams();
      body.set("studentId", String(student?.studentId ?? 1));
      body.set("targetType", target.type === 'Lecturer' ? 'Lecturer' : 'Subject');
      if (target.type === 'lecturer') body.set("lecturerId", target.id);
      if (target.type === 'course')   body.set("subjectId",  target.id);
      body.set("rate", String(composeStars));
      body.set("description", composeText);
      await fetchJSON(`${API}/reviews/add`, { method: "POST", body });

      // 局部刷新（只重拉该目标的详情 + 统计）
      if (target.type === 'lecturer') {
        const [revs, stats] = await Promise.all([
          fetchJSON(`${API}/reviews/lecturer/${target.id}`),
          fetchJSON(`${API}/reviews/lecturer/${target.id}/stats`)
        ]);
        const lec = revs?.[0]?.lecturer;
        const card = {
          id: String(target.id),
          type:'lecturer',
          name: lec ? `${lec.firstName ?? ""} ${lec.lastName ?? ""}`.trim() || `Lecturer #${target.id}` : `Lecturer #${target.id}`,
          dept: lec?.faculty ?? "",
          reviews: (revs||[]).map(r => ({
            user:`Student #${r.studentId}`,
            rating:r.rate, text:r.description ?? "",
            date:new Date().toISOString().slice(0,10)
          })),
          stats: Array.isArray(stats) ? { avg:Number(stats[0]||0), count:Number(stats[1]||0) } : { avg:Number(stats?.avg||0), count:Number(stats?.count||0) }
        };
        setLecturers(prev => {
          const others = prev.filter(x => x.id !== card.id);
          return [card, ...others];
        });
      } else {
        const [revs, stats] = await Promise.all([
          fetchJSON(`${API}/reviews/subject/${target.id}`),
          fetchJSON(`${API}/reviews/subject/${target.id}/stats`)
        ]);
        const subj = revs?.[0]?.subject;
        const card = {
          id: String(target.id),
          type:'course',
          title: subj?.name ?? `Subject #${target.id}`,
          code:  subj?.subjectCode ?? `ID ${target.id}`,
          reviews: (revs||[]).map(r => ({
            user:`Student #${r.studentId}`,
            rating:r.rate, text:r.description ?? "",
            date:new Date().toISOString().slice(0,10)
          })),
          stats: Array.isArray(stats) ? { avg:Number(stats[0]||0), count:Number(stats[1]||0) } : { avg:Number(stats?.avg||0), count:Number(stats?.count||0) }
        };
        setSubjects(prev => {
          const others = prev.filter(x => x.id !== card.id);
          return [card, ...others];
        });
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
            const aLocal = avgLocal(item.reviews);
            const countLocal = item.reviews.length;
            const last = item.reviews[0];
            const aBackend = item.stats?.avg ?? 0;
            const cBackend = item.stats?.count ?? 0;

            return (
              <Card key={item.id}>
                <Row>
                  <Avatar>{(item.type==='lecturer' ? item.name : item.title).slice(0,1)}</Avatar>
                  <div>
                    <Name>{item.type==='lecturer' ? item.name : item.title}</Name>
                    <Meta>{item.type==='lecturer' ? (item.dept || `#${item.id}`) : (item.code || `ID ${item.id}`)}</Meta>
                  </div>
                </Row>

                <FooterRow>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <StarRating value={Math.round(aBackend || aLocal)} />
                    <Meta>{(aBackend || aLocal) ? (aBackend || aLocal).toFixed(1) : '—'} ({cBackend || countLocal})</Meta>
                  </div>
                  <Button onClick={()=>openCompose(item)}>Write review</Button>
                </FooterRow>

                {last && (
                  <>
                    <Body>“{last.text}”</Body>
                    <TagRow>
                      <Tag>Latest · {new Date(last.date).toLocaleDateString()}</Tag>
                      <Tag>{last.rating}★</Tag>
                    </TagRow>
                  </>
                )}
              </Card>
            );
          })}
        </Grid>

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
      </Wrap>
    </Page>
  );
}
