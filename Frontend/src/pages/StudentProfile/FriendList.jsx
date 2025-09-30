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
  align-items: center;
  height: 130px;
  overflow-y: auto;
`;

export function FriendList() {
  const [friends, setFriends] = useState([]);
  const { user } = useAuth();

  //   const refreshFriends = async () => {
  //     if (!currentStudentId) return;
  //     try {
  //       const res = await fetch(
  //         `http://localhost:8080/friends/${currentStudentId}`
  //       );
  //       const data = await res.json();
  //       const accepted = data.filter((f) => f.status === "Accepted");
  //       const mapped = accepted.map((f) => ({
  //         friendshipId: f.friendshipId,
  //         id: f.studentId === currentStudentId ? f.studentId2 : f.studentId,
  //         name: f.name || `${f.firstName} ${f.lastName}`,
  //         year: f.year,
  //         degree: f.degree,
  //         class: f.class,
  //       }));
  //       setFriends(mapped);
  //     } catch (err) {
  //       console.error("Error fetching friends:", err);
  //     }
  //   };

  const fetchFriends = async () => {
    try {
      const response = await http.get(`/friends/${user.studentId}`, {
        params: { studentId: user.studentId },
      });
      const accepted = response.data.filter((f) => f.status === "Accepted");
      const mapped = accepted.map((f) => ({
        friendshipId: f.friendshipId,
        id: f.studentId === user.studentId ? f.studentId2 : f.studentId,
        name: f.name || `${f.firstName} ${f.lastName}`,
        year: f.year,
        degree: f.degree,
        class: f.class,
      }));
      setFriends(mapped || []);
      //setFriends(response.data || []);
    } catch (e) {
      console.log("Fail to fetch current user's friends list");
      console.error(
        "[friendship] failed",
        e?.message,
        e?.response?.status,
        e?.response?.data
      );
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <CardL>
      <Title>Friends</Title>

      {friends.filter((friend) => friend && friend.name).length === 0 ? (
        <SubTitle>Connect with Friends!</SubTitle>
      ) : (

        <FriendshipLists>
          {friends
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
                  width: "250px",
                  maxHeight: "20px",
                  justifyContent: "center",
                  padding: "10px",
                  marginLeft: "20px",
                }}
              >
                {friend.name}
              </Text>
            ))}
        </FriendshipLists>

      )}
    </CardL>
  );
}
