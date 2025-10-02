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
import Shortcut from "./StudentProfile/Shortcut.jsx";
import { FriendList } from "./StudentProfile/FriendList.jsx";
import { useState } from "react";
import { http } from "../utils/http.js";
// Import the me function to get current user info

import { SaveButtonProfile, EditBtn } from "../components/Button.jsx";
import { ShowProfile } from "./StudentProfile/showProfile.jsx";
import {
  EditAcademicRecord,
  EditProfile,
} from "./StudentProfile/EditProfile.jsx";
import { MembershipList } from "./StudentProfile/MembershipList.jsx";
import { UpcomingEvent } from "./StudentProfile/UpcomingEvent.jsx";
import { UpcomingAppointment } from "./StudentProfile/UpcomingAppointment.jsx";
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

    const firstName = String(draft?.firstName ?? "").trim();
    const lastName = String(draft?.lastName ?? "").trim();
    const preferredName = String(draft?.preferredName).trim();
    const degree = String(draft?.degree ?? "").trim();
    const major = String(draft?.major).trim();
    //validate type
    if (typeof draft?.firstName !== "string") {
      window.alert("This Field must be text.");
      return;
    }
    if (typeof draft?.lastName !== "string") {
      window.alert("This Field must be text.");
      return;
    }

    //required field
    if (!firstName) {
      window.alert("First name is required.");
      return;
    }
    if (!lastName) {
      window.alert("last name is required.");
      return;
    }
    //letters only
    if (!/^[\p{L}\s'-]+$/u.test(firstName)) {
      window.alert("First name should contain letters only.");
      return;
    }
    if (!/^[\p{L}\s'-]+$/u.test(lastName)) {
      window.alert("Last name should contain letters only.");
      return;
    }
    if (!/^[\p{L}\s'-]+$/u.test(degree)) {
      window.alert("degree should contain letters only.");
      return;
    }
    if (!/^[\p{L}\s'-]+$/u.test(major)) {
      window.alert("major should contain letters only.");
      return;
    }
    if (preferredName !== "" && !/^[\p{L}\s'-]+$/u.test(preferredName)) {
      window.alert("preferred name should contain letters only.");
      return;
    }

    const gpa = Number(String(draft?.academicRecord ?? "").trim());

    if (gpa >= 7.0 || gpa <= 0.0) {
      window.alert("GPA should be between 0.0 - 7.0");
      return;
    }
    const credit = Number(String(draft?.credit ?? "").trim());
    if (credit <= 6 || credit >= 200) {
      window.alert("credits should be between  6 - 200");
      return;
    }
    const udpatedInfo = {
      studentId: user.studentId, //doesnt change
      firstName: draft.firstName,
      lastName: draft.lastName,
      preferredName: draft.preferredName,
      degree: draft.degree,
      major: draft.major,
      description: draft.description,
      academicRecord: draft.academicRecord,
      credit: draft.credit,
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
            {/*Profile Card */}
            <CardL>
              <StudentCardTitleWithEdit>
                <Title>Profile</Title>
                {isEdit ? (
                  <SaveButtonProfile
                    data-testid="profile-save"
                    onClick={saveProfile}
                  >
                    Save
                  </SaveButtonProfile>
                ) : (
                  <button
                    type="button"
                    data-testid="profile-edit"
                    aria-label="Edit profile"
                    onClick={onClickEdit}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      size="xl"
                      // style={{ marginRight: "20px" }}
                      //onClick={onClickEdit}
                    />
                  </button>
                )}
              </StudentCardTitleWithEdit>
              {isEdit ? (
                <EditProfile user={draft} onFieldChange={onDraftChange} />
              ) : (
                <ShowProfile user={user} />
              )}
            </CardL>
            {/* Membership*/}
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
                    <SaveButtonProfile
                      data-testid="profile-save"
                      onClick={saveProfile}
                    >
                      Save
                    </SaveButtonProfile>
                  ) : (
                    <button
                      type="button"
                      data-testid="profile-edit"
                      aria-label="Edit profile"
                      onClick={onClickEdit}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "20px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="xl"
                        // style={{ marginRight: "20px" }}
                        //onClick={onClickEdit}
                      />
                    </button>
                    // <FontAwesomeIcon
                    //   icon={faEdit}
                    //   size="xl"
                    //   style={{ marginRight: "20px" }}
                    //   onClick={onClickEdit}
                    // />
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
                    <>
                      <SubTitle>GPA: {user?.academicRecord || "N/A"}</SubTitle>
                      <SubTitle>Credits:{user?.credit || "N/A"} </SubTitle>
                    </>
                  )}
                </div>
              </CardS>
              <Shortcut />
              <CardL style={{ textDecoration: "none", color: "inherit" }}>
                <StudentCardTitleWithEdit>
                  <Title>Timetable</Title>
                  <EditBtn
                    style={{
                      textDecoration: "none",
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                    as={NavLink}
                    to="/main/timetable"
                  >
                    Edit
                  </EditBtn>
                </StudentCardTitleWithEdit>
                {/* <Text>Click to edit your timetable</Text> */}
                {/* <Text>This section will show current semester timetable</Text> */}
                <div
                  style={{ height: 290, overflow: "auto", borderRadius: 12 }}
                >
                  <TimetableProfile
                    as={NavLink}
                    to="/main/timetable"
                    rowHeight={30}
                  />{" "}
                  {/* smaller rows help too */}
                </div>
              </CardL>
            </div>
            <div style={{ display: "grid", gap: "15px" }}>
              <UpcomingEvent />
              <UpcomingAppointment />
              <FriendList />
            </div>
          </div>
        </Container>
        <Outlet />
      </Section>
    </>
  );
}
export default Home;
