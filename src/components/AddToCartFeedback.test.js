import React from 'react';
import { render } from '@testing-library/react';
import AddToCartFeedback from './AddToCartFeedback';
import { CartContext } from '../CartContext';

describe('AddToCartFeedback functions', () => {
  test('renders AddToCartFeedback component', () => {
    const setShowFeedback = () => {};
    render(
      <CartContext.Provider value={setShowFeedback}>
        <AddToCartFeedback />
      </CartContext.Provider>,
    );
  });
});
