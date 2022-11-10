export const getPrice = (prices) => {
  const sekPrice = prices?.find((price) => {
    return price.currency === 'SEK';
  });

  if (sekPrice) return <span>{`${Math.round(sekPrice.amount)} kr`}</span>;

  return <span>Inget pris tillgängligt</span>;
};
