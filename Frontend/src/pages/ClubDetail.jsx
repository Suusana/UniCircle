import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/http";
import dayjs from "dayjs";

const Container = styled.div`
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(16,24,40,.04);
`;
const ClubHeader = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  align-items: center;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;
const Cover = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 12px;
  background: #eef2f6;
  display: grid;
  place-items: center;
`;
const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: .2px;
`;
const Sub = styled.p`
  margin: 8px 0 0;
  color: #4b5563;
  line-height: 1.7;
  font-size: 15px;
`;
const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
`;
const PersonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  background: #fafbfc;
`;
const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(140deg, #cbd5e1, #94a3b8);
  overflow: hidden;
  flex: 0 0 auto;
`;
const PersonName = styled.div`
  font-weight: 600;
  color: #111827;
`;
const LightPill = styled.span`
  font-size: 12px;
  background: #eef2ff;
  color: #3b82f6;
  border: 1px solid #dbeafe;
  border-radius: 999px;
  padding: 4px 8px;
  margin-left: 8px;
`;
const Muted = styled.span`
  color: #6b7280;
  font-size: 13px;
`;
const Outline = styled.button`
  background: #fff;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;
const EventGrid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
const EventCard = styled(Card)`
  border-radius: 16px;
`;
const EventTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
`;
const EventExcerpt = styled.p`
  margin: 0 0 12px 0;
  color: #4b5563;
  line-height: 1.6;
  min-height: 54px;
`;
const Meta = styled.div`
  display: grid;
  gap: 8px;
  color: #475569;
  font-size: 14px;
  margin-bottom: 10px;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export default function ClubDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Club, setClub] = useState(null);
  const [Owner, setOwner] = useState([]);
  const [Admin, setAdmin] = useState([]);
  const [Events, setEvents] = useState([]);

  const getData = async () => {
    try {
      const res = await http.get(`/clubs/${id}`);
      setClub(res.data.club);
      setOwner(res.data.owner);
      setAdmin(res.data.admin);
      setEvents(res.data.events || []);
    } catch (err) {
      console.log("Fail to get the club:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Container>
      <div>
        <Outline onClick={() => navigate(-1)}>← Back to Clubs</Outline>
      </div>

      <Card>
        <ClubHeader>
          <Cover>
            <CoverImg
              src={`http://localhost:8080${Club?.img}`}
              alt={Club?.name}
            />
          </Cover>
          <div>
            <Title>{Club?.name}</Title>
            <Sub>{Club?.description}</Sub>
            <Sub>Members: {Club?.members}</Sub>
          </div>
        </ClubHeader>
      </Card>

      <Card>
        <SectionTitle>Club Management</SectionTitle>

        {Owner.map((o) => (
          <PersonItem key={o.studentId}>
            <Avatar />
            <PersonName>
              {o.firstName} {o.lastName}
              <LightPill>Owner</LightPill>
            </PersonName>
          </PersonItem>
        ))}

        <div style={{ fontWeight: 600, margin: "12px 0 10px" }}>
          Administrators
        </div>

        {Admin.map((a) => (
          <PersonItem key={a.studentId}>
            <Avatar />
            <div>
              <PersonName>
                {a.firstName} {a.lastName}
              </PersonName>
              <Muted>Admin</Muted>
            </div>
          </PersonItem>
        ))}
      </Card>

      <Card>
        <SectionTitle>Club Events</SectionTitle>
        <EventGrid>
          {Events.map((event) => {
            const start = event.startTime
              ? dayjs(event.startTime).format("YYYY-MM-DD")
              : "—";
            const end = event.endTime
              ? dayjs(event.endTime).format("YYYY-MM-DD")
              : "—";

            return (
              <EventCard key={event.eventId}>
                <EventTitle>
                  {event.title}
                  {event.status && (
                    <LightPill style={{ marginLeft: 8 }}>
                      {event.status}
                    </LightPill>
                  )}
                </EventTitle>
                <EventExcerpt>{event.description}</EventExcerpt>
                <Meta>
                  <div>📅 {start} - {end}</div>
                  <div>📍 {event.location}</div>
                </Meta>
                <ButtonRow>
                  <Link to={`events/${event.eventId}`}>
                    <Outline>View & Apply</Outline>
                  </Link>
                </ButtonRow>
              </EventCard>
            );
          })}
        </EventGrid>
      </Card>
    </Container>
  );
}
