import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/http";
import dayjs from "dayjs";
import { Modal } from "../components/Modal.jsx"

const Container = styled.div`
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BackRow = styled.div`
  display: flex; align-items: center; gap: 8px;
`;

const Card = styled.div`
  background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
  padding: 18px; box-shadow: 0 2px 8px rgba(16,24,40,.04);
`;

const ClubHeader = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px; align-items: center;
  @media (max-width: 720px){
    grid-template-columns: 1fr; align-items: start;
  }
`;

const Cover = styled.div`
  width: 100%; height: 150px; overflow: hidden;
  border-radius: 12px; background: #eef2f6;
  display: grid; place-items: center;
`;

const CoverImg = styled.img`
  width: 100%; height: 100%; object-fit: cover;
`;

const Title = styled.h1`
  margin: 0; font-size: 28px; font-weight: 700; letter-spacing: .2px;
`;

const Sub = styled.p`
  margin: 8px 0 0; color: #4b5563; line-height: 1.7; font-size: 15px;
`;

const Row = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;
`;

const GhostBtn = styled.button`
  background: #fff; color: #111827; border: 1px solid #e5e7eb;
  padding: 8px 12px; border-radius: 10px; cursor: pointer;
`;

const DangerBtn = styled(GhostBtn)`
  background: #db2845; color: #fff; border-color: #db2845;
`;

const SectionTitle = styled.h2`
  font-size: 18px; font-weight: 600; margin: 0 0 12px 0;
`;

const PersonItem = styled.div`
  display: flex; align-items: center; gap: 14px;
  padding: 12px; border-radius: 12px; background: #fafbfc;
`;

const Avatar = styled.div`
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(140deg, #cbd5e1, #94a3b8);
  overflow: hidden; flex: 0 0 auto;
`;

const AvatarImg = styled.img`
  width: 100%; height: 100%; object-fit: cover;
`;

const PersonName = styled.div`
  font-weight: 600; color: #111827;
`;

const Pill = styled.span`
  font-size: 12px; background: #111827; color: #fff;
  border-radius: 999px; padding: 4px 8px; margin-left: 8px;
`;

const LightPill = styled(Pill)`
  background: #eef2ff; color: #3b82f6; border: 1px solid #dbeafe;
`;

const Danger = styled(Pill)`
  background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca;
`;

const Right = styled.div`
  margin-left: auto; display: flex; gap: 8px;
`;

const EventGrid = styled.div`
  display: grid; gap: 18px;
  grid-template-columns: repeat(3,minmax(0,1fr));
  @media (max-width: 1000px){ grid-template-columns: repeat(2,minmax(0,1fr)); }
  @media (max-width: 640px){ grid-template-columns: 1fr; }
`;

const EventCard = styled(Card)`
  border-radius: 16px;
`;

const EventTitle = styled.h3`
  margin: 0 0 10px 0; font-size: 18px;
`;

const EventExcerpt = styled.p`
  margin: 0 0 12px 0; color: #4b5563; line-height: 1.6; min-height: 54px;
`;

const Meta = styled.div`
  display: grid; gap: 8px; color: #475569; font-size: 14px; margin-bottom: 10px;
`;

const Muted = styled.span`
  color: #6b7280; font-size: 13px;
`;

const ButtonRow = styled.div`
  display: flex; gap: 8px; margin-top: 10px;
`;

const Primary = styled.button`
  background: #111827; color: #fff; border: none; border-radius: 10px;
  padding: 8px 12px; cursor: pointer;
`;

const Outline = styled.button`
  background: #fff; color: #111827; border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 8px 12px; cursor: pointer;

  &:hover {
  background: #000;
  color:#fff
  }
`;

const DangerOutline = styled(Outline)`
  color: #fff; background: #db2845; border-color: #db2845;
`;

const ClubDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get the club id from club list page
  const [Club, setClub] = useState(null);
  const [Owner, setOwner] = useState([]);
  const [Admin, setAdmin] = useState([]);
  const [Events, setEvents] = useState([]);

  //get the club details
  const getData = async () => {
    try {
      const res = await http.get(`/clubs/${id}`)
      setClub(res.data.club)
      setOwner(res.data.owner)
      setAdmin(res.data.admin)
      setEvents(res.data.events)
    } catch (err) {
      console.log("Fail to get the club:" + err)
    }
  }

  // load the club details
  useEffect(() => {
    getData()
  }, [id])
  console.log(Events)

  //format the native date time 
  const end = dayjs(Event?.endTime).format("YYYY-MM-DD");
  const start = dayjs(Event?.starTime).format("YYYY-MM-DD");

  return (
    <Container>
      <BackRow>
        <Outline onClick={() => navigate(-1)}>← Back to Clubs</Outline>
      </BackRow>

      <Card>
        <ClubHeader>
          <Cover>
            <CoverImg src={`http://localhost:8080${Club?.img}`} alt={Club?.name} />
          </Cover>
          <div>
            <Title>{Club?.name}</Title>
            <Sub>{Club?.description}</Sub>
            <Sub>Members: {Club?.members}</Sub>
            {/* <Row>
              <Outline> Edit Club</Outline>
              <DangerBtn>🗑 Delete Club</DangerBtn>
            </Row> */}
          </div>
        </ClubHeader>
      </Card>


      <Card>
        <SectionTitle>Club Management</SectionTitle>
        {Owner.map(o =>
          <PersonItem key={o.studentId}>
            <Avatar />
            <PersonName>{o.firstName} {o.lastName}<Pill>Owner</Pill></PersonName>
          </PersonItem>
        )}

        <div style={{ fontWeight: 600, marginBottom: 10 }}>Administrators</div>

        {Admin.map(a =>
          <PersonItem key={a.studentId}>
            <Avatar />
            <div>
              <PersonName>{a.firstName} {a.lastName}</PersonName>
              <Muted>Admin</Muted>
            </div>
            {/* <Right>
              <Outline>Demote</Outline>
            </Right> */}
          </PersonItem>
        )}
        <div style={{ height: 12 }} />
        {/* <Primary>Add Admin</Primary> */}
      </Card>

      <Card>
        <div>
          <SectionTitle>Club Events</SectionTitle>
          {/* <Primary>Create Event</Primary> */}
        </div>

        <EventGrid>
          {Events.map(event => (
            <EventCard key={event.eventId}>
              <EventTitle>
                {event.title}
                <LightPill style={{ marginLeft: 8 }}>{event.status}</LightPill>
              </EventTitle>
              <EventExcerpt>
                {event.description}
              </EventExcerpt>
              <Meta>
                <div>📅 {start} - {end}</div>
                <div>📍 {event.location}</div>
              </Meta>
              <ButtonRow>
                <Link to={`events/${event.eventId}`}>
                  <Outline>View & Apply</Outline>
                </Link>
                {/* <Outline>Edit</Outline>
                <DangerOutline>Delete</DangerOutline> */}
              </ButtonRow>
            </EventCard>
          ))}
        </EventGrid>
      </Card>
    </Container >
  );
}

export default ClubDetail;
