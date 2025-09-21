import styled from "styled-components";
import { CardS } from "../../components/Card.jsx";
import { Title } from "../../components/Text";

const Links = styled.div`
  padding-left: 10px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;
export function MembershipList() {
  return (
    <CardS>
      <Text>
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
      </Text>
    </CardS>
  );
}
