import styled, { css } from "styled-components";


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

//card container
export const Card = styled.article`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 14px 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

//avatar circle
export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #e6eeff, #f6f9ff);
  display: grid;
  place-items: center;
  color: #1c64f2;
  font-weight: 700;
  font-size: 16px;
`;

//name text
export const Name = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
  text-align: center;
`;

export const Meta = styled.div`
  color: #6b7280;
  font-size: 12px;
  text-align: center;
`;

// star rating component
export const StarsWrap = styled.div`
  display: inline-flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
`;

const starCss = css`
  width: 14px;
  height: 14px;
  display: inline-block;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z"/></svg>') no-repeat center / contain;
  background: #e2e8f0;
`;

export const Star = styled.i`
  ${starCss}
  ${({ $filled }) =>
    $filled &&
    css`
      background: #f59e0b;
    `}
`;

export const StarRating = ({ value = 0 }) => (
  <StarsWrap>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} $filled={n <= value} />
    ))}
  </StarsWrap>
);

// button row
export const ButtonRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
`;

// generic button
export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "primary",
})`
  height: 28px;
  border-radius: 8px;
  padding: 0 8px;
  border: 1px solid #e5e7eb;
  background: ${({ primary }) => (primary ? "#0b0f17" : "#fff")};
  color: ${({ primary }) => (primary ? "#fff" : "#0b0f17")};
  font-weight: 600;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;
