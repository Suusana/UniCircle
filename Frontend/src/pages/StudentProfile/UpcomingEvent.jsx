import styled from "styled-components";
import { CardL, CardS, CardM } from "../../components/Card.jsx";
import {
  Container,
  StudentCardTitleWithEdit,
} from "../../components/Container.jsx";
import { Title, SubTitle, Text } from "../../components/Text.jsx";
import dayjs from "dayjs";

import { useState, useEffect } from "react";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";

export function UpcomingEvent() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  // const end = dayjs(Event?.endTime).format("YYYY-MM-DD HH:mm");
  // const start = dayjs(Event?.starTime).format("YYYY-MM-DD HH:mm");

  const fetchRegisteredEvents = async () => {
    try {
      const response = await http.get(`/studentProfile/events`, {
        params: { studentId: user.studentId },
      });
      setEvents(response.data || []);
      console.log("events: ", events);
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
    fetchRegisteredEvents(); //it fetches registered events
  }, []);
  return (
    <CardS>
      <Title>Upcoming Event</Title>
      {events.length === 0 ? (
        <Text>No Events</Text>
      ) : (
        <Text key={events[0].eventId} style={{}}>
          {events[0]?.title} -
          {dayjs(events[0]?.startTime).format("YYYY-MM-DD HH:mm")} ~
          {dayjs(events[0]?.endTime).format("YYYY-MM-DD HH:mm")}
        </Text>
      )}
    </CardS>
  );
}
