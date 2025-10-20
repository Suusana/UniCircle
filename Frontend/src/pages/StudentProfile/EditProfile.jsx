import { Title, SubTitle, Text } from "../../components/Text.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export function EditProfile({ user = {}, onFieldChange }) {
  const handle = (key) => (e) => onFieldChange?.({ [key]: e.target.value });
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
        FirstName:
        <input
          data-testid="first-name-input"
          type="text"
          value={user.firstName}
          onChange={handle("firstName")}
        ></input>
        <br />
        LastName :
        <input
          data-testid="last-name-input"
          type="text"
          value={user.lastName}
          placeholder={user.lastName}
          onChange={handle("lastName")}
        ></input>
        <br />
        Preferred Name:
        <input
          data-testid="preferred-name-input"
          type="text"
          value={user.preferredName ?? ""}
          placeholder={user.preferredName}
          onChange={handle("preferredName")}
        ></input>
      </SubTitle>
      <SubTitle>
        Degree:
        <input
          data-testid="degree-input"
          type="text"
          value={user.degree ?? ""}
          placeholder={user.degree}
          onChange={handle("degree")}
        ></input>
      </SubTitle>
      <SubTitle>
        Major:{" "}
        <input
          data-testid="major-input"
          type="text"
          value={user.major ?? ""}
          placeholder={user.major}
          onChange={handle("major")}
        ></input>
      </SubTitle>
      <SubTitle style={{ marginBottom: "0px" }}>Description :</SubTitle>
      <Text>
        <textarea
          data-testid="description-input"
          value={user.description ?? ""}
          placeholder={user?.description}
          onChange={handle("description")}
        ></textarea>
      </Text>
    </>
  );
}

export function EditAcademicRecord({ user = {}, onFieldChange }) {
  const handle = (key) => (e) => onFieldChange?.({ [key]: e.target.value });
  return (
    <>
      <SubTitle>
        GPA:
        <input
          data-testid="gpa-input"
          type="number"
          step="0.01"
          inputMode="decimal"
          min={0.0}
          max={7.0}
          value={user.academicRecord ?? ""}
          onChange={handle("academicRecord")}
        ></input>
      </SubTitle>
      <SubTitle>
        Credits:
        <input
          data-testid="credit-input"
          type="number"
          min={0}
          max={200}
          value={user.credit ?? ""}
          onChange={handle("credit")}
        ></input>
      </SubTitle>
    </>
  );
}
