import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux"; // Import logout action

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.3px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  width: 150px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.products.length);

  // Toggle dropdown menu
  const toggleDropDown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>Bbazzar.</Logo>
          </StyledLink>
        </Center>
        <Right>
          {currentUser ? (
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <MenuItem onClick={toggleDropDown}>
                {currentUser.username} ▼
              </MenuItem>
              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItem>👤 {currentUser.username}</DropdownItem>
                  <DropdownItem>📧 {currentUser.email}</DropdownItem>
                  <DropdownItem onClick={handleLogout}>🚪 Logout</DropdownItem>
                </DropdownMenu>
              )}
            </div>
          ) : (
            <>
              <StyledLink to="/login">
                <MenuItem>Login</MenuItem>
              </StyledLink>
              <StyledLink to="/register">
                <MenuItem>Register</MenuItem>
              </StyledLink>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;