import ClubCard from "../components/ClubCard";
import styled from "styled-components";

const FlexDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 一行 4 个 */
  gap: 16px;                             /* 上下左右间距 */
  padding: 16px;   
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
