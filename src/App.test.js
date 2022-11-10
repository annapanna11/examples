import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';

import App from './App';

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

const mockedProducts = [mockedProduct1, mockedProduct2];
const mockedProducts2 = [mockedProduct2];

const mockedShoppingCart = {
  items: [
    { product: mockedProduct1, quantity: 2 },
    { product: mockedProduct2, quantity: 1 },
  ],
  summary: [
    { amount: 653.68, currency: 'SEK' },
    { amount: 81.71, currency: 'EUR' },
  ],
};

const mockedShoppingCart2 = {
  items: [{ product: mockedProduct2, quantity: 1 }],
  summary: [
    { amount: 653.68, currency: 'SEK' },
    { amount: 81.71, currency: 'EUR' },
  ],
};

describe('App', () => {
  test('show product card', async () => {
    const jsdomAlert = window.alert; // remember the jsdom alert
    window.alert = () => {}; // provide an empty implementation for window.alert

    fetch.mockResponseOnce(JSON.stringify(mockedProducts2)).mockResponseOnce(JSON.stringify(mockedShoppingCart2));

    await waitFor(() =>
      act(() => {
        render(<App />);
      }),
    );

    expect(screen.getByText(/Köp/)).toBeInTheDocument();
  });

  test('show right amount in shopping cart', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockedProducts)).mockResponseOnce(JSON.stringify(mockedShoppingCart));

    await waitFor(() =>
      act(() => {
        render(<App />);
      }),
    );

    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
