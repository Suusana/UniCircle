import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Title, SubTitle, Text } from "../../components/Text.jsx";

import {
  faUser,
  faCircleUser,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export function ShowProfile({ user }) {
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleUser}
        size="4x"
        style={{
          display: "flex",
          justifySelf: "center",
          margin: "20px",
        }}
      />
      <SubTitle>
        Name: {user?.firstName} {user?.lastName}
      </SubTitle>
      {user.preferredName !== null ? (
        <SubTitle>Preferred Name: {user?.preferredName}</SubTitle>
      ) : null}
      <SubTitle>Degree: {user?.degree}</SubTitle>
      <SubTitle>Major: {user?.major}</SubTitle>
      <SubTitle style={{ marginBottom: "0px" }}>Description :</SubTitle>
      {user.description !== null ? (
        <Text>{user?.description}</Text>
      ) : (
        <Text>Add Description</Text>
      )}
    </>
  );
}
