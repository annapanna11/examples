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
