import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { Add, Remove } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeFromCart } from '../redux/cartRedux';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51QxTpuRtRBgZfbyUq2OQeVnB3PzA4CqEaMiLEg6ix5YtgmW9dVKMIcT9iCawEC340kROOiSANr6dav5lnpA1hNBQ00Zgf9M9o8");

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background: white;
    width: 100%;
    max-width: 400px;
`;

const StyledCardElement = styled(CardElement)`
    padding: 12px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    background: #f8f8f8;
    transition: border 0.3s ease-in-out;

    &:focus {
        border: 1px solid black;
    }
`;

const PayButton = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background: gray;
        cursor: not-allowed;
    }
`;

const CheckoutForm = ({ total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error.message);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/checkout/payment", {
                amount: Math.round(total * 100), // Convert to cents
                paymentMethodId: paymentMethod.id,
            });

            if (response.data.success) {
                navigate("/success");
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Error processing payment.");
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledCardElement options={{ hidePostalCode: true }} />
            <PayButton type="submit" disabled={!stripe}>Pay ${total.toFixed(2)}</PayButton>
        </StyledForm>
    );
};

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

// const Hr = styled.hr`
//     background-color: #eee;
//     border: none;
//     height: 1px;
//     margin: 20px 0px;
// `;

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
    const [checkout, setCheckout] = React.useState(false);

    const handleIncrease = (product) => {
        dispatch(addProduct({ ...product, quantity: 1 }));
    };

    const handleDecrease = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const shippingCost = cart.products.length > 0 && cart.total < 500 ? 30 : 0;
    const discount = cart.total >= 2499 ? cart.total * 0.15 : 0;
    const total = cart.products.length > 0 ? cart.total - discount + shippingCost : 0;

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
                    </Info>
                    <Summary>
                        <SummaryTitle>Price Details</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Cost</SummaryItemText>
                            <SummaryItemPrice>{shippingCost > 0 ? `$${shippingCost}` : "Free"}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Discount</SummaryItemText>
                            <SummaryItemPrice>{discount > 0 ? `-$${discount.toFixed(2)}` : "$0"}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>${total.toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>
                        <ButtonBox>
                            {checkout ? (
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm total={total} />
                                </Elements>
                            ) : (
                                <Button disabled={total === 0} onClick={() => setCheckout(true)}>Place Order</Button>
                            )}
                        </ButtonBox>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    );
};

export default Cart;