import styled from "styled-components";
import { CardS } from "../../components/Card.jsx";
import { Title, Text, SubTitle } from "../../components/Text";
import { useState, useEffect } from "react";
import { http } from "../../utils/http";
// function Shortcut() {
//   const [links, setLinks] = useState([]);

//   //   useEffect(() => {
//   //     (async () => {})();
//   //   }, []);
//   // get all the clubs

//   const getAllShortcutLinks = async () => {
//     try {
//       const res = await http.get("/studentProfile/allShortcuts");
//       console.log(res.data);
//       setLinks(res.data);
//     } catch (err) {
//       console.log("Fail to get all the shortcuts data");
//     }
//   };

//   // when loading the club page, then trigger this line to get all clubs from the backend
//   useEffect(() => {
//     getAllShortcutLinks();
//   }, []);

const MembershipLists = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  height: 130px;
  overflow-y: auto;
`;
export function MembershipList() {
  const [clubs, setClubs] = useState([]);

  const loggedInUserMembershipList = async () => {
    try {
      const response = await http.get(
        "/studentProfile/loggedInUserMembershipList"
      );
      setClubs(response.data);
      console.log("membershipList get request test");
      console.log(response.data);
    } catch (e) {
      console.log("Fail to fetch current user's membership list");
      console.error(
        "[membership] failed",
        e?.message,
        e?.response?.status,
        e?.response?.data
      );
    }
  };

  useEffect(() => {
    loggedInUserMembershipList();
  }, []);

  return (
    <MembershipLists>
      {clubs.length === 0 ? (
        <SubTitle>Join Club! </SubTitle>
      ) : (
        clubs.map((club) => (
          <Text
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #efefef",
              borderRadius: "10px",
              width: "200px",
              maxHeight: "20px",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {club.name}
          </Text>
        ))
      )}
    </MembershipLists>
  );
}
