import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Add, Remove, ShoppingCart } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { publicRequest } from "../requestMethod";
import { addProduct } from '../redux/cartReducer';
import { useDispatch } from 'react-redux';

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;

const ImageContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    max-height: 85vh;
    object-fit: contain;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`;

const Title = styled.h1`
    font-weight: 400;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 300;
    font-size: 30px;
`;

const FilterContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 300;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: 1.5px solid teal;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-weight: 1000;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #1c6e6e;
    }
`;

const Product = () => {
    const location = useLocation();
    //fetch product using id
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    // eslint-disable-next-line
    const [color, setColor] = useState("");
    // eslint-disable-next-line
    const [size, setSize] = useState("");
    //dispatch hook
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        getProduct();
    }, [id]);

    // Handle loading state
    if (!product) {
        return <h2>Loading product...</h2>;
    }

    const handleQuantity =(type) =>{
        if(type === "dec"){
           quantity>1 && setQuantity(quantity-1);
        }else{
            setQuantity(quantity+1);
        }
    };

    const handleClick = () =>{
        dispatch(addProduct({
            ...product,
            quantity,
            color,
            size,
        }));
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    <Image src={product?.img || "Product"} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product?.title || "No Title Available"}</Title>
                    <Description>{product?.desc || "No description available."}</Description>
                    <Price>{product?.price ? `$ ${product.price}` : "Price not available"}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {Array.isArray(product?.color) ? (
                                product.color.map((c) => (
                                    <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>
                                ))
                            ) : (
                                <span>No colors available</span>
                            )}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e)=>setSize(e.target.value)}>
                                {Array.isArray(product?.size) ? (
                                    product.size.map((s) => (
                                        <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                    ))
                                ) : (
                                    <FilterSizeOption>No sizes available</FilterSizeOption>
                                )}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQuantity("dec")}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>
                            <ShoppingCart style={{marginRight: "5px"}}/>
                            ADD TO CART
                        </Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
