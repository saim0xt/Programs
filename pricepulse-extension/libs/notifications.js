export async function sendPriceDropNotification(item) {
  const title = `${item.title} price alert`;
  const message = item.notificationType === 'targetPrice'
    ? `Your target price ${item.currency}${item.targetPrice} was reached.`
    : `${item.currency}${Math.abs(item.priceChange).toFixed(2)} drop detected. Current price: ${item.currency}${item.currentPrice}.`;

  await chrome.notifications.create(`pricepulse-${item.id}`, {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title,
    message,
    priority: 2,
    buttons: [{ title: 'Open Product' }],
  }, () => {});
}
