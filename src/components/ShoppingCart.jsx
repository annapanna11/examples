import { useContext } from 'react';
import styled from 'styled-components';
import { getPrice } from '../utils';
import { CartContext } from '../CartContext';
import { IMG_BASE_URL } from '../constants';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const StyledShoppingCartContainer = styled.div`
  max-width: 800px;
  margin: 20px auto 0;
  border: solid 1px #efefef;
  background-color: #fff;
  border-radius: 3px;
  padding-bottom: 20px;
  position: relative;
  h2 {
    text-align: center;
  }
`;

const StyledShoppingCart = styled.table`
  width: 100%;

  tr td:last-child {
    text-align: right;
  }

  td {
    padding: 10px;
    text-align: left;
    border-bottom: solid 2px #f7f7f7;

    input {
      width: 20px;
      text-align: center;
    }
  }
  img {
    max-width: 100px;
    max-height: 75px;
  }

  h5 {
    text-align: left;
  }

  @media (max-width: 600px) {
    td {
      text-align: center !important;
      border-bottom: 0;
    }

    tr {
      display: flex;
      flex-direction: column;

      td:last-child {
        text-align: right;
        border-bottom: solid 2px #ccc;
      }
    }
  }
`;

const StyledShoppingCartTotal = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledChangeQuantityButton = styled.button`
  background-color: transparent;
  border: 0;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 2rem;
    width: 50px;
  }
`;

const StyledChangeQuantityText = styled.input`
  height: 25px;
  width: 25px;
  border: solid 1px #ccc;

  @media (max-width: 600px) {
    width: 50px;
  }
`;

const StyledEmptyCart = styled.div`
  text-align: center;
`;

const StyledCloseCart = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ShoppingCart = ({ showCart }) => {
  const { cart, removeItemFromCart, changeQuantityOfItem } = useContext(CartContext);

  return (
    <StyledShoppingCartContainer>
      <StyledCloseCart>
        <IconButton aria-label="Stäng varukorgen" title="Stäng varukorgen." onClick={() => showCart(false)}>
          <CloseIcon />
        </IconButton>
      </StyledCloseCart>
      <h2>Varukorg</h2>
      {cart?.items.length > 0 && (
        <StyledShoppingCart>
          <tbody>
            {cart?.items.map((item) => {
              return (
                <tr key={item.product.id}>
                  <td>
                    <img
                      src={IMG_BASE_URL + item.product.imageUrl}
                      alt={item.product.title}
                      title={item.product.title}
                    />
                  </td>
                  <td>
                    {item.product.title}
                    <br />
                    {getPrice(item.product.prices)}
                  </td>
                  <td>
                    <StyledChangeQuantityButton
                      title="Minska antal"
                      aria-label="Minska antal"
                      onClick={() => changeQuantityOfItem(item.product.id, Number(item.quantity) - 1)}
                    >
                      {' '}
                      -{' '}
                    </StyledChangeQuantityButton>
                    <StyledChangeQuantityText type="text" disabled value={item.quantity} />

                    <StyledChangeQuantityButton
                      title="Öka antal"
                      aria-label="Öka antal"
                      onClick={() => changeQuantityOfItem(item.product.id, Number(item.quantity) + 1)}
                    >
                      {' '}
                      +{' '}
                    </StyledChangeQuantityButton>

                    <IconButton
                      aria-label="Ta bort produkten från varukorgen."
                      title="Ta bort produkten från varukorgen."
                      onClick={() => removeItemFromCart(item.product.id)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="3">
                <StyledShoppingCartTotal>Total:&nbsp; {getPrice(cart.summery)}</StyledShoppingCartTotal>
              </td>
            </tr>
          </tbody>
        </StyledShoppingCart>
      )}
      <EmptyCartMessage cart={cart} />
    </StyledShoppingCartContainer>
  );
};

const EmptyCartMessage = ({ cart }) => {
  return !cart || cart?.items?.length === 0 ? <StyledEmptyCart>Din varukorg är tom.</StyledEmptyCart> : <></>;
};

export default ShoppingCart;
