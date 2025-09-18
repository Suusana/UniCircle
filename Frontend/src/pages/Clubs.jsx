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
  const {user} = useAuth();
  console.log(user);

  // get all the clubs
  const getAllClubs = async () => {
    try {
      const res = await http.get("/clubs/getAll")
      console.log(res.data)
      setClubs(res.data)
    } catch (err) {
      console.log("Fail to get all the clubs data")
    }
  }

  const getUserClubId = async () => {
    // const res = await http.get("/clubs/getUserClubIds", { params: { studentId: user.studentId } })
    // console.log(res.data)
  }

  // when loading the club page, then trigger this line to get all clubs from the backend
  useEffect(() => {
    getAllClubs()
    getUserClubId()
  }, []);

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
              isJoin={true}
            />
          ))
        }
      </FlexDiv>
    </div>
  );
}
export default Clubs;
