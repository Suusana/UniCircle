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
    props.fullWidth ? "1fr" : "repeat(auto-fill, minmax(250px, 1fr))"};
  max-width: ${(props) => (props.limitCols ? "900px" : "100%")};
  gap: 16px;
  margin: 0 40px;
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
`;
const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 450px;
`;

export default function Friends() {
  const [tab, setTab] = useState("friends");
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalSearch, setModalSearch] = useState("");


  const { user, refreshUser } = useAuth();
  const currentStudentId = user?.id ?? user?.studentId;

  const filterData = (data, query) =>
    data.filter(u => u.name && u.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!currentStudentId) return;

    console.log("Current student ID:", currentStudentId);

    fetch(`http://localhost:8080/friends/${currentStudentId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched friends raw:", data);
        const accepted = data.filter(f => f.status === "Accepted");
        const pending = data.filter(f => f.status === "Pending");
        console.log("Accepted friends:", accepted);
        console.log("Pending requests:", pending);
        setFriends(accepted);
        setRequests(pending);
      })
      .catch(err => console.error(err));
  }, [currentStudentId]);



  const acceptRequest = (user) => {
    fetch(`http://localhost:8080/friends/${user.friendshipId}/accept`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(updated => {
        setFriends([...friends, updated]);
        setRequests(requests.filter(r => r.friendshipId !== user.friendshipId));
      });
  };

  const removeFriend = (friendshipId) => {
    fetch(`http://localhost:8080/friends/remove/${friendshipId}`, {
      method: "DELETE"
    }).then(() => {
      setFriends(friends.filter(f => f.friendshipId !== friendshipId));
    });
  };

  const requestFriend = (user) => {
    fetch(`http://localhost:8080/friends/add?studentId=${currentStudentId}&studentId2=${user.id}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(() => {
        setUsers(users.filter(u => u.id !== user.id));
      });
  };

  const declineRequest = (friendshipId) => {
    fetch(`http://localhost:8080/friends/${friendshipId}/decline`, {
      method: "PUT"
    })
      .then(() => {
        setRequests(requests.filter(r => r.friendshipId !== friendshipId));
      });
  };


  const renderGrid = (data, type, query) => {
    const filtered = filterData(data, query);

    if (type === "friends") {
      return (
        <Grid limitCols>
          {filtered.map((user) => (
            <Card key={user.id}>
              <div>
                <b>{user.name}</b>
                <div>{user.year} year {user.degree}</div>
                <div>{user.class}</div>
              </div>
              <ActionBtn onClick={() => removeFriend(user.friendshipId)}>Remove</ActionBtn>
            </Card>
          ))}
        </Grid>
      );
    }

    if (type === "requests") {
      return (
        <Grid fullWidth>
          {filtered.map((user) => (
            <Card key={user.id}>
              <div>
                <b>{user.name}</b>
                <div>{user.year} year {user.degree}</div>
                <div>{user.className}</div>
              </div>
              <div>
                <ActionBtn onClick={() => acceptRequest(user)}>Accept</ActionBtn>
                <ActionBtn onClick={() => declineRequest(user.friendshipId)}>Decline</ActionBtn>
              </div>
            </Card>
          ))}
        </Grid>
      );
    }

    if (type === "timetableShares") {
      return (
        <Grid fullWidth>
          {filtered.map((user) => (
            <Card key={user.id}>
              <div>
                <b>{user.name}</b>
                <div>{user.year} year {user.degree}</div>
                <div>{user.class}</div>
              </div>
              <ActionBtn>View Timetable</ActionBtn>
            </Card>
          ))}
        </Grid>
      );
    }

    if (type === "users") {
      return (
        <Grid fullWidth>
          {filtered.map((user) => (
            <Card key={user.id}>
              <div>
                <b>{user.name}</b>
                <div>{user.year} year {user.degree}</div>
                <div>{user.class}</div>
              </div>
              <ActionBtn onClick={() => requestFriend(user)}>Request</ActionBtn>
            </Card>
          ))}
        </Grid>
      );
    }
  };

  return (
    <>
      <Header>
        <Title>Friends</Title>
        <Button onClick={() => setShowModal(true)}>Add Friends</Button>
      </Header>

      <SearchDiv>
        <Input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      </SearchDiv>

      <Tabs>
        <TabBtn $active={tab === 'friends'} onClick={() => setTab('friends')}>Friends ({friends.length})</TabBtn>
        <TabBtn $active={tab === 'requests'} onClick={() => setTab('requests')}>Requests ({requests.length})</TabBtn>
        <TabBtn $active={tab === 'timetable'} onClick={() => setTab('timetable')}>Timetables</TabBtn>
      </Tabs>

      {tab === "friends" && renderGrid(friends, "friends", search)}
      {tab === "requests" && renderGrid(requests, "requests", search)}
      {tab === "timetable" && renderGrid(timetableShares, "timetableShares", search)}



      {showModal && (
        <ModalOverlay>
          <Modal>
            <h3>Add Friends</h3>
            <Input
              type="text"
              placeholder="Search users..."
              value={modalSearch}
              onChange={e => setModalSearch(e.target.value)}
              style={{ marginBottom: "16px", width: "100%" }}
            />
            {renderGrid(users, "users", modalSearch)}
            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <ActionBtn onClick={() => setShowModal(false)}>Close</ActionBtn>
            </div>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
}


