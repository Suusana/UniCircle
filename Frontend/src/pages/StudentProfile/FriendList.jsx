import styled from "styled-components";
import { Text, Title, SubTitle } from "../../components/Text";
import { useState, useEffect } from "react";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";
import { CardL } from "../../components/Card";

const FriendshipLists = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  height: 130px;
  overflow-y: auto;
`;

export function FriendList() {
  const [friends, setFriends] = useState([]);
  const { user } = useAuth();

  //   const fetchFriends = async () => {
  //     try {
  //       const response = await http.get("/studentProfile/FriendShipList", {
  //         params: { studentId: user.studentId },
  //       });
  //       setFriends(response.data || []);
  //     } catch (e) {
  //       console.log("Fail to fetch current user's membership list");
  //       console.error(
  //         "[membership] failed",
  //         e?.message,
  //         e?.response?.status,
  //         e?.response?.data
  //       );
  //     }
  //   };

  //   useEffect(() => {
  //     fetchFriends();
  //   }, []);

  return (
    <CardL>
      <Title>Friends</Title>

      {friends.filter((friend) => friend && friend.name).length === 0 ? (
        <SubTitle>Connect with Friends!</SubTitle>
      ) : (
        clubs
          .filter((friend) => friend && friend.name) // 🚨 skip nulls
          .map((friend) => (
            <Text
              key={friend.friendId}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                border: "1px solid #efefef",
                borderRadius: "10px",
                width: "200px",
                maxHeight: "20px",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              {friend.name}
            </Text>
          ))
      )}
    </CardL>
  );
}
