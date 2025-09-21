import { Link, Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar.jsx";
import { CardL, CardS, CardM } from "../components/Card.jsx";
import {
  Container,
  StudentCardTitleWithEdit,
} from "../components/Container.jsx";
import { Title, SubTitle, Text } from "../components/Text.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faCircleUser,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Shortcut from "./Shortcut.jsx";
import { use, useEffect, useState } from "react";
import { http, refreshUser } from "../utils/http.js";
// Import the me function to get current user info

import { SaveButtonProfile } from "../components/Button.jsx";
import { ShowProfile } from "./StudentProfile/showProfile.jsx";
import {
  EditAcademicRecord,
  EditProfile,
} from "./StudentProfile/EditProfile.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Home() {
  /* This is temp code for the test get the first user in Student Table, Replace it with login function later 
  const [User, setUser] = useState(null); 
  const GetUser = async () => {
     try { const res = await http.get("/studentProfile/getUser");
      console.log(res.data); setUser(res.data); 
      } 
      catch (err) { console.log(err); } }; 
      useEffect(() => { GetUser(); }, []); 
      */
  const [isEdit, setIsEdit] = useState(false);
  //controls edit button
  const [draft, setDraft] = useState(null);
  //draft state for editing profile
  const [saved, setSaved] = useState(false); //saved state for showing profile

  const { user } = useAuth(); // Access user from AuthContext
  console.log("current user:", user);

  //edit button -> shows input fields -> click save -> save changes -> back to ShowProfile
  const saveProfile = async () => {
    //send the updated user info to backend -> <ShowProfile/>
    //await http.put("/studentProfile/updateInfo", User);
    try {
      const udpatedInfo = {
        studentId: user.studentId, //doesnt change
        firstName: draft.firstName,
        lastName: draft.lastName,
        preferredName: draft.preferredName,
        degree: draft.degree,
        major: draft.major,
        description: draft.description,
        academicRecord: draft.academicRecord,
      };

      const response = http.put("/studentProfile/updateInfo", udpatedInfo);
      await refreshUser();
    } catch (e) {
      console.log(e);
    }
    setIsEdit(false);
  };

  const onClickEdit = () => {
    setDraft({ ...user });
    setIsEdit(true);
  };
  const onDraftChange = (patch) => setDraft((d) => ({ ...d, ...patch }));
  return (
    <>
      <Section>
        <Container>
          <div style={{ display: "grid", gap: "15px" }}>
            <CardL>
              {/*Profile Card */}
              <StudentCardTitleWithEdit>
                <Title>Profile</Title>
                {isEdit ? (
                  <SaveButtonProfile onClick={saveProfile}>
                    Save
                  </SaveButtonProfile>
                ) : (
                  <FontAwesomeIcon
                    icon={faEdit}
                    size="xl"
                    style={{ marginRight: "20px" }}
                    onClick={onClickEdit}
                  />
                )}
              </StudentCardTitleWithEdit>
              {isEdit ? (
                <EditProfile user={draft} onFieldChange={onDraftChange} />
              ) : (
                <ShowProfile user={user} />
              )}
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
            <div style={{ display: "grid", gap: "15px" }}>
              <CardS>
                <StudentCardTitleWithEdit>
                  <Title>Academic Record</Title>
                  {isEdit ? (
                    <SaveButtonProfile onClick={saveProfile}>
                      Save
                    </SaveButtonProfile>
                  ) : (
                    <FontAwesomeIcon
                      icon={faEdit}
                      size="xl"
                      style={{ marginRight: "20px" }}
                      onClick={onClickEdit}
                    />
                  )}
                </StudentCardTitleWithEdit>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5px",
                  }}
                >
                  {isEdit ? (
                    <EditAcademicRecord
                      user={draft}
                      onFieldChange={onDraftChange}
                    />
                  ) : (
                    <SubTitle>GPA: {user?.academicRecord || "N/A"}</SubTitle>
                  )}
                  <SubTitle>Credits: </SubTitle>
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
            <div style={{ display: "grid", gap: "15px" }}>
              <CardS>
                <Title>Upcoming Event</Title> <Text>N/A</Text>
              </CardS>
              <CardS
                as={Link}
                to="/main/appointment"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Title>Appointment</Title> <Text>N/A</Text>
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
