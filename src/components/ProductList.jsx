import React from 'react';
import ProductCard from './ProductCard';
import styled from 'styled-components';

const StyledProductsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;

  @media (max-width: 600px) {
    gap: 0.5rem;
    padding: 1rem 0rem;
  }
`;

const ProductList = ({ products }) => {
  return (
    <StyledProductsArea role="list">
      {products?.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </StyledProductsArea>
  );
};
export default React.memo(ProductList);
