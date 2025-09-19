import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import http from "../utils/http";
import dayjs from "dayjs";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  max-width: 700px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  color: #111;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #111;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    color: #555;
  }
`;

const EventTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 12px 0;
  line-height: 1.6;

  strong {
    font-weight: 600;
    margin-right: 8px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 30px;
`;

const MinimalButton = styled.button`
  flex: 1;
  padding: 14px;
  border: 1px solid #111;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${props => props.$isApply ? "#eee" : "#fff"};
  color: ${props => props.$isApply ? "#555" : "#111"};
  border-color: ${props => props.$isApply ? "#555" : "#111"};

  &:hover {
    background: ${props => props.$isApply ? "#555" : "#111"};
    color: ${props => props.$isApply ? "#eee" : "#fff"};
  }
  
  &:disabled {
    cursor: not-allowed;
    background: #ccc;
    color: #888;
    border-color: #aaa;
  }
`;


const EventDetail = () => {
  const { id, eventId } = useParams(); //get club id and event id
  const navigate = useNavigate();
  const [Event, setEvent] = useState();
  const { user } = useAuth();
  const [isApply, setIsApply] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isDisable, setisDisable] = useState(false);

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

  //get the current status of event registration
  const getStatus = async () => {
    const res = await http.get("/events/registrationStatus", {
      params: { studentId: user.studentId, eventId }
    });
    console.log(res.data)
    if (res.data) {
      // If there is a record (true)
      setIsCheckedIn(true);
      setIsApply(true);
      setisDisable(true)
    }
  }

  //loading data
  useEffect(() => {
    GetEvent();
    GetRegistrationStatus();
    getStatus()
  }, [eventId])

  //format the native date time 
  const end = dayjs(Event?.endTime).format("YYYY-MM-DD HH:mm");
  const start = dayjs(Event?.starTime).format("YYYY-MM-DD HH:mm");

  //Apply for or cancel event
  const toggleEvent = async () => {
    //check if the current user is a member of the club
    const res = await http.get("/clubs/isMember", { params: { clubId: id, studentId: user.studentId } })
    if (!res.data) {
      alert("You are not a member of this club, please join the club first then apply for this event.")
      return
    }

    if (isApply) {
      //cancel event
      await http.delete("/events/cancelEvent", { params: { studentId: user.studentId, eventId: eventId } })
      setIsApply(false)
    } else {
      //apply for event
      await http.post("/events/applyForEvent", null, { params: { studentId: user.studentId, eventId: eventId } })
      setIsApply(true)
    }
  }

  //check if current user already apply for the event
  const GetRegistrationStatus = async () => {
    try {
      const res = await http.get("/events/isApply", { params: { studentId: user.studentId, eventId: eventId } })
      setIsApply(res.data);
    } catch (error) {
      console.log("Fail to get the registration status:", error)
    }
  }

  //check in
  const CheckIn = async () => {
    if (isApply) {
      //user already apply for the event
      const confirm = window.confirm("Are you sure you want to check in?");
      if (confirm) {
        await http.put("/events/checkIn", null, { params: { studentId: user.studentId, eventId: eventId } })
        setIsCheckedIn(true);
        setisDisable(true);
      }
    } else {
      alert("You haven't apply for the event, please apply for it then check in.")
    }
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <EventTitle>{Event?.title}</EventTitle>

      <Info><strong>Description:</strong> {Event?.description}</Info>
      <Info><strong>Address:</strong> {Event?.location}</Info>
      <Info><strong>Start Time:</strong> {start}</Info>
      <Info><strong>End Time:</strong> {end}</Info>
      <Info><strong>Publisher:</strong> {Event?.creator.firstName} {Event?.creator.lastName}</Info>

      <ButtonGroup>
        <MinimalButton $isApply={isApply} disabled={isDisable} onClick={() => { toggleEvent() }}>{isApply ? "Cancel" : "Apply"}</MinimalButton>
        {/* when the check in button is clicked, then it will disappear */}
        {!isCheckedIn && <MinimalButton onClick={CheckIn}>Check-In</MinimalButton>}
      </ButtonGroup>
    </Container>
  );
};

export default EventDetail;
