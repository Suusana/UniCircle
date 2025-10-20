import styled from "styled-components";
import { Text, Title, SubTitle } from "../../components/Text";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";
import { CardL } from "../../components/Card";
import { StudentCardTitleWithEdit } from "../../components/Container";
import { ActionBtn } from "../../components/Button";
import { ShowProfile } from "./showProfile";
import TimetableP from "./Timetable2";
import { EnrolledCourses } from "./EnrolledCourses";
export function TimetableProfile() {
  const [enrollToggle, setEnrollToggle] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {!enrollToggle ? (
        <CardL style={{ textDecoration: "none", color: "inherit" }}>
          <StudentCardTitleWithEdit>
            <Title>Timetable</Title>
            <div>
              <ActionBtn onClick={() => setEnrollToggle(true)}>
                Courses
              </ActionBtn>
              <ActionBtn
                style={{
                  textDecoration: "none",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
                as={NavLink}
                to="/main/timetable"
              >
                Edit
              </ActionBtn>
            </div>
          </StudentCardTitleWithEdit>
          {/* <Text>Click to edit your timetable</Text> */}
          {/* <Text>This section will show current semester timetable</Text> */}
          <div
            style={{
              height: 290,
              overflowX: "auto",
              overflowY: "auto",
              borderRadius: 12,
            }}
          >
            <TimetableP /> {/* smaller rows help too */}
          </div>
        </CardL>
      ) : (
        <>
          <EnrolledCourses onBack={() => setEnrollToggle(false)} />
        </>
      )}
    </>
    // <CardL style={{ textDecoration: "none", color: "inherit" }}>
    //   <StudentCardTitleWithEdit>
    //     <Title>Timetable</Title>
    //     <div>
    //       <ActionBtn onClick={() => setEnrollToggle(true)}>
    //         Enrollment
    //       </ActionBtn>
    //       <ActionBtn
    //         style={{
    //           textDecoration: "none",
    //           marginTop: "10px",
    //           marginRight: "10px",
    //         }}
    //         as={NavLink}
    //         to="/main/timetable"
    //       >
    //         Edit
    //       </ActionBtn>
    //     </div>
    //   </StudentCardTitleWithEdit>
    //   {/* <Text>Click to edit your timetable</Text> */}
    //   {/* <Text>This section will show current semester timetable</Text> */}
    //   <div
    //     style={{
    //       height: 290,
    //       overflowX: "auto",
    //       overflowY: "auto",
    //       borderRadius: 12,
    //     }}
    //   >
    //     <TimetableP /> {/* smaller rows help too */}
    //   </div>
    // </CardL>
  );
}
