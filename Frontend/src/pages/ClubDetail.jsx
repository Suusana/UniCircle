import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../assets/example.png"
import { BackButton } from "../components/Button";
import { useEffect, useState } from "react";
import http from "../utils/http";

const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const ClubInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const ClubImg = styled.img`
  width: 250px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
`;

const Text = styled.p`
  margin: 5px 0;
`;
const EventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const EventCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const EventButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin-top: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #555;
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
