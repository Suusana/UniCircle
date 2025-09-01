import { useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
    <Header style={{ width: "100%", bgcolor: "background.paper" }}>
      <img
        src="/UniCircle_Logo.png"
        alt="UniCircle-Logo"
        style={{ width: "50px" }}
      />

      <NavLi>
        <Menu>
          <NavLinkStyled to="/main/home" end>
            Home
          </NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/main/discussion">Forum</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/main/clubs">Clubs</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/main/friends">Friends</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/main/appointment">Appointment</NavLinkStyled>
        </Menu>
        <Menu>
          <NavLinkStyled to="/main/review">Review</NavLinkStyled>
        </Menu>
      </NavLi>

      {/*Logout Button*/}
      <NavLink to="/" title="Logout">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size="2x"
          style={{ color: "black", cursor: "pointer" }}
        />
      </NavLink>
    </Header>
  );
}

export default NavBar;
