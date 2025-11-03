const WISHLIST_KEY = 'pricepulse_wishlist';
const SETTINGS_KEY = 'pricepulse_settings';
const USER_KEY = 'pricepulse_user';

export async function getStoredWishlist() {
  const { [WISHLIST_KEY]: wishlist = [] } = await chrome.storage.sync.get(WISHLIST_KEY);
  return wishlist;
}

export async function setStoredWishlist(wishlist) {
  await chrome.storage.sync.set({ [WISHLIST_KEY]: wishlist });
}

export async function getUserSettings() {
  const { [SETTINGS_KEY]: settings = getDefaultSettings() } = await chrome.storage.sync.get(SETTINGS_KEY);
  return settings;
}

export async function setUserSettings(settings) {
  await chrome.storage.sync.set({ [SETTINGS_KEY]: settings });
}

export async function getUserProfile() {
  const { [USER_KEY]: user } = await chrome.storage.local.get(USER_KEY);
  return user;
}

export async function setUserProfile(user) {
  await chrome.storage.local.set({ [USER_KEY]: user });
}

export function getDefaultSettings() {
  return {
    notificationsEnabled: true,
    notificationType: 'priceDrop',
    darkMode: true,
    currency: 'USD'
  };
}
