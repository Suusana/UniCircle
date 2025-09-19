import { useEffect, useState } from "react";
import ClubCard from "../components/ClubCard";
import styled from "styled-components";
import { http } from "../utils/http";
import { useAuth } from "../contexts/AuthContext";

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px;
  justify-content: center;
  align-items: flex-start;
`;

function Clubs() {
  // store clubs list.
  const [clubs, setClubs] = useState([]);
  const { user } = useAuth(); //get the current login user
  const [userClub, setUserClub] = useState([]);

  // get all the clubs
  const getAllClubs = async () => {
    try {
      const res = await http.get("/clubs/getAll")
      setClubs(res.data)
    } catch (err) {
      console.log("Fail to get all the clubs data")
    }
  }

  //get the current users' joined club ids
  const getUserClubId = async () => {
    const res = await http.get("/clubs/getUserClubIds", { params: { studentId: user.studentId } })
    setUserClub(res.data)
  }

  // when loading the club page, then trigger this line to get all clubs from the backend
  useEffect(() => {
    getAllClubs()
    getUserClubId()
  }, []);

  //Join or Leave the club
  const toggleJoin = async (e, clubId) => {
    e.preventDefault();
    if (userClub.includes(clubId)) {
      await http.delete("/clubs/leave", { params: { studentId: user.studentId, clubId: clubId } })
      setUserClub(pre => pre.filter(id => id != clubId)) // return a club list without current club id
      setClubs(pre => pre.map(club => 
        club.clubId === clubId ? { ...club, members: club.members - 1 } : club
      )); //update current club's members number
    } else {
      await http.post("/clubs/join", null, { params: { studentId: user.studentId, clubId: clubId } })
      setUserClub(pre => [...pre, clubId]) // add the club id into club list
      setClubs(pre => pre.map(club => 
        club.clubId === clubId ? { ...club, members: club.members + 1 } : club
      ));
    }
  }

  return (
    <div>
      <FlexDiv>
        {
          clubs.map((club) => (
            <ClubCard
              key={club.clubId}
              id={club.clubId}
              name={club.name}
              description={club.description}
              members={club.members}
              img={club.img}
              // If the current user's club ids includes current club id, 
              // then it means the user already join this club
              isJoin={userClub.includes(club.clubId)}
              toggleJoin={(e) => toggleJoin(e, club.clubId)}
            />
          ))
        }
      </FlexDiv>
    </div>
  );
}
export default Clubs;
