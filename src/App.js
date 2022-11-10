import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import AddtoCartFeedback from './components/AddToCartFeedback';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

const StyledProductsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;

  @media (max-width: 600px) {
    gap: 0.5rem;
    padding: 1rem 0rem;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
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
  const [cart, setCart] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      fetch('http://localhost:8181/products', { credentials: 'include' })
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(`Cannot communicate with the mocked REST API server (${response.statusText})`),
        )
        .then((products) => {
          setProducts(products);
        })
        .catch((error) => {
          alert(error);
        });
    };

    const fetchCart = () => {
      fetch('http://localhost:8181/cart', { credentials: 'include' })
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(`Cannot communicate with the mocked REST API server (${response.statusText})`),
        )
        .then((cart) => {
          setCart(cart);
        })
        .catch((error) => {
          alert(error);
        });
    };

    fetchProducts();
    fetchCart();
  }, []);

  const addItemToCart = (id) => {
    const params = {
      quantity: 1,
    };

    fetch('http://localhost:8181/cart/' + id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(`Cannot communicate with the mocked REST API server (${response.statusText})`),
      )
      .then((cart) => {
        setCart(cart);
        setShowFeedback(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const emptyCart = () => {
    fetch('http://localhost:8181/cart', {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(`Cannot communicate with the mocked REST API server (${response.statusText})`),
      )
      .then((cart) => {
        setCart(null);
        //setCounter(counter + 1);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeItemFromCart = (id) => {
    if (confirm('Är du säker på att du vill ta bort varan från varukorgen?')) {
      const params = {
        quantity: 1,
      };

      fetch('http://localhost:8181/cart/' + id, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then((response) =>
          response.ok
            ? response.json()
            : Promise.reject(`Cannot communicate with the mocked REST API server (${response.statusText})`),
        )
        .then((cart) => {
          setCart(cart);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const changeQuantityOfItem = (id, quantity) => {
    const params = {
      quantity: quantity,
    };

    fetch('http://localhost:8181/cart/' + id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(`Cannot communicate with the mocked REST API server (${response.statusText})`),
      )
      .then((cart) => {
        setCart(cart);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handelShoppingCartKeyDown = (event) => {
    if (event.key === 'Enter') {
      setShowCart(!showCart);
    }
  };

  const noOfItems = cart ? cart.items.length : 0;

  return (
    <div className="App">
      <StyledHeader>
        <h1>Annas e-handel</h1>

        <Badge
          onClick={() => setShowCart(!showCart)}
          onKeyDown={(event) => handelShoppingCartKeyDown(event)}
          badgeContent={cart?.items.length}
          color="primary"
          role="button"
          aria-label={showCart ? 'Göm varukorgen' : 'Visa varukorgen'}
          title={showCart ? 'Göm varukorgen' : 'Visa varukorgen'}
          tabIndex="0"
          data-testid="noOfItems"
        >
          <ShoppingCartOutlinedIcon fontSize="large" />
        </Badge>
      </StyledHeader>

      {cart && showCart && (
        <ShoppingCart
          cart={cart}
          addItemToCart={addItemToCart}
          removeItemFromCart={removeItemFromCart}
          changeQuantityOfItem={changeQuantityOfItem}
        />
      )}
      <StyledProductsArea>
        {products?.map((product) => {
          return <ProductCard key={product.id} product={product} addItemToCart={addItemToCart}></ProductCard>;
        })}
      </StyledProductsArea>
      <AddtoCartFeedback isOpen={showFeedback} setShowFeedback={setShowFeedback} />
      <button onClick={() => emptyCart()}>Töm varukorg</button>
    </div>
  );
}

export default App;
