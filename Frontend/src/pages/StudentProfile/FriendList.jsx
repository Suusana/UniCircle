import styled from "styled-components";
import { Text, Title, SubTitle } from "../../components/Text";
import { useState, useEffect } from "react";
import { http } from "../../utils/http";
import { useAuth } from "../../contexts/AuthContext";
import { CardL } from "../../components/Card";
import { StudentCardTitleWithEdit } from "../../components/Container";
import { ActionBtn } from "../../components/Button";
import { ShowProfile } from "./showProfile";
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
  const [friendDetail, setFriendDetail] = useState(null);
  const { user } = useAuth();

  const currentStudentId = user.studentId;

  const fetchFriends = async () => {
    try {
      const response = await http.get(`/friends/${user.studentId}`, {
        params: { studentId: user.studentId },
      });
      const accepted = response.data.filter((f) => f.status === "Accepted");
      const mapped = accepted.map((f) => ({
        friendshipId: f.friendshipId,
        id: f.studentId === user.studentId ? f.studentId2 : f.studentId,
        firstName: f.firstName,
        lastName: f.lastName,
        preferredName: f.preferredName,
        name: f.name || `${f.firstName} ${f.lastName}`,
        year: f.year,
        degree: f.degree,
        major: f.major,
        description: f.description,
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
  const removeFriend = async (friend) => {
    if (!friend?.friendshipId) return;
    // optimistic update
    const prev = friends;
    setFriends((list) =>
      list.filter((f) => f.friendshipId !== friend.friendshipId)
    );
    try {
      await http.delete(`/friends/remove/${friend.friendshipId}`);
      // optionally: await fetchFriends(); // if you prefer server truth over optimistic
    } catch (err) {
      console.error("Failed to remove friend:", err);
      setFriends(prev); // revert on failure
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // const showDetail = (friendId) => {
  //   setFriend(friendId);
  // };
  if (friendDetail) {
    return (
      <CardL
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ShowProfile user={friendDetail} />
        <ActionBtn
          style={{ width: "70%", alignSelf: "center" }}
          onClick={() => setFriendDetail(null)}
        >
          {" "}
          back
        </ActionBtn>
      </CardL>
    );
  }
  return (
    <CardL>
      <Title>Friends</Title>

      {friends.filter((friend) => friend && friend.name).length === 0 ? (
        <SubTitle>Connect with Friends!</SubTitle>
      ) : (
        <FriendshipLists>
          {friends
            .filter((friend) => friend && friend.name)
            .map((friend) => (
              <StudentCardTitleWithEdit>
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
                    marginLeft: "20px",
                  }}
                  onClick={() => setFriendDetail(friend)}
                >
                  {friend.name}
                </Text>
                <ActionBtn onClick={() => removeFriend(friend)}>
                  Remove
                </ActionBtn>
              </StudentCardTitleWithEdit>
            ))}
        </FriendshipLists>
      )}
    </CardL>
  );
}
