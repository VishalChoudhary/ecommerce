import { Facebook, Home, Instagram, MailOutline, Phone, Pinterest, Twitter } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;

const Left = styled.div`
    flex : 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Description = styled.p`
    margin: 20px 0px;
    color: gray;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex : 1;
    padding: 20px;
`;

const Title = styled.h3`
    margin-bottom: 38px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 20px;
    color: gray;
`;

const Right = styled.div`
    flex : 1;
    padding: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    color: gray;
`;

const Payment = styled.img`
    width: 60%;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>Bbaazar.</Logo>
            <Description>
                If you would like to experience the best of online shopping for men, women and kids in India, 
                you are at the right place. Bbaazar is the ultimate destination for fashion and lifestyle, being host 
                to a wide array of merchandise including clothing, footwear, accessories, personal care products 
                and more. It is time to redefine your style statement with our treasure-trove of trendy items.
            </Description>
            <SocialContainer>
                <SocialIcon color='3B5999'>
                    <Facebook />
                </SocialIcon>
                <SocialIcon color='E4405F'>
                    <Instagram />
                </SocialIcon>
                <SocialIcon color='55ACEE'>
                    <Twitter />
                </SocialIcon>
                <SocialIcon color='E60023'>
                    <Pinterest />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>My Orders</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title> Contact </Title>
            <ContactItem>
                <Home style={{marginRight: "10px"}} />Buildings Alyssa, Varthur Hobli, Bengaluru
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight: "10px"}} />+91-80-01010101
            </ContactItem>
            <ContactItem>
                <MailOutline style={{marginRight: "10px"}} />atheistcoder69@gmail.com
            </ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
    </Container>
  )
}

export default Footer;
