import { generateMockPriceHistory } from './pricingMock.js';

export async function fetchPriceDataForItems(items) {
  // Placeholder for real API integration.
  const updated = await Promise.all(items.map(async (item) => {
    const history = await fetchPriceHistory(item);
    const current = history[history.length - 1];
    const previous = history[history.length - 2] || current;
    return {
      ...item,
      history,
      currentPrice: current.price,
      priceChange: current.price - previous.price
    };
  }));
  return updated;
}

export async function fetchPriceHistory(item) {
  if (item.mock) {
    return generateMockPriceHistory(item);
  }
  // TODO: call real API for price history.
  return generateMockPriceHistory(item);
}
