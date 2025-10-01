import styled from "styled-components";
import { Text, SubTitle } from "../../components/Text";
import { useState, useEffect } from "react";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";

const MembershipLists = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  height: 130px;
  overflow-y: auto;
`;

export function MembershipList() {
  const [clubs, setClubs] = useState([]);
  const { user } = useAuth();

  const fetchMemberships = async () => {
    try {
      const response = await http.get("/studentProfile/MembershipList", {
        params: { studentId: user.studentId },
      });
      setClubs(response.data || []);
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
    fetchMemberships();
  }, []);

  return (
    <MembershipLists>
      {clubs.length === 0 ? (
        <SubTitle>Join Club!</SubTitle>
      ) : (

        clubs.map((club) => (
          <Text
            key={club.clubId}
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
            }}
          >
            {club.name}
          </Text>
        ))

      )}
    </MembershipLists>
  );
}
