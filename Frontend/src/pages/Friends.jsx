// contributor: gurpreet

import { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { Button, ActionBtn } from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faRoad, faStar } from "@fortawesome/free-solid-svg-icons";

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
  max-width: ${(props) => (props.limitCols ? "1080px" : "100%")};
  padding: ${(props) => (props.fullWidth ? "0 40px" : "0")}; 
  box-sizing: border-box;
`;


const Card = styled.div`
  background: white;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 130px;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  gap:10px;
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

const ModalSearchInput = styled(Input)`
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box; 
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px; right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const InfoLine = styled.div`
  display: block;
  width: "100%";
  gap: 8px;
  font-size: 14px;
  color: #444;
  margin-bottom: 2px;

  svg {
    color: #222;
    font-size: 15px;
    opacity: 0.8;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => props.bgColor || "#ddd"};
  color: ${(props) => props.textColor || "#000"};
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  text-transform: uppercase;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 280px;
`;

const FriendName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0b0f17;
`;

const FriendDegree = styled.div`
  font-size: 15px;
  color: #444;
`;

const FriendMajor = styled.div`
  font-size: 13px;
  color: #666;
`;


export default function Friends() {
  const { user } = useAuth();
  const currentStudentId = user?.id ?? user?.studentId;

  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [addable, setAddable] = useState([]);
  const [tab, setTab] = useState("friends");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalSearch, setModalSearch] = useState("");

  const filterData = (data, query) =>
    data.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));

  const fetchData = async (url) => {
    const res = await axios.get(url);
    return res.data;
  }

  const refreshAll = async () => {
    if (!currentStudentId) return;
    try {
      const [friendsData, requestsData, addableData] = await Promise.all([
        fetchData(`/friends/${currentStudentId}`),
        fetchData(`/friends/${currentStudentId}/requests`),
        fetchData(`/friends/${currentStudentId}/addable`)
      ]);

      //friends
      setFriends(friendsData.filter(friend => friend.status === "Accepted").map(friend =>
      ({
        friendshipId: friend.friendshipId,
        id: friend.studentId === currentStudentId ? friend.studentId2 : friend.studentId,
        name: friend.name || `${friend.firstName} ${friend.lastName}`,
        year: friend.year,
        degree: friend.degree,
        major: friend.major,
        commonCourses: friend.commonCourses || [],
        commonClubs: friend.commonClubs || []
      })));

      //requests
      setRequests(requestsData.map(friend => ({
        friendshipId: friend.friendshipId,
        id: friend.studentId,
        name: friend.name || `${friend.firstName} ${friend.lastName}`,
        year: friend.year,
        degree: friend.degree,
        major: friend.major
      })));

      //addable
      setAddable(addableData.map(user => ({
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        year: user.year,
        degree: user.degree,
        major: user.major,
        requested: user.requested,
        friendshipId: user.friendshipId || null
      })));
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };

  useEffect(() => {
    refreshAll();
  }, [currentStudentId]);

  const removeFriend = async (user) => { 
    await axios.delete(`/friends/remove/${user.friendshipId}`); 
    refreshAll(); 
  };

  const requestFriend = async (user) => { 
    await axios.post(`/friends/add`, null, { params: { studentId: currentStudentId, studentId2: user.id } }); 
    refreshAll(); 
  };

  const cancelRequest = async (user) => { 
    await removeFriend(user); 
  };

  const acceptRequest = async (user) => { 
    await axios.put(`/friends/${user.friendshipId}/accept`); 
    refreshAll(); 
  };

  const rejectRequest = async (user) => { 
    await removeFriend(user); 
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
      </Tabs>

      {tab === "friends" && (
        <Grid limitCols>
          {filterData(friends, search).length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px", color: "#666" }}>
              No friends to show.
            </div>
          ) : (
            filterData(friends, search).map(user => (
              <Card key={user.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <Avatar>{user.name?.charAt(0).toUpperCase()}</Avatar>
                  <FriendInfo>
                    <FriendName>{user.name}</FriendName>
                    <FriendDegree>Year {user.year} {user.degree}</FriendDegree>
                    <FriendMajor>{user.major}</FriendMajor>
                  </FriendInfo>
                </div>
                {/* <InfoLine> */}
                <div style={{ width: "100%", marginTop: "4px" }}>
                  {/* <div style={{ marginBottom: "4px", display: "block" }}> */}
                  <InfoLine>
                    <FontAwesomeIcon icon={faBookOpen} />{" "}
                    {user.commonCourses?.length > 0
                      ? user.commonCourses.join(", ")
                      : "No common courses"}
                  </InfoLine>

                  {/* </div> */}
                  {/* <div style={{ display: "block" }}> */}
                  <InfoLine>

                    <FontAwesomeIcon icon={faStar} />{" "}
                    {user.commonClubs?.length > 0
                      ? user.commonClubs.join(", ")
                      : "No common clubs"}
                  </InfoLine>

                  {/* </div> */}
                </div>
                {/* </InfoLine> */}
                <ActionBtn onClick={() => removeFriend(user)}>Remove</ActionBtn>
              </Card>
            ))
          )}
        </Grid>
      )}

      {tab === "requests" && (
        <Grid fullWidth>
          {filterData(requests, search).length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              No requests yet.
            </div>
          ) : (
            filterData(requests, search).map(user => (
              <Card key={user.id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar>{user.name?.charAt(0).toUpperCase()}</Avatar>
                  <FriendInfo>
                    <FriendName>{user.name}</FriendName>
                    <FriendDegree>Year {user.year} {user.degree}</FriendDegree>
                    <FriendMajor>{user.major}</FriendMajor>
                  </FriendInfo>
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
              {filterData(addable, modalSearch).map(user => (
                <Card key={user.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar>{user.name?.charAt(0).toUpperCase()}</Avatar>
                    <FriendInfo>
                      <FriendName>{user.name}</FriendName>
                      <FriendDegree>Year {user.year} {user.degree}</FriendDegree>
                      <FriendMajor>{user.major}</FriendMajor>
                    </FriendInfo>
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