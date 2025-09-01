import styled from "styled-components";

const CardBackground = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.06);
  border: 1px solid #efefef;
`;
export const CardS = styled(CardBackground)`
  width: 361px;
  height: 90px;
`;

export const CardM = styled(CardBackground)`
  /* Liquid Glass - Clear/Light */
  width: 361px;
  height: 180px;
`;
export const CardL = styled(CardBackground)`
  width: 361px;
  height: 360px;
`;
export const Card = styled(CardBackground)`
  width: 100%;
  max-width: 500px;
  padding: 24px;
  margin-bottom: 20px;
`;
