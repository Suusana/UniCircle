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
  //   const [appointments, setAppoinments] = useState([]);

  //   const getAllAppointments = async () => {
  //     try {
  //       const res = await http.get("/studentProfile/allShortcuts");
  //       setAppointments(res.data || []);
  //     } catch (err) {
  //       console.log("Fail to get all the appointment data");
  //     }
  //   };

  //   useEffect(() => {
  //     getAllAppointments();
  //   }, []);

  return (
    <CardS
      as={Link}
      to="/main/appointment"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Title>Appointment</Title>
      {/* {appointments.length === 0 ? (
        <SubTitle>No Appointment</SubTitle>
      ) : (
        appointments.map((a) => (
          <Text
            key={a.appointmentId}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              border: "1px solid #efefef",
              borderRadius: "10px",
              width: "250px",
              maxHeight: "20px",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {a.title} - {a.description}
          </Text>
        ))
      )} */}
    </CardS>
  );
}
