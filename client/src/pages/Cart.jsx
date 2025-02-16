import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Add, Remove } from '@material-ui/icons';

const Container = styled.div`
    /* background-color: #fef9f9;   */
    height: 100vh;
`;

const Wrapper = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    font-weight: 400;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 500;
    border: ${props=>props.type==='filled' && 'none'};
    background-color: ${(props)=>props.type==='filled' ? 'black' : 'transparent'};
    color: ${(props)=>props.type==='filled' && 'white'};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Info = styled.div`
    flex : 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ProductDetail = styled.div`
    flex: 2.5;
    display: flex;
`;

const ProductImage = styled.img`
    width: 200px;
    height: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span`

`;

const ColorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props)=>props.color};
`;

const ProductSize = styled.span`

`;

const PriceDetail = styled.div`
    flex : 1.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    height: 30px;
    width: 30px;
    font-size: 18px;
    margin: 5px 12px;
    padding: 0px 15px;
    border: 1px solid teal;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AmountButtonDesign = styled.div`
    height: 30px;
    width: 30px;
    border: 1px solid teal;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 300;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin: 20px 0px;
`;

const Summary = styled.div`
    flex : 1;
    border: 0.5px solid lightgray;
    border-radius: 20px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 600;
    text-align: center;
    padding: 12px;
`;

const SummaryItem = styled.div`
    margin: 30px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
`;

const Button = styled.button`
    width: 80%;
    padding: 10px;
    background-color: black;
    color: white;
    cursor: pointer;
    font-weight: 1000;
`;

const Cart = () => {
  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>Your Cart</Title>
            <Top>
                <TopButton>Continue Shopping</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Wishlist(0)</TopText>
                </TopTexts>
                <TopButton type='filled'>Place Order</TopButton>
            </Top>
            <Bottom>
                <Info>
                    <Product>
                        <ProductDetail>
                            <ProductImage src="/images/cart/adidas1.jpg"/>
                            <Details>
                                <ProductName>Adidas Mens Runavtaar M Sneaker</ProductName>
                                <ColorContainer>
                                    <span><b>Color</b></span>
                                    <ProductColor color='black'></ProductColor>
                                </ColorContainer>
                                <ProductSize><b>Size</b>  9 UK</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <AmountButtonDesign>
                                    <Add />
                                </AmountButtonDesign>
                                <ProductAmount>2</ProductAmount>
                                <AmountButtonDesign>
                                    <Remove />
                                </AmountButtonDesign>
                            </ProductAmountContainer>
                            <ProductPrice>₹2,500</ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr />
                    <Product>
                        <ProductDetail>
                            <ProductImage src="/images/cart/YUTA.jpg"/>
                            <Details>
                                <ProductName>Yuta JJK Oversized T-Shirt</ProductName>
                                <ColorContainer>
                                    <span><b>Color</b></span>
                                    <ProductColor color='black'></ProductColor>
                                </ColorContainer>
                                <ProductSize><b>Size</b>  L</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <AmountButtonDesign>
                                    <Add />
                                </AmountButtonDesign>
                                <ProductAmount>1</ProductAmount>
                                <AmountButtonDesign>
                                    <Remove />
                                </AmountButtonDesign>
                            </ProductAmountContainer>
                            <ProductPrice>₹3,500</ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                <Summary>
                    <SummaryTitle>Price details</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>₹8,500</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Cost</SummaryItemText>
                        <SummaryItemPrice>₹500</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Discount</SummaryItemText>
                        <SummaryItemPrice>₹500</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type='total'>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>₹8,500</SummaryItemPrice>
                    </SummaryItem>
                    <ButtonBox>
                        <Button>Place Order</Button>
                    </ButtonBox>
                </Summary>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Cart;
