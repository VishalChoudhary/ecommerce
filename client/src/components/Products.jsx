import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SingleProduct from './SingleProduct';
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Products = ({category,filters,sort}) => {
  
  const [products, setProducts] = useState([]);
  //updating filteredProducts on changing filters.
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async () =>{
      try{
        const res = await axios.get(
          category 
            ? `http://localhost:5000/api/products?category=${category}` 
            : "http://localhost:5000/api/products"  );
        setProducts(res.data);
      }catch(err){}
    };
    getProducts();
  },[category]);

  useEffect(()=>{
    if(category){
      setFilteredProducts(
        products.filter((item)=> Object.entries(filters).every(([key,value])=>
          item[key].includes(value)
          )
        )
      )
    }
  },[products,category,filters]);

  useEffect(()=>{
    if(sort === "newest"){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
    else if(sort === "asc"){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.price - b.price)
      );
    }
    else{
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>b.price - a.price)
      );
    }
  },[sort]);
  
  return (
    <Container>
        {category ? filteredProducts.map((item)=>(
            <SingleProduct item={item} key={item.key}/>
        )) : products
              .slice(0,8)
              .map((item)=>(
              <SingleProduct item={item} key={item.key}/>
        ))
      }
    </Container>
  );
}

export default Products;
