import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartContext } from '../CartContext';
import ProductCard from './ProductCard';

const mockedProduct1 = {
  id: 22565423428,
  title: 'SV 8GB USB Flash Memory E100',
  imageUrl: '/images/22565423428.png',
  url: '/products/22565423428',
  prices: [
    {
      amount: 159.92,
      currency: 'SEK',
    },
    {
      amount: 19.99,
      currency: 'EUR',
    },
  ],
};

describe('ProductCard', () => {
  test('renders ProductCard component', () => {
    const addItemToCart = () => {};
    render(
      <CartContext.Provider value={addItemToCart}>
        <ProductCard product={mockedProduct1} />
      </CartContext.Provider>,
    );
    screen.debug();
    const product = screen.getByRole('listitem');
    expect(product).toBeInTheDocument();
  });
});
