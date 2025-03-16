import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../redux/apiCalls';

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
    font-size: 24px;
    font-weight: 2000;
    margin-bottom: 40px;
`;

const Form = styled.form`
    width: 100%;
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
    background: linear-gradient(to right, #60d4e6, #d66efd);
    border-radius: 25px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover{
        background-color: #5aacc8;
    }
`;

const FooterBox = styled.span`
    margin-top: 10px;
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

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const {currentUser, isFetching, error} = useSelector(state=>state.user);
  const navigate = useNavigate();

  const handleRegister = (e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
        alert("Password do not match!");
        return;
    }
    dispatch(register({username,email,password}));
  };

  if(currentUser){
    navigate("/");
  }

  return (
    <Container>
        <Wrapper>
            <Title>Create An Account</Title>
            <Form>
                <Box>
                    <PlaceholderText>UserName</PlaceholderText>
                    <Input type='text' onChange={(e)=>setUsername(e.target.value)}/>
                </Box>
                <Box>
                    <PlaceholderText>Email</PlaceholderText>
                    <Input type='text' onChange={(e)=>setEmail(e.target.value)}/>
                </Box>
                <Box>
                    <PlaceholderText>Password</PlaceholderText>
                    <Input type='password' onChange={(e)=>setPassword(e.target.value)}/>
                </Box>
                <Box>
                    <PlaceholderText>Confirm Password</PlaceholderText>
                    <Input type='password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </Box>
                <Button onClick={handleRegister} disabled={isFetching}>Register</Button>
                {error && <Error>Something went wrong!</Error>}
                <FooterBox>
                    <PlaceholderText style={{fontSize: "12px", color:"gray", fontWeight:"500",}}>Already have an account? </PlaceholderText>
                    <Link href='/login'>Login</Link>
                </FooterBox>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register;
