import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faCircleUser,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export function ShowProfile() {
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
        onClick={onClickEdit}
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
      <Text>{user?.description || "Add description! "}</Text>
    </>
  );
}
