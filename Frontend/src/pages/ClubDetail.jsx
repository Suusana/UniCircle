import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/http";

const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  color: #111;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  font-family: "Inter", sans-serif;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #111;
  margin-bottom: 20px;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateX(-3px);
  }
`;

const ClubInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const ClubImg = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 26px;
  margin: 0;
  font-weight: 600;
`;

const Text = styled.p`
  font-size: 16px;
  margin: 2px 0;
  color: #444;
`;

const EventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const EventCard = styled.div`
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.06);
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 14px rgba(0,0,0,0.1);
  }
  h3 {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const EventButton = styled.button`
  padding: 8px 16px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: #333;
  }
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
  
  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>←</BackButton>
      <ClubInfo>
        <ClubImg src={`http://localhost:8080${Club?.img}`} alt={Club?.name} />
        <Info>
          <Title>{Club?.name}</Title>
          <Text>{Club?.description}</Text>
          <Text>Members: {Club?.members}</Text>
          <Text>Owner: {Owner.map(o => `${o.firstName} ${o.lastName}`).join(', ')}</Text>
          <Text>Admin: {Admin.map(a => `${a.firstName} ${a.lastName}`).join(', ')}</Text>
        </Info>
      </ClubInfo>

      {/* display all of the events */}
      <h2>Events</h2>
      <EventsList>
        {Events.map(event => (
          <EventCard key={event.eventId}>
            <h3>{event.title}</h3>
            <Link to={`events/${event.eventId}`}>
              <EventButton>View & Apply</EventButton>
            </Link>
          </EventCard>
        ))}
      </EventsList>
    </Container>
  );
}

export default ClubDetail;
