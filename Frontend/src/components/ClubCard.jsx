import React from "react";
import styled from "styled-components";
import img from "../assets/example.png"
import { Link } from "react-router-dom";

const Card = styled.div`
  width: 280px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const CardImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin: 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Members = styled.div`
  font-size: 12px;
  color: #888;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  margin: 10px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const ClubCard = ({ name, description, members }) => {
  return (
    <Card>
      <CardImg src={img} />
      <CardContent>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Members>Members: {members}</Members>
      </CardContent>
      <Link to={`/main/clubs/id`}>
        <Button>Join</Button>
      </Link>

    </Card>
  );
};

export default ClubCard;