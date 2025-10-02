import styled from "styled-components";
import { CardL, CardS, CardM } from "../../components/Card.jsx";
import {
  Container,
  StudentCardTitleWithEdit,
} from "../../components/Container.jsx";
import { Title, SubTitle, Text } from "../../components/Text.jsx";
import dayjs from "dayjs";

import { useState, useEffect, Link } from "react";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";

export function UpcomingAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const getAllAppointments = async () => {
    try {
      const res = await http.get("/studentProfile/appointments", {
        params: { studentId: user.studentId },
      });

      setAppointments(res.data || []);
    } catch (err) {
      console.log("Fail to get all the appointment data");
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <CardS
      as={Link}
      to="/main/appointment"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Title>Appointment</Title>
      {appointments.length === 0 ? (
        <SubTitle>No Upcoming Appointment</SubTitle>
      ) : (
        <Text
          key={appointments.appointmentId}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            width: "250px",
            maxHeight: "20px",
            marginLeft: "20px",
            padding: "10px",
          }}
        >
          About:{appointments[0].description} Time: {appointments[0].timeSlot}
          {console.log(appointments)}
        </Text>
      )}
    </CardS>
  );
}
