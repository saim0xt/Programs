// PricePulse Background Service Worker
import { Storage } from '../utils/storage.js';

// Initialize extension
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // First time install - show onboarding
    await chrome.tabs.create({
      url: chrome.runtime.getURL('src/onboarding/onboarding.html')
    });

    // Set default settings
    await Storage.saveSettings({
      notifications: true,
      checkInterval: 6,
      priceDropThreshold: 5,
      currency: 'USD',
      theme: 'light',
      autoTrack: false
    });
  }

  // Set up periodic price checks
  setupAlarms();
});

// Set up alarms for price checking
async function setupAlarms() {
  const settings = await Storage.getSettings();
  const intervalInMinutes = settings.checkInterval * 60;

  // Clear existing alarms
  await chrome.alarms.clear('priceCheck');

  // Create new alarm
  chrome.alarms.create('priceCheck', {
    periodInMinutes: intervalInMinutes,
    delayInMinutes: 1
  });
}

// Handle alarm triggers
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'priceCheck') {
    await checkAllPrices();
  }
});

// Check prices for all tracked products
async function checkAllPrices() {
  const products = await Storage.getProducts();
  const settings = await Storage.getSettings();

  for (const product of products) {
    try {
      const newPrice = await fetchCurrentPrice(product.url);

      if (newPrice && newPrice !== product.currentPrice) {
        // Update product with new price
        const previousPrice = product.currentPrice;
        product.currentPrice = newPrice;
        product.lastChecked = Date.now();

        // Calculate price change
        const priceChange = previousPrice - newPrice;
        const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);

        // Add to price history
        await Storage.addPriceToHistory(product.id, newPrice);

        // Update product
        await Storage.saveProduct(product);

        // Check if we should notify
        if (settings.notifications) {
          // Price dropped
          if (priceChange > 0 && Math.abs(percentChange) >= settings.priceDropThreshold) {
            sendNotification(product, 'drop', percentChange);
          }

          // Target price reached
          if (product.targetPrice && newPrice <= product.targetPrice) {
            sendNotification(product, 'target', null);
          }
        }
      }
    } catch (error) {
      console.error(`Error checking price for ${product.title}:`, error);
    }
  }
}

// Fetch current price for a product
async function fetchCurrentPrice(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Parse HTML and extract price
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Use the price extractor
    const { extractProductData } = await import('../utils/price-extractor.js');
    const data = extractProductData(url, doc);

    return data.price;
  } catch (error) {
    console.error('Error fetching price:', error);
    return null;
  }
}

// Send notification to user
function sendNotification(product, type, percentChange) {
  let title, message;

  if (type === 'drop') {
    title = '🎉 Price Drop Alert!';
    message = `${product.title} is now ${Math.abs(percentChange)}% cheaper!`;
  } else if (type === 'target') {
    title = '🎯 Target Price Reached!';
    message = `${product.title} has reached your target price!`;
  }

  chrome.notifications.create({
    type: 'basic',
    iconUrl: product.image || chrome.runtime.getURL('assets/icons/icon128.png'),
    title: title,
    message: message,
    priority: 2,
    buttons: [
      { title: 'View Product' },
      { title: 'Dismiss' }
    ]
  });

  // Store notification data for click handling
  chrome.storage.local.set({
    [`notification_${product.id}`]: {
      url: product.url,
      timestamp: Date.now()
    }
  });
}

// Handle notification clicks
chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    // View Product button clicked
    const productId = notificationId.replace('notification_', '');
    const data = await Storage.get([`notification_${productId}`]);
    const notification = data[`notification_${productId}`];

    if (notification) {
      chrome.tabs.create({ url: notification.url });
    }
  }

  chrome.notifications.clear(notificationId);
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      if (request.action === 'trackProduct') {
        const product = {
          id: generateId(),
          title: request.data.title,
          url: request.data.url,
          image: request.data.image,
          currentPrice: request.data.price,
          currency: request.data.currency,
          initialPrice: request.data.price,
          targetPrice: null,
          dateAdded: Date.now(),
          lastChecked: Date.now(),
          site: new URL(request.data.url).hostname
        };

        await Storage.saveProduct(product);
        await Storage.addPriceToHistory(product.id, product.currentPrice);

        sendResponse({ success: true, product });
      } else if (request.action === 'getProducts') {
        const products = await Storage.getProducts();
        sendResponse({ success: true, products });
      } else if (request.action === 'deleteProduct') {
        await Storage.deleteProduct(request.productId);
        sendResponse({ success: true });
      } else if (request.action === 'updateProduct') {
        await Storage.saveProduct(request.product);
        sendResponse({ success: true });
      } else if (request.action === 'getPriceHistory') {
        const history = await Storage.getPriceHistory(request.productId);
        sendResponse({ success: true, history });
      } else if (request.action === 'checkPriceNow') {
        await checkAllPrices();
        sendResponse({ success: true });
      } else if (request.action === 'getSettings') {
        const settings = await Storage.getSettings();
        sendResponse({ success: true, settings });
      } else if (request.action === 'updateSettings') {
        await Storage.saveSettings(request.settings);
        await setupAlarms();
        sendResponse({ success: true });
      }
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  })();

  return true; // Keep the message channel open for async response
});

// Generate unique ID
function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Badge update to show tracked items count
async function updateBadge() {
  const products = await Storage.getProducts();
  const count = products.length;

  if (count > 0) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#6366f1' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// Update badge on startup and when products change
chrome.runtime.onStartup.addListener(updateBadge);
chrome.storage.onChanged.addListener((changes) => {
  if (changes.products) {
    updateBadge();
  }
});

// Initialize on load
updateBadge();
