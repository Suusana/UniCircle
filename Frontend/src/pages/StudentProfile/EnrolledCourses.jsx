import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Title, SubTitle, Text } from "../../components/Text.jsx";
import { CardL } from "../../components/Card.jsx";
import {
  faUser,
  faCircleUser,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";
import { ActionBtn } from "../../components/Button.jsx";
//this lists all the enrolled coursess
export function EnrolledCourses({ onBack }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const getAllEnrolledCourses = async () => {
    try {
      const res = await http.get("/studentProfile/enrollments", {
        params: { studentId: user.studentId },
      });
      setCourses(res.data || []);
    } catch (err) {
      console.log("Fail to fetch current user's Enrolled courses");
      console.error(
        "[EnrolledCourses.jsx] failed",
        e?.message,
        e?.response?.status,
        e?.response?.data
      );
    }
  };
  useEffect(() => {
    getAllEnrolledCourses();
  }, []);
  return (
    <CardL>
      <Title>Courses</Title>
      {courses.length === 0 ? (
        <SubTitle>No Enrolled Courses</SubTitle>
      ) : (
        courses.map((course) => (
          <Text
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
              marginLeft: "20px",
            }}
          >
            {course.subject.name}
          </Text>
        ))
      )}
      <ActionBtn
        style={{ display: "flex", justifySelf: "center" }}
        onClick={onBack}
      >
        View Timetable
      </ActionBtn>
    </CardL>
  );
}
