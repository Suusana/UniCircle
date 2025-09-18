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
import http from "../utils/http.js";
import { SaveButtonProfile } from "../components/Button.jsx";

<CardL>
  <StudentCardTitleWithEdit>
    <Title>Profile</Title>{" "}
    {isEdit ? (
      <SaveButtonProfile onClick={saveProfile}>Save</SaveButtonProfile>
    ) : (
      <FontAwesomeIcon
        icon={faEdit}
        size="xl"
        style={{ marginRight: "20px" }}
        onClick={onClickEdit}
      />
    )}
  </StudentCardTitleWithEdit>
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
    Name: {User?.firstName} {User?.lastName}
  </SubTitle>
  <SubTitle>Degree: {User?.degree}</SubTitle>
  <SubTitle>Major: {User?.major}</SubTitle>
  <SubTitle style={{ marginBottom: "0px" }}>Description :</SubTitle>
  <Text>{User?.description || "Add description! "}</Text>
</CardL>;
