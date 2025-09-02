import { useState } from "react";
import styled, { css } from "styled-components";

//styling
const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0b0f17;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const Card = styled.div`
  background: white;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const Tabs = styled.div`
  display: inline-flex; padding: 6px; background:#fff; border:1px solid #eaeaea; border-radius: 14px; gap: 6px;
`;
const TabBtn = styled.button`
  border:none; background: transparent; padding:10px 14px; border-radius: 10px; cursor:pointer; font-weight:600; color:#364152;
  ${({ $active }) => $active && css`background:#0b0f17; color:#fff;`}
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
  width: 400px;
`;


//sample data 
const sampleFriends = [
  { id: 1, name: "Mike Johnson", degree: "Business", year: "2nd", class: "STAT101" },
  { id: 2, name: "Alice Nguyen", degree: "Computer Science", year: "1st", class: "MATH101" },
  { id: 3, name: "Charlie Smith", degree: "Product Design", year: "3rd", class: "ENG101" },
  { id: 4, name: "Ethan Lee", degree: "Computer Science", year: "4th", class: "ENG101" },
];

const sampleRequests = [
  { id: 5, name: "Oliver Williams", degree: "Mathematics", year: "1st", class: "MATH101" },
  { id: 6, name: "Some Guy", degree: "Computer Science", year: "3rd", class: "CS101" }
]

const sampleUsers = [
  { id: 7, name: "Emily Zhang", degree: "Law", year: "2nd", class: "LAW101" },
  { id: 8, name: "Daniel Brown", degree: "Engineering", year: "1st", class: "ENGR101" },
];

const sampleTimetableShares = [
  { id: 2, name: "Alice Nguyen", degree: "Computer Science", year: "1st", class: "MATH101" }
];


export default function Friends() {
  const [tab, setTab] = useState('friends');
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState(sampleFriends);
  const [requests, setRequests] = useState(sampleRequests);
  const [users, setUsers] = useState(sampleUsers);
  const [timetableShares] = useState(sampleTimetableShares);
  const [showModal, setShowModal] = useState(false);

  const filterData = (data) =>
    data.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  const acceptRequest = (user) => {
    setFriends([...friends, user]);
    setRequests(requests.filter(r => r.id !== user.id));
  };

  const declineRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };


  const addFriendRequest = (user) => {
    setRequests([...requests, user]);
    setUsers(users.filter(u => u.id !== user.id));
  };

  const renderGrid = (data, type) => (
    <Grid>
      {filterData(data).map(user => (
        <Card key={user.id}>
          <div><b>{user.name}</b></div>
          <div>{user.year} year {user.degree}</div>
          <div>{user.class}</div>
          {type === "requests" && (
            <>
              <button onClick={() => acceptRequest(user)}>Accept</button>
              <button onClick={() => declineRequest(user.id)}>Decline</button>
            </>
          )}
          {type === "users" && (
            <button onClick={() => addFriendRequest(user)}>Add</button>
          )}
        </Card>
      ))}
    </Grid>
  );

  return (
    <>
      <Title>Friends</Title>
      <button onClick={() => setShowModal(true)}>Add Friends</button>

      <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />

      <Tabs>
        <TabBtn $active={tab === 'friends'} onClick={() => setTab('friends')}>Friends ({friends.length})</TabBtn>
        <TabBtn $active={tab === 'requests'} onClick={() => setTab('requests')}>Requests ({requests.length})</TabBtn>
        <TabBtn $active={tab === 'timetable'} onClick={() => setTab('timetable')}>Timetables</TabBtn>
      </Tabs>

      {tab === "friends" && renderGrid(friends, "friends")}
      {tab === "requests" && renderGrid(requests, "requests")}
      {tab === "timetable" && renderGrid(timetableShares, "friends")}



      {showModal && (
        <ModalOverlay>
          <Modal>
            <h3>Add Friends</h3>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {renderGrid(users, "users")}
            <button onClick={() => setShowModal(false)}>Close</button>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
}
