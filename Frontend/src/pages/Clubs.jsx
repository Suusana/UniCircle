import ClubCard from "../components/ClubCard";
import styled from "styled-components";

const FlexDiv = styled.div`
display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px;
  justify-content: center;
  align-items: flex-start;
`;

function Clubs() {
  return (
    <div>
      <FlexDiv>
        <ClubCard
          name="Club 1"
          description="descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription."
          members={245}
        />
        <ClubCard
          name="Club 1"
          description="description."
          members={245}
        />
        <ClubCard
          name="Club 1"
          description="description."
          members={245}
        />
        <ClubCard
          name="Club 1"
          description="description."
          members={245}
        />
        <ClubCard
          name="Club 1"
          description="description."
          members={245}
        />
        <ClubCard
          name="Club 1"
          description="description."
          members={245}
        />
        <ClubCard
          name="Club 1"
          description="description."
          members={245}
        />
        <ClubCard
          name="Club 1"
          description="description."
          members={245}
        />
      </FlexDiv>
    </div>
  );
}
export default Clubs;
