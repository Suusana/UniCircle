import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import http from "../utils/http";
import dayjs from "dayjs";
import { useAuth } from "../contexts/AuthContext";

const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f6f8;
  padding: 24px;
  font-family: system-ui, sans-serif;
`;

const Card = styled.section`
  width: min(780px, 100%);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
`;

const HeaderRow = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 22px;
  margin: 0;
`;

const Subtle = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #64748b;
`;

const EventStatus = styled.div`
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  padding: 6px 12px;
  border-radius: 6px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 16px 0;
`;

const AboutTitle = styled.h2`
  font-size: 16px;
  margin: 0 0 8px 0;
`;

const AboutText = styled.p`
  margin: 0;
  color: #334155;
  line-height: 1.5;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
`;

const Muted = styled.span`
  font-size: 14px;
  color: #475569;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
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

const FooterNote = styled.p`
  margin-top: 12px;
  font-size: 13px;
  color: #64748b;
  text-align: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #111;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
`

const EventDetail = () => {
  const { id, eventId } = useParams(); //get club id and event id
  const navigate = useNavigate();
  const [Event, setEvent] = useState();
  const { user } = useAuth();
  const [isApply, setIsApply] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isDisable, setisDisable] = useState(false);
  const [attendees, setAttendees] = useState(0);

  //get the event details
  const GetEvent = async () => {
    try {
      const res = await http.get(`/clubs/${id}/events/${eventId}`)
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
    getStatus();
    countAttdendees();
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
      setAttendees(pre => pre - 1);
    } else {
      //apply for event
      await http.post("/events/applyForEvent", null, { params: { studentId: user.studentId, eventId: eventId } })
      setIsApply(true)
      setAttendees(pre => pre + 1);
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

  const countAttdendees = async () => {
    try {
      const res = await http.get("/events/getNum", { params: { eventId } })
      console.log(res.data)
      setAttendees(res.data)
    } catch (error) {
      console.log("Fail to get number:", error)
    }
  }

  return (
    <Page>
      <Card>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <HeaderRow>
          <div>
            <Title>{Event?.title}</Title>
            <Subtle>Created by {Event?.creator.firstName} {Event?.creator.lastName}</Subtle>
          </div>
          <EventStatus>{Event?.status}</EventStatus>
        </HeaderRow>

        <Divider />
        <AboutTitle>About this event</AboutTitle>
        <AboutText>{Event?.description}</AboutText>
        <Divider />

        <Row>
          <Muted><strong>Start:</strong> {start}</Muted>
        </Row>
        <Row>
          <Muted><strong>End:</strong> {end}</Muted>
        </Row>
        <Row>
          <Muted><strong>Location:</strong> {Event?.location}</Muted>
        </Row>
        <Row>
          <Muted>{attendees} people attending</Muted>
        </Row>

        <Divider />
        {Event?.status != "Upcoming" ?
          <ButtonsRow>
            <MinimalButton $isApply={isApply} disabled={isDisable}>No Longer Available</MinimalButton>
          </ButtonsRow>
          :
          <ButtonsRow>
            <MinimalButton $isApply={isApply} disabled={isDisable} onClick={() => { toggleEvent() }}>{isApply ? "Cancel" : "Apply"}</MinimalButton>
            {/* when the check in button is clicked, then it will disappear */}
            {!isCheckedIn && <MinimalButton onClick={CheckIn}>Check-In</MinimalButton>}
          </ButtonsRow>
        }
        <FooterNote>Apply now to secure your spot at this event</FooterNote>
      </Card>
    </Page >
  );
}

export default EventDetail;