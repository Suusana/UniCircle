import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useAuth } from "../contexts/AuthContext";

//styling
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0 40px 16px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0b0f17;
  margin: 0;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 0 14px;
  font-size: 14px;
  margin-right: 12px;
  outline: none;
  &:focus { box-shadow: 0 0 0 3px rgba(28,100,242,0.12); border-color: #1c64f2; }
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 40px 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.fullWidth ? "1fr" : "repeat(3, 1fr)"};
  gap: 20px;
  justify-content: center;
  margin: 0 auto 20px;
  max-width: ${(props) => (props.limitCols ? "960px" : "100%")};
`;

const Card = styled.div`
  background: white;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin:0 auto 20px;
  max-width: 600px;  
  padding: 5px; 
  background:#f5f5f5; 
  border-radius: 12px; 
`;

const TabBtn = styled.button`
flex: 1; 
  border:none; 
  background: transparent; 
  padding:8px 12px; 
  border-radius: 8px; 
  cursor:pointer; 
  font-weight:600; 
  color:#364152;
  ${({ $active }) => $active && css`background: #0b0f17;
      color: #fff;`}
`;

const ModalSearchInput = styled(Input)`
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box; /* ensures padding doesn’t break full width */
`;



const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const ActionBtn = styled(Button)`
  margin: 0 6px;
  padding: 6px 12px;
  font-size: 14px;
`;

//add friends pop up styling 
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; 
  justify-content: center; 
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 450px;
  max-height: 80vh;
  overflow-y: auto; 
  position: relative; 
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px; right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export default function Friends() {
  const { user } = useAuth();
  const currentStudentId = user?.id ?? user?.studentId;

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("friends");
  const [showModal, setShowModal] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [schedule, setSchedule] = useState([]);


  const filterData = (data, query) =>
    data.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));

  const refreshFriends = async () => {
    if (!currentStudentId) return;
    try {
      const res = await fetch(`http://localhost:8080/friends/${currentStudentId}`);
      const data = await res.json();
      const accepted = data.filter(f => f.status === "Accepted");
      const mapped = accepted.map(f => ({
        friendshipId: f.friendshipId,
        id: f.studentId === currentStudentId ? f.studentId2 : f.studentId,
        name: f.name || `${f.firstName} ${f.lastName}`,
        year: f.year,
        degree: f.degree,
        class: f.class,
      }));
      setFriends(mapped);
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  const refreshAddable = async () => {
    if (!currentStudentId) return;
    try {
      const res = await fetch(`http://localhost:8080/friends/${currentStudentId}/addable`);
      const data = await res.json();
      const mapped = data.map(u => ({
        id: u.id,
        name: u.name || `${u.firstName} ${u.lastName}`,
        year: u.year,
        degree: u.degree,
        class: u.major,
        requested: u.requested,
        friendshipId: u.friendshipId || null
      }));
      setUsers(mapped);
    } catch (err) {
      console.error("Error fetching addable users:", err);
    }
  };

  const refreshRequests = async () => {
    if (!currentStudentId) return;
    try {
      const res = await fetch(`http://localhost:8080/friends/${currentStudentId}/requests`);
      const data = await res.json();
      const mapped = data.map(f => ({
        friendshipId: f.friendshipId,
        id: f.studentId,
        name: f.name || `${f.firstName} ${f.lastName}`,
        year: f.year,
        degree: f.degree,
        class: f.class
      }));
      setRequests(mapped);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };



  const refreshSchedule = async () => {
    if (!currentStudentId) return;
    try {
      const res = await fetch(`http://localhost:8080/friends/${currentStudentId}/schedule`);
      const data = await res.json();
      setSchedule(data);
    } catch (err) {
      console.error("Error fetching schedule data:", err);
    }
  };



  useEffect(() => {
    refreshFriends();
    refreshAddable();
    refreshRequests();
    refreshSchedule();
  }, [currentStudentId]);


  const removeFriend = async (user) => {
    try {
      await fetch(`http://localhost:8080/friends/remove/${user.friendshipId}`, { method: "DELETE" });
      refreshFriends();
      refreshAddable();
    } catch (err) {
      console.error("Failed to remove friend:", err);
    }
  };

  const requestFriend = async (user) => {
    try {
      await fetch(`http://localhost:8080/friends/add?studentId=${currentStudentId}&studentId2=${user.id}`, {
        method: "POST",
      });
      refreshAddable();
    } catch (err) {
      console.error("Failed to send friend request:", err);
    }
  };

  const cancelRequest = async (user) => {
    try {
      await fetch(`http://localhost:8080/friends/remove/${user.friendshipId}`, { method: "DELETE" });
      refreshAddable();
    } catch (err) {
      console.error("Failed to cancel friend request:", err);
    }
  };

  const acceptRequest = async (user) => {
    try {
      console.log(user);
      await fetch(`http://localhost:8080/friends/${user.friendshipId}/accept`, { method: "PUT" });
      refreshFriends();
      refreshAddable();
      refreshRequests();
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
  };

  const rejectRequest = async (user) => {
    try {
      await fetch(`http://localhost:8080/friends/remove/${user.friendshipId}`, { method: "DELETE" });
      refreshAddable();
      refreshRequests();
    } catch (err) {
      console.error("Failed to reject request:", err);
    }
  };

  const renderAddFriendButton = (user) => (
    user.requested
      ? <ActionBtn onClick={() => cancelRequest(user)}>Requested</ActionBtn>
      : <ActionBtn onClick={() => requestFriend(user)}>Request</ActionBtn>
  );


  return (
    <>
      <Header>
        <Title>Friends</Title>
        <Button onClick={() => setShowModal(true)}>Add Friends</Button>
      </Header>

      <SearchDiv>
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </SearchDiv>

      <Tabs>
        <TabBtn $active={tab === "friends"} onClick={() => setTab("friends")}>
          Friends ({friends.length})
        </TabBtn>
        <TabBtn $active={tab === "requests"} onClick={() => setTab("requests")}>
          Requests ({requests.length})
        </TabBtn>
        <TabBtn $active={tab === "schedule"} onClick={() => setTab("schedule")}>
          Schedule
        </TabBtn>

      </Tabs>

      {tab === "friends" && (
        <Grid limitCols>
          {filterData(friends, search).length === 0 ? (
      <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px", color: "#666" }}>
        No friends to show.
      </div>
    ) : (
      filterData(friends, search).map(friend => (
            <Card key={user.id}>
              <div>
                <b>{user.name}</b>
                <div>Year {user.year} {user.degree}</div>
                <div>{user.class}</div>
              </div>
              <ActionBtn onClick={() => removeFriend(user)}>Remove</ActionBtn>
            </Card>
          ))
        )}
        </Grid>
      )}

      {tab === "requests" && (
        <Grid fullWidth>
          {requests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              No requests yet.
            </div>
          ) : (
            requests.map(user => (
              <Card key={user.id}>
                <div>
                  <b>{user.name}</b>
                  <div>Year {user.year} {user.degree}</div>
                  <div>{user.class}</div>
                </div>
                <div>
                  <ActionBtn onClick={() => acceptRequest(user)}>Accept</ActionBtn>
                  <ActionBtn onClick={() => rejectRequest(user)}>Reject</ActionBtn>
                </div>
              </Card>
            ))
          )}
        </Grid>
      )}


      {tab === "schedule" && (
        <Grid limitCols>
           {schedule.length === 0 ? (
      <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px", color: "#666" }}>
        No schedules to show.
      </div>
    ) : (
      schedule.map(friend => (
            <Card key={friend.id}>
              <div>
                <b>{friend.name}</b>
                <div>Year {friend.year} {friend.degree}</div>
                <div>Common Courses: {friend.commonCourses.join(", ") || "None"}</div>
                <div>Common Clubs: {friend.commonClubs.join(", ") || "None"}</div>
              </div>
            </Card>
          ))
        )}
        </Grid>
      )}


      {showModal && (
        <ModalOverlay>
          <Modal>
            <CloseBtn onClick={() => setShowModal(false)}>×</CloseBtn>
            <h3>Add Friends</h3>
            <ModalSearchInput
              type="text"
              placeholder="Search users..."
              value={modalSearch}
              onChange={e => setModalSearch(e.target.value)}
            />
            <Grid fullWidth>
              {filterData(users, modalSearch).map(user => (
                <Card key={user.id}>
                  <div>
                    <b>{user.name}</b>
                    <div>Year {user.year} {user.degree}</div>
                    <div>{user.class}</div>
                  </div>
                  {renderAddFriendButton(user)}
                </Card>
              ))}
            </Grid>
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <ActionBtn onClick={() => setShowModal(false)}>Close</ActionBtn>
            </div>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
}


