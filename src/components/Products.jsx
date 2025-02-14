import React from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data';
import SingleProduct from './SingleProduct';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Products = () => {
  return (
    <Container>
        {popularProducts.map((item)=>(
            <SingleProduct item={item} key={item.key}/>
        ))}
    </Container>
  );
}

export default Products;
