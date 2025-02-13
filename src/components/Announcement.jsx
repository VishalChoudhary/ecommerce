import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
`;

const Announcement = () => {
  return (
    <Container>
        Get Upto 30% off on cart value of ₹1199 and above. 
    </Container>
  )
}

export default Announcement;
