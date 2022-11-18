import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartContext } from '../CartContext';
import ProductList from './ProductList';

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

const mockedProduct2 = {
  id: 22565423421,
  title: 'SV Keyboard E90',
  imageUrl: '/images/22565423421.png',
  url: '/products/22565423421',
  prices: [
    {
      amount: 333.84,
      currency: 'SEK',
    },
    {
      amount: 41.73,
      currency: 'EUR',
    },
  ],
};

const mockedProductList = [mockedProduct1, mockedProduct2];

describe('ProductList', () => {
  test('renders ProductList component', () => {
    const addItemToCart = () => {};
    render(
      <CartContext.Provider value={addItemToCart}>
        <ProductList products={mockedProductList} />
      </CartContext.Provider>,
    );
  });

  test('renders ProductList renders right amount of productcards', () => {
    const addItemToCart = () => {};
    render(
      <CartContext.Provider value={addItemToCart}>
        <ProductList products={mockedProductList} />
        );
      </CartContext.Provider>,
    );

    screen.debug();
    const products = screen.getAllByRole('listitem');
    expect(products).toHaveLength(2);
  });
});
