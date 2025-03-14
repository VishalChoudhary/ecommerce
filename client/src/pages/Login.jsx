import React, { useState } from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../redux/apiCalls';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(rgba(255, 255, 255, 0.205),rgba(255, 255, 255, 0.271)),
    url("/images/signupbg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    min-height: 80%;
    padding: 20px;
    background-color: white;
    border-radius: 10px; /* Slightly rounded edges */
    
    /* Centering */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-family: 'Belleza', sans-serif;
    font-size: 30px;
    font-weight: 2000;
    margin-bottom: 40px;
`;

const Form = styled.form`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
`;

const Input = styled.input`
    flex: 1;
    height: 40%;
    width: 100%;
    margin-top: 1px;
    padding: 8px 0px;
    border-radius: 1px solid #cccc;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
`;

const Box = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;
const PlaceholderText = styled.span`
    font-size: 10px;
    color: #383535;
`;

const Button = styled.button`
    width: 50%;
    border: none;
    padding: 15px 20px;
    margin-top: 40px;
    font-size: 15px;
    background: linear-gradient(to right, #60d4e6, #d66efd);
    border-radius: 25px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    &:hover{
        background-color: #5aacc8;
    }
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;

const FooterBox = styled.span`
    margin-top: 80px;
    font-size: 12px;
    color: #383535;
`;

const Link = styled.a`
    text-decoration: underline;
    cursor: pointer;
    font-size: 12px;
    color: gray;
    font-weight: bolder;
`;

const Error = styled.span`
    margin-top: 10px;
    color: red;
`;

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching,error} = useSelector(state=>state.user);
  
  const handleClick = (e) =>{
    e.preventDefault();
    dispatch(login({username,password}));
  }

  return (
    <Container>
        <Wrapper>
            <Title>Login</Title>
            <Form>
                <Box>
                    <Input 
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => setUserName(e.target.value)} 
                    />
                </Box>
                <Box>
                    <Input 
                    type='password'
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </Box>
                <Button onClick={handleClick} disabled={isFetching}>Login</Button>
                {error && <Error>Something went wrong!</Error>}
                <FooterBox>
                <Link>
                    <PlaceholderText style={{fontSize: "12px", color:"gray", fontWeight:"500",}}>Don’t you have an account? </PlaceholderText>
                </Link>
                <Link>Register</Link>
                </FooterBox>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login;