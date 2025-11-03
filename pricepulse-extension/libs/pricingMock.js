export function generateMockPriceHistory(item) {
  const points = [];
  const base = item.currentPrice || item.initialPrice || 100;
  const now = Date.now();
  for (let i = 12; i >= 0; i--) {
    const time = now - i * 24 * 60 * 60 * 1000;
    const price = base + Math.sin(i / 2) * 5 + (Math.random() - 0.5) * 4;
    points.push({ time, price: parseFloat(price.toFixed(2)) });
  }
  return points;
}
