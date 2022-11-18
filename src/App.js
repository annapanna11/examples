import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import AddtoCartFeedback from './components/AddToCartFeedback';
import { API_URL } from './constants';

import { CartContext } from './CartContext';

const StyledHeader = styled.header`
  display: flex;
  padding: 2rem;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  background-color: var(--color-primary);
  color: #fff;
  font-family: Rancho;
  font-size: clamp(1rem, 2.5vw, 2rem);
  background-color: var(--color-primary);
  h1 {
    padding: 0;
    margin: 0;
  }

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

function App() {
  const [products, setProducts] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const { cart, setCart, showFeedback } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      let response = await fetch(API_URL + 'products', { credentials: 'include' });

      if (response.ok) {
        const products = await response.json();
        setProducts(products);
      } else {
        alert(`Cannot communicate with the mocked REST API server (${response.statusText})`);
      }
    };

    const fetchCart = async () => {
      const response = await fetch(API_URL + 'cart', { credentials: 'include' });
      if (response.ok) {
        const cart = await response.json();
        setCart(cart);
      } else {
        alert(`Cannot communicate with the mocked REST API server (${response.statusText})`);
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  const emptyCart = useCallback(async () => {
    alert('empty cart');
    const response = await fetch(API_URL + 'cart', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      const cart = await response.json();
      setCart(cart);
    } else {
      alert(`Cannot communicate with the mocked REST API server (${response.statusText})`);
    }
  }, []);

  const handleShoppingCartKeyDown = (event) => {
    if (event.key === 'Enter') {
      setShowCart(!showCart);
    }
  };

  const showCartAndScrollToTop = () => {
    if (!showCart) document.documentElement.scrollTop = 0;
    setShowCart(!showCart);
  };

  return (
    <div className="App">
      <StyledHeader>
        <h1>Annas e-handel</h1>

        <Badge
          onClick={() => showCartAndScrollToTop()}
          onKeyDown={(event) => handleShoppingCartKeyDown(event)}
          badgeContent={cart?.items.length}
          color="primary"
          role="button"
          aria-label={showCart ? 'Göm varukorgen' : 'Visa varukorgen'}
          title={showCart ? 'Göm varukorgen' : 'Visa varukorgen'}
          tabIndex="0"
        >
          <ShoppingCartOutlinedIcon fontSize="large" />
        </Badge>
      </StyledHeader>

      {showCart && <ShoppingCart showCart={setShowCart} />}
      <ProductList products={products} />

      <AddtoCartFeedback isOpen={showFeedback} />
      <button onClick={() => emptyCart()}>Töm varukorg</button>
    </div>
  );
}

export default App;
