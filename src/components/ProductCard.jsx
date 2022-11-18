import { useContext } from 'react';
import styled from 'styled-components';
import { IMG_BASE_URL } from '../constants';
import { getPrice } from '../utils';
import { CartContext } from '../CartContext';

const StyledProductCard = styled.article`
  border: solid 1px #efefef;
  background-color: #fff;
  padding: 10px;
  display: grid;
  row-gap: 10px;
  grid-template-rows: 1fr 1fr 0, 5fr;

  img {
    max-height: 100px;
  }
`;

const StyledProductCardImgContainer = styled.div`
  height: 120px;
  text-align: center;

  img {
    max-height: 100px;
  }
`;

const StyledProductCardInfo = styled.div`
  text-align: center;
  vertical-align: top;
  height: 120px;

  h2 {
    padding: 0;
    font-size: 1rem;
  }
`;

const StyledProductCardFooter = styled.div`
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`;

const StyledAddToCartButton = styled.button`
  color: #000;
  padding: 10px;
  border: #000;
  border-radius: 30px;
  min-width: 100px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary);
    color: #fff;
  }
`;

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <StyledProductCard role="listitem">
      <StyledProductCardImgContainer>
        <img src={IMG_BASE_URL + product.imageUrl} alt={product.title} title={product.title} />
      </StyledProductCardImgContainer>
      <StyledProductCardInfo>
        <h2>{product.title}</h2>

        <div>{getPrice(product.prices)}</div>
      </StyledProductCardInfo>
      <StyledProductCardFooter>
        <StyledAddToCartButton onClick={() => addItemToCart(product.id)}>Köp</StyledAddToCartButton>
      </StyledProductCardFooter>
    </StyledProductCard>
  );
};

export default ProductCard;
