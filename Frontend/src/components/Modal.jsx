import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex; justify-content: center; align-items: center;
`;

const Box = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
`;

export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <Backdrop onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        {children}
      </Box>
    </Backdrop>
  );
}
