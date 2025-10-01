import styled from "styled-components";

export const BackButton = styled.button`
  margin-bottom: 16px;
  padding: 6px 12px;
  background: #ddd;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #bbb;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: none;
  border-radius: 8px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

export const SaveButtonProfile = styled.button`
  width: 50px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 8px;
  border: none;
  margin-right: 14px;
`;

export const EditBtn = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;
