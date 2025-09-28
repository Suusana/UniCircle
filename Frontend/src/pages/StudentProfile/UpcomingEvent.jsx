import styled from "styled-components";
import { CardL, CardS, CardM } from "../../components/Card.jsx";
import {
  Container,
  StudentCardTitleWithEdit,
} from "../../components/Container.jsx";
import { Title, SubTitle, Text } from "../../components/Text.jsx";

import { useState, useEffect } from "react";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";

export function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const fetchRegisteredEvents = async () => {
    try {
      const response = await http.get(`/studentProfile/{studentId}/events`, {
        params: { studentId: user.studentId },
      });
      setEvents(response || []);
    } catch (e) {
      console.log("Fail to fetch current user's registered event list");
      console.error(
        "[Registration event] failed",
        e?.message,
        e?.response?.status,
        e?.response?.data
      );
    }
  };
  useEffect(() => {
    fetchRegisteredEvents();
  }, []);
  return (
    <CardS>
      <Title>Upcoming Event</Title>
      {events.length === 0 ? (
        <Text>No Events</Text>
      ) : (
        events.map((event) => (
          <Text
            key={event.eventId}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              border: "1px solid #efefef",
              borderRadius: "10px",
              width: "200px",
              maxHeight: "20px",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {event.name}
          </Text>
        ))
      )}
    </CardS>
  );
}
