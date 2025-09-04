import { useMemo, useState } from "react";
import styled, { css } from "styled-components";

// Styled components
const Page = styled.section`
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 20px 80px;
  box-sizing: border-box;
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
  display: inline-flex; padding: 6px; background:#fff; border:1px solid #eaeaea; border-radius: 14px; gap: 6px;
`;
const TabBtn = styled.button`
  border:none; background: transparent; padding:10px 14px; border-radius: 10px; cursor:pointer; font-weight:600; color:#364152;
  ${({ $active }) => $active && css`background:#0b0f17; color:#fff;`}
`;

const SubBar = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(140px, auto) minmax(140px, auto);
  gap: 12px;
  align-items: center;
  margin: 16px 0 20px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
  }
`;

const Input = styled.input`
  height: 42px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  &:focus { box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;

const Select = styled.select`
  height: 42px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
  &:focus { box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;

const Button = styled.button`
  height: 40px;
  border-radius: 12px;
  padding: 0 14px;
  border: 1px solid transparent;
  background: #0b0f17;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform .02s ease, box-shadow .2s ease, background .2s ease;
  box-shadow: 0 6px 18px rgba(11, 15, 23, 0.15);
  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1080px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

const Card = styled.article`
  background: #fff;
  border: 1px solid #efefef;
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.06);
  display:flex; flex-direction:column; gap:10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px; height: 40px; border-radius: 12px;
  background: linear-gradient(135deg,#e6eeff,#f6f9ff);
  display: grid; place-items: center; color: #1c64f2; font-weight: 800;
`;

const Name = styled.div`
  font-weight: 700; color: #0b0f17; font-size: 14px;
`;

const Meta = styled.div`
  color: #667085; font-size: 12px;
`;

const Body = styled.p`
  margin: 8px 0 0; color: #101828; font-size: 13px; line-height: 1.6; max-height: 3.2em; overflow:hidden; text-overflow:ellipsis;
`;

const TagRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px;
`;

const Tag = styled.span`
  font-size: 12px; padding: 6px 10px; border-radius: 999px; background: #f5f7fb; color: #475467; border: 1px solid #eef2f6;
`;

const FooterRow = styled.div`
  display:flex; align-items:center; justify-content:space-between; margin-top:8px;
`;

const StarsWrap = styled.div`
  display: inline-flex; gap: 4px; align-items: center;
`;

const starCss = css`
  width: 18px; height: 18px; display: inline-block; mask: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z\"/></svg>') no-repeat center / contain; background: #e2e8f0;
`;

// Star component, filled if $filled prop is true
const Star = styled.i`
  ${starCss}
  ${({ $filled }) => $filled && css`background: #f59e0b;`}
`;

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.25);
  display: grid; place-items: center; z-index: 50;
`;

const Modal = styled.div`
  width: min(640px, calc(100vw - 32px));
  background: #fff; border-radius: 20px; border: 1px solid #efefef; padding: 20px;
  box-shadow: 0 12px 36px rgba(16,24,40,.18);
`;

const ModalHead = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px;
`;

const ModalTitle = styled.h3`
  margin: 0; font-size: 18px; font-weight: 700; color: #0b0f17;
`;

const CloseBtn = styled.button`
  border: none; background: transparent; font-size: 22px; line-height: 1; cursor: pointer; color: #667085;
`;

const TextArea = styled.textarea`
  width: 100%; min-height: 120px; resize: vertical; border-radius: 12px; border: 1px solid #e6e6e6; padding: 12px; box-sizing: border-box; font-size: 14px;
  &:focus { outline: none; box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;

const Small = styled.small`
  color: #667085; display: block; margin-top: 6px;
`;

// Star rating component, displays 5 stars with given value filled
const StarRating = ({ value = 0 }) => (
  <StarsWrap>
    {[1,2,3,4,5].map(n => <Star key={n} $filled={n <= value} />)}
  </StarsWrap>
);

// Utility: average rating from array of reviews
const avg = (arr) => arr.length ? (arr.reduce((s,r)=>s+r.rating,0)/arr.length) : 0;

// Demo Data (swap with API later)
// Each review: { user, rating (1-5), text, date (YYYY-MM-DD) }
const DEMO_LECTURERS = [
  { id: 'L1', type: 'lecturer', name: 'Dr. Alice Ng', dept: 'Computer Science', reviews: [
    { user:'Mina', rating:5, text:'Explains complex topics clearly.', date:'2025-08-20' },
    { user:'Hannah', rating:4, text:'Slides are great, labs a bit fast.', date:'2025-08-15' },
  ]},
  { id: 'L2', type: 'lecturer', name: 'Prof. David Lee', dept: 'Information Systems', reviews: [
    { user:'Sam', rating:3, text:'Knowledgeable but assignments heavy.', date:'2025-08-10' },
  ]},
  { id: 'L3', type: 'lecturer', name: 'Dr. Grace Chen', dept: 'Design', reviews: [] },
];

const DEMO_COURSES = [
  { id: 'C1', type: 'course', code:'31271', title:'Database Fundamentals', reviews:[
    { user:'Alex', rating:4, text:'Challenging but fair assessments.', date:'2025-08-18' },
  ]},
  { id: 'C2', type: 'course', code:'41025', title:'Interaction Design', reviews:[
    { user:'Diego', rating:5, text:'Loved the studio crits.', date:'2025-08-12' },
    { user:'Mina', rating:4, text:'Clear rubrics, lots of practice.', date:'2025-08-05' },
  ]},
  { id: 'C3', type: 'course', code:'95003', title:'Sustainability in an Interconnected World', reviews:[] },
];

// Main component
export default function Reviews() {
  const [tab, setTab] = useState('lecturer'); // lecturer | course
  const [lecturers, setLecturers] = useState(DEMO_LECTURERS);
  const [courses, setCourses] = useState(DEMO_COURSES);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new"); // new | top
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(null); // { id, type, display }
  const [composeText, setComposeText] = useState("");
  const [composeStars, setComposeStars] = useState(0);
  const canSubmit = composeText.trim().length >= 8 && composeStars > 0;

  //display list based on tab
  const list = tab === 'lecturer' ? lecturers : courses;

  //filtered list based on search and sort
  const filtered = useMemo(() => {
    let L = [...list];
    // filter by search
    if (query) {
      const s = query.toLowerCase();
      L = L.filter(item => {
        if (item.type === 'lecturer') {
          return item.name.toLowerCase().includes(s) || item.dept.toLowerCase().includes(s);
        }
        return item.title.toLowerCase().includes(s) || item.code.toLowerCase().includes(s);
      });
    }
    // sort
    if (sort === 'top') {
      L.sort((a,b) => avg(b.reviews) - avg(a.reviews));
    } else {
      // newest: by latest review date desc; entities with no reviews go last
      const lastDate = it => it.reviews.length ? Math.max(...it.reviews.map(r=>+new Date(r.date))) : 0;
      L.sort((a,b) => lastDate(b) - lastDate(a));
    }
    return L;
  }, [list, query, sort, tab]);
  
  const openCompose = (item) => {
    setTarget({ id:item.id, type:item.type, display: item.type==='lecturer' ? item.name : `${item.code} · ${item.title}` });
    setComposeText(""); setComposeStars(0); setOpen(true);
  };

  const submit = () => {
    const entry = { user:'You', rating: composeStars, text: composeText, date: new Date().toISOString().slice(0,10) };
    if (target.type === 'lecturer') {
      setLecturers(prev => prev.map(l => l.id===target.id ? { ...l, reviews:[entry, ...l.reviews] } : l));
    } else {
      setCourses(prev => prev.map(c => c.id===target.id ? { ...c, reviews:[entry, ...c.reviews] } : c));
    }
    setOpen(false);
  };
  
  // JSX
  return (
    <Page>
      <Wrap>
        <Header>
          <Title>Reviews</Title>
          <Tabs>
            <TabBtn $active={tab==='lecturer'} onClick={()=>setTab('lecturer')}>Lecturers</TabBtn>
            <TabBtn $active={tab==='course'} onClick={()=>setTab('course')}>Subjects</TabBtn>    {/*I changed name to Subjects*/}
          </Tabs>
        </Header>

        <SubBar>
          <Input placeholder={tab==='lecturer' ? 'Search lecturers…' : 'Search courses…'} value={query} onChange={e=>setQuery(e.target.value)} />
          <Select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="new">Newest activity</option>
            <option value="top">Top rated</option>
          </Select>
          <div />
        </SubBar>

        <Grid>
          {filtered.map(item => {
            const a = avg(item.reviews);
            const count = item.reviews.length;
            const last = item.reviews[0];
            return (
              <Card key={item.id}>
                <Row>
                  <Avatar>{(item.type==='lecturer' ? item.name : item.title).slice(0,1)}</Avatar>
                  <div>
                    <Name>{item.type==='lecturer' ? item.name : item.title}</Name>
                    <Meta>
                      {item.type==='lecturer' ? item.dept : item.code}
                    </Meta>
                  </div>
                </Row>

                <FooterRow>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <StarRating value={Math.round(a)} />
                    <Meta>{a ? a.toFixed(1) : '—'} ({count})</Meta>
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
                    <button
                      key={n}
                      onClick={()=>setComposeStars(n)}
                      style={{background:'none', border:'none', padding:4, cursor:'pointer'}}
                      aria-label={`Set rating ${n}`}
                    >
                      <Star $filled={n <= composeStars} />
                    </button>
                  ))}
                </div>
              </div>

              <TextArea
                placeholder="Share details about your experience…"
                value={composeText}
                onChange={e=>setComposeText(e.target.value)}
              />
              <Small>Min 8 characters. Be respectful and specific.</Small>

              <div style={{display:'flex', justifyContent:'flex-end', gap:12, marginTop:16}}>
                <Button style={{background:'#fff', color:'#0b0f17', borderColor:'#e6e6e6'}} onClick={()=>setOpen(false)}>Cancel</Button>
                <Button disabled={!canSubmit} onClick={submit} style={!canSubmit?{opacity:.6, cursor:'not-allowed'}:undefined}>Post</Button>
              </div>
            </Modal>
          </Overlay>
        )}
      </Wrap>
    </Page>
  );
}
