import { useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  align-items: center;
  box-sizing: border-box;
`;
const NavLi = styled.ul`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;
const Menu = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  a {
    text-decoration: none;
    color: black;
  }
`;
const NavLinkStyled = styled(NavLink)`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    border-bottom: 2px solid black;
  }
`;
function NavBar() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Header sx={{ width: "100%", bgcolor: "background.paper" }}>
      <img
        src="/UniCircle_Logo.png"
        alt="UniCircle-Logo"
        style={{ width: "50px" }}
      ></img>
      <NavLi>
        <Menu>
          <NavLinkStyled to="/home" end>Home</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/home/profile">Profile</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/home/discussion">Discussion</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/home/clubs">Clubs</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/home/friends">Friends</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/home/appointment">Appointment</NavLinkStyled>
        </Menu>
      </NavLi>
      <FontAwesomeIcon icon={faBars} size="2x" style={{ color: "black" }} />
    </Header>
  );
}
export default NavBar;
