import { syncWishlist, initializeUserSession, schedulePriceChecks, handleNotifications } from './libs/backgroundHandlers.js';

chrome.runtime.onInstalled.addListener(() => {
  console.log('PricePulse installed: initializing background services.');
  initializeUserSession();
  schedulePriceChecks();
});

chrome.runtime.onStartup.addListener(() => {
  console.log('PricePulse starting: synchronizing data.');
  initializeUserSession();
  syncWishlist();
  schedulePriceChecks();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'price-check') {
    await syncWishlist();
    await handleNotifications();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'REFRESH_DATA') {
    syncWishlist().then(() => sendResponse({ success: true })).catch(() => sendResponse({ success: false }));
    return true;
  }
});
