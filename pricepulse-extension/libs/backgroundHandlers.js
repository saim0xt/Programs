import { getStoredWishlist, setStoredWishlist, getUserSettings } from './storage.js';
import { fetchPriceDataForItems } from './pricingApi.js';
import { sendPriceDropNotification } from './notifications.js';

export async function initializeUserSession() {
  const auth = await getAuthStatus();
  if (!auth.authenticated) {
    await signInSilently();
  }
}

export async function syncWishlist() {
  const wishlist = await getStoredWishlist();
  if (!wishlist.length) return;

  const updatedItems = await fetchPriceDataForItems(wishlist);
  await setStoredWishlist(updatedItems);
}

export function schedulePriceChecks() {
  chrome.alarms.create('price-check', { periodInMinutes: 15 });
}

export async function handleNotifications() {
  const wishlist = await getStoredWishlist();
  const settings = await getUserSettings();
  const notifications = wishlist.filter((item) =>
    shouldNotify(item, settings)
  );
  await Promise.all(notifications.map(sendPriceDropNotification));
}

function shouldNotify(item, settings) {
  if (!settings.notificationsEnabled) return false;
  if (settings.notificationType === 'priceDrop' && item.priceChange < 0) return true;
  if (settings.notificationType === 'targetPrice') {
    return item.targetPrice && item.currentPrice <= item.targetPrice;
  }
  return false;
}

async function getAuthStatus() {
  return new Promise((resolve) => {
    chrome.identity.getProfileUserInfo((userInfo) => {
      resolve({ authenticated: !!userInfo?.email, userInfo });
    });
  });
}

async function signInSilently() {
  try {
    await new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve(token);
      });
    });
  } catch (error) {
    console.warn('Silent sign-in failed; user may sign in manually.', error);
  }
}
