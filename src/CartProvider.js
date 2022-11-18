import { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const addItemToCart = async (id) => {
    const params = {
      quantity: 1,
    };

    const response = await fetch('http://localhost:8181/cart/' + id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    });
    if (response.ok) {
      const cart = await response.json();
      setCart(cart);
      setShowFeedback(true);
    } else {
      alert(`Cannot communicate with the mocked REST API server (${response.statusText})`);
    }
  };

  const removeItemFromCart = async (id) => {
    if (confirm('Är du säker på att du vill ta bort varan från varukorgen?')) {
      const params = {
        quantity: 1,
      };

      const response = await fetch('http://localhost:8181/cart/' + id, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        const cart = await response.json();
        setCart(cart);
      } else {
        alert(`Cannot communicate with the mocked REST API server (${response.statusText})`);
      }
    }
  };

  const changeQuantityOfItem = async (id, quantity) => {
    if (quantity === 0) {
      removeItemFromCart(id);
      return;
    }

    const response = await fetch(
      'http://localhost:8181/cart/' +
        id +
        '?' +
        new URLSearchParams({
          quantity: quantity,
        }),
      {
        method: 'PUT',
        credentials: 'include',
      },
    );

    if (response.ok) {
      const cart = await response.json();
      setCart(cart);
    } else {
      alert(`Cannot communicate with the mocked REST API server (${response.statusText})`);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, showFeedback, setShowFeedback, addItemToCart, removeItemFromCart, changeQuantityOfItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
