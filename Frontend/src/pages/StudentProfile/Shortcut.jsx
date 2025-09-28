import styled from "styled-components";
import { CardS } from "../../components/Card.jsx";
import { Title } from "../../components/Text.jsx";
import { useEffect, useState } from "react";
import { http } from "../../utils/http.js";

const Links = styled.div`
  padding-left: 10px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

function Shortcut() {
  const [links, setLinks] = useState([]);

  const getAllShortcutLinks = async () => {
    try {
      const res = await http.get("/studentProfile/allShortcuts");
      setLinks(res.data || []);
    } catch (err) {
      console.log("Fail to get all the shortcuts data");
    }
  };

  useEffect(() => {
    getAllShortcutLinks();
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
              textDecoration: "none", // ✅ only once
              color: "inherit", // ✅ only once
              display: "flex",
              alignItems: "center",
              border: "1px solid #efefef",
              borderRadius: "10px",
              minWidth: "80px",
              maxHeight: "20px",
              justifyContent: "center",
              padding: "10px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            {link.name}
          </a>
        ))}
      </Links>
    </CardS>
  );
}

export default Shortcut;
