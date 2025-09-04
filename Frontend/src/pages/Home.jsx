import { Link, Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar.jsx";
import { CardL, CardS, CardM } from "../components/Card.jsx";
import { Container } from "../components/Container.jsx";
import { Title, SubTitle, Text } from "../components/Text.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Shortcut from "./Shortcut.jsx";

export const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Home() {
  return (
    <>
      <Section>
        <Container>
          <div style={{ display: "grid", gap: "15px" }}>
            <CardL>
              <Title>Profile</Title>
              <FontAwesomeIcon
                icon={faCircleUser}
                size="4x"
                style={{
                  display: "flex",
                  justifySelf: "center",
                  margin: "20px",
                }}
              />
              <SubTitle>Name: </SubTitle>
              <SubTitle>Degree: </SubTitle>
              <SubTitle>Major: </SubTitle>
              <SubTitle>Description</SubTitle>
            </CardL>
            <CardM>
              <Title>Membership</Title> {/*if none -> join the club shows up */}
              <SubTitle>Join Club! </SubTitle>
            </CardM>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "15px",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              <CardS>
                <Title>Academic Record</Title>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5px",
                  }}
                >
                  <SubTitle>GPA: </SubTitle> <SubTitle>Credits: </SubTitle>
                </div>
              </CardS>
              <Shortcut />
              <CardL
                as={NavLink}
                to="/main/timetable"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Title>Timetable</Title>
                <Text>Click to edit your timetable</Text>
                <Text>This section will show current semester timetable</Text>
              </CardL>
            </div>
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              <CardS>
                <Title>Upcoming Event</Title>
                <Text>N/A</Text>
              </CardS>
              <CardS
                as={Link}
                to="/main/appointment"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Title>Appointment</Title>
                <Text>N/A</Text>
              </CardS>
              <CardL>
                <Title>Friends</Title>
                <SubTitle>Connect with friends!</SubTitle>
                <Text>This section will show connected friends list</Text>
              </CardL>
            </div>
          </div>
        </Container>
        <Outlet />
      </Section>
    </>
  );
}
export default Home;
