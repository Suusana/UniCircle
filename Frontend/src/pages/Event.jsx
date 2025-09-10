import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BackButton } from "../components/Button";
import http from "../utils/http";
import dayjs from "dayjs";

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
  const { id, eventId } = useParams();
  const navigate = useNavigate();
  const [Event, setEvent] = useState(null);

  //get the event details
  const GetEvent = async () => {
    try {
      const res = await http.get(`/clubs/${id}/events/${eventId}`)
      console.log(res.data)
      setEvent(res.data);
    } catch (err) {
      console.log("Fail to get the event data:" + err)
    }
  }

  //loading data
  useEffect(() => {
    GetEvent();
  }, [eventId])

  //format the native date time 
  const end = dayjs(Event?.endTime).format("YYYY-MM-DD HH:mm");
  const start = dayjs(Event?.starTime).format("YYYY-MM-DD HH:mm");
  
  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>←</BackButton>
      <EventTitle>{Event?.title}</EventTitle>
      <Info><strong>Description:</strong> {Event?.description}</Info>
      <Info><strong>Address:</strong> {Event?.location}</Info>
      <Info><strong>Start Time:</strong> {start}</Info>
      <Info><strong>End Time:</strong> {end}</Info>
      {/* <Info><strong>Participants:</strong> {Event.participants}</Info> */}
      <Info><strong>Publisher:</strong> {Event?.creator.firstName} {Event?.creator.lastName}</Info>
      <ApplyButton>Apply</ApplyButton>
    </Container>
  );
};

export default EventDetail;
