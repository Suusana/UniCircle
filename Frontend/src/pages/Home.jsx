import { Link, Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import { CardL, CardS, CardM } from "../components/Card.jsx";
import {
  Container,
  StudentCardTitleWithEdit,
} from "../components/Container.jsx";
import { Title, SubTitle, Text } from "../components/Text.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimetableProfile from "./StudentProfile/Timetable2.jsx";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Shortcut from "./Shortcut.jsx";
import { useState } from "react";
import { http } from "../utils/http.js";
// Import the me function to get current user info

import { SaveButtonProfile } from "../components/Button.jsx";
import { ShowProfile } from "./StudentProfile/showProfile.jsx";
import {
  EditAcademicRecord,
  EditProfile,
} from "./StudentProfile/EditProfile.jsx";
import { MembershipList } from "./StudentProfile/MembershipList.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Home() {
  const [isEdit, setIsEdit] = useState(false);
  //controls edit button
  const [draft, setDraft] = useState(null);
  //draft state for editing profile
  const [saved, setSaved] = useState(false); //saved state for showing profile

  const { user, refreshUser } = useAuth(); // Access user from AuthContext
  console.log("current user:", user);

  //edit button -> shows input fields -> click save -> save changes -> back to ShowProfile
  const saveProfile = async () => {
    //send the updated user info to backend -> <ShowProfile/>
    //await http.put("/studentProfile/updateInfo", User);

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
    await http.put("/studentProfile/updateInfo", udpatedInfo);
    await refreshUser();
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
              {/* <SubTitle>Join Club! </SubTitle> */}
              <MembershipList />
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
                {/* <Text>Click to edit your timetable</Text> */}
                {/* <Text>This section will show current semester timetable</Text> */}
                <div
                  style={{ height: 290, overflow: "auto", borderRadius: 12 }}
                >
                  <TimetableProfile rowHeight={30} />{" "}
                  {/* smaller rows help too */}
                </div>
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
