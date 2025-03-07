import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import styled from 'styled-components';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const Container = styled.div``;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`;

const Select = styled.select`
    padding: 5px;
    margin-right: 20px;
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  //fetch categories using category var
  const category = location.pathname.split("/")[2];  

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) =>{
    const value = e.target.value;
    setFilters({
        ...filters,
        [e.target.name] : value,
    })
  };

  const handleSort = (e) =>{
    setSort(e.target.value)
  }

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Title>{category}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>
                <Select name='color' onChange={handleFilters}>
                    <Option disabled>Color</Option>
                    <Option>white</Option>
                    <Option>grey</Option>
                    <Option>beige</Option>
                    <Option>red</Option>
                    <Option>pink</Option>
                    <Option>yellow</Option>
                    <Option>green</Option>
                </Select>
                <Select name='size' onChange={handleFilters}>
                    <Option disabled>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={handleSort}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (Low to High)</Option>
                    <Option value="desc">Price (High to Low)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products category={category} filters={filters} sort={sort} />
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default ProductList;