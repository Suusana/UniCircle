import styled from "styled-components";
import { CardS } from "../components/Card.jsx";
import { Title } from "../components/Text";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSchool, faPerson } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
const Links = styled.div`
  padding-left: 10px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;
function Shortcut() {
  const [links, setLinks] = useState([]);

  //   useEffect(() => {
  //     (async () => {})();
  //   }, []);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/studentProfile"
        );
        const URls = await response.json();
        setLinks(URls);
        console.log("Shortcuts: ", URls);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <CardS>
      <Title style={{ marginBottom: "5px" }}>Shortcut</Title>
      <Links>
        {links.map((link) => (
          <a
            href={link.url}
            key={link.id}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #efefef",
              borderRadius: "10px",
              minWidth: "80px",
              maxHeight: "20px",
              justifyContent: "center",
              padding: "10px",
            }}
            target="_blank"
          >
            {link.name}
          </a>
        ))}
      </Links>
    </CardS>
  );
}
export default Shortcut;
