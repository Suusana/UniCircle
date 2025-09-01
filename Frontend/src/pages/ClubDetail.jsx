import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/example.png"
import { BackButton } from "../components/Button";

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
  const club = {
    name: "Chess Club",
    img: img,
    description: "This is a club for chess lovers. We organize weekly matches and training.",
    owner: "Alice",
    admin: "Bob",
    events: [
      { id: 1, name: "Weekly Match" },
      { id: 2, name: "Training Session" },
      { id: 3, name: "Tournament" }
    ]
  };
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>←</BackButton>
      <ClubInfo>
        <ClubImg src={club.img} alt={club.name} />
        <Info>
          <Title>{club.name}</Title>
          <Text>{club.description}</Text>
          <Text>Owner: {club.owner}</Text>
          <Text>Admin: {club.admin}</Text>
        </Info>
      </ClubInfo>

      <h2>Events</h2>
      <EventsList>
        {club.events.map(event => (
          <EventCard key={event.id}>
            <h3>{event.name}</h3>
            <Link to={`/main/clubs/event`}>
              <EventButton>View & Apply</EventButton>
            </Link>
          </EventCard>
        ))}
      </EventsList>
    </Container>
  );
}

export default ClubDetail;
