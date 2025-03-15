import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Add, Remove } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeFromCart } from '../redux/cartRedux';
import { Link } from 'react-router-dom';

const Container = styled.div`
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
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
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
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
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

const ProductName = styled.span``;

const ColorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1.5;
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
    cursor: pointer;
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
    flex: 1;
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
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
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
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleIncrease = (product) => {
        dispatch(addProduct({ ...product, quantity: 1 }));
    };

    const handleDecrease = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const shippingCost = cart.products.length > 0 && cart.total < 500 ? 30 : 0;
    const discount = cart.total >= 2499 ? cart.total * 0.15 : 0;

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                    <Link to='/'>
                        <TopButton>Continue Shopping</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag ({cart.products.length})</TopText>
                        <TopText>Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type='filled'>Place Order</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product key={product._id}>
                                <ProductDetail>
                                    <ProductImage src={product.img} />
                                    <Details>
                                        <ProductName>{product.title}</ProductName>
                                        <ColorContainer>
                                            <span><b>Color</b></span>
                                            <ProductColor color={product.color}></ProductColor>
                                        </ColorContainer>
                                        <ProductSize><b>Size </b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <AmountButtonDesign onClick={() => handleIncrease(product)}>
                                            <Add />
                                        </AmountButtonDesign>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <AmountButtonDesign onClick={() => handleDecrease(product._id)}>
                                            <Remove />
                                        </AmountButtonDesign>
                                    </ProductAmountContainer>
                                    <ProductPrice>${product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>Price Details</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>${cart.products.length > 0 ? cart.total : 0}</SummaryItemPrice> {/* ✅ Prevents incorrect total */}
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Cost</SummaryItemText>
                            <SummaryItemPrice>
                                {cart.total < 500 ? `$${shippingCost}` : "Free"}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                        <SummaryItemText>Discount</SummaryItemText>
                            <SummaryItemPrice>
                                {discount > 0 ? `- $${discount.toFixed(2)}` : "$0"}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>
                                ${cart.products.length > 0 ? (cart.total - discount + (cart.total < 500 ? 30 : 0)).toFixed(2) : 0}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <ButtonBox>
                            <Button disabled={cart.total === 0}>Place Order</Button>
                        </ButtonBox>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    );
};

export default Cart;