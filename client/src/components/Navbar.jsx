import styled from "styled-components";
import React from 'react'
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height : 60px;
`;

const Wrapper = styled.div`
  padding : 10px 20px;
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

const SearchContainer = styled.div `
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
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color: inherit;
  }
`;

const Navbar = () => {
  //useSelector to read the state of quantity
  const quantity = useSelector(state=>state.cart)
  // console.log(quantity);
  return (
    <Container>
        <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <Search style={{color: "gray", fontSize:16}}/>
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to='/'>
            <Logo>Bbazzar.</Logo>
          </StyledLink>
        </Center>
        <Right>
          <StyledLink to='/login'>
            <MenuItem>Login</MenuItem>
          </StyledLink>
          <StyledLink to='/register'>
            <MenuItem>Register</MenuItem>
          </StyledLink>
          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity.products.length} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar;
