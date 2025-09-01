import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BackButton } from "../components/Button";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const EventTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 16px;
`;

const Info = styled.p`
  margin: 8px 0;
  font-size: 16px;
`;

const ApplyButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: gray;
  }
`;

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = {
    id,
    name: "Music Festival",
    description:
      "A fun festival with live music, food, and games. Everyone is welcome!",
    address: "123 Main Street, Sydney",
    time: "2025-09-15 18:00",
    participants: 52,
    owner: "Alice",
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>←</BackButton>
      <EventTitle>{event.name}</EventTitle>
      <Info><strong>Description:</strong> {event.description}</Info>
      <Info><strong>Address:</strong> {event.address}</Info>
      <Info><strong>Time:</strong> {event.time}</Info>
      <Info><strong>Participants:</strong> {event.participants}</Info>
      <Info><strong>Publisher:</strong> {event.owner}</Info>
      <ApplyButton>Apply</ApplyButton>
    </Container>
  );
};

export default EventDetail;
