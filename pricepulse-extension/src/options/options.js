// PricePulse Options Script

let settings = {};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  setupNavigation();
  setupEventListeners();
  populateSettings();
});

// Load settings
async function loadSettings() {
  const response = await chrome.runtime.sendMessage({ action: 'getSettings' });
  if (response.success) {
    settings = response.settings;
  }
}

// Setup navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      showSection(sectionId);
    });
  });
}

// Show section
function showSection(sectionId) {
  // Update nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
  });

  // Update sections
  document.querySelectorAll('.settings-section').forEach(section => {
    section.classList.toggle('active', section.id === sectionId);
  });
}

// Populate settings
function populateSettings() {
  // General
  document.getElementById('currency').value = settings.currency || 'USD';
  document.getElementById('autoTrack').checked = settings.autoTrack || false;

  // Notifications
  document.getElementById('enableNotifications').checked = settings.notifications !== false;
  document.getElementById('priceDropThreshold').value = settings.priceDropThreshold || 5;
  document.getElementById('targetPriceNotif').checked = settings.targetPriceNotif !== false;
  document.getElementById('soundNotif').checked = settings.soundNotif || false;

  // Tracking
  document.getElementById('checkInterval').value = settings.checkInterval || 6;
  document.getElementById('historyDuration').value = settings.historyDuration || 30;

  // Appearance
  document.getElementById('theme').value = settings.theme || 'light';
  document.getElementById('compactMode').checked = settings.compactMode || false;
  document.getElementById('showBadge').checked = settings.showBadge !== false;

  // Account
  document.getElementById('syncEnabled').checked = settings.syncEnabled || false;
}

// Setup event listeners
function setupEventListeners() {
  // Close button
  document.getElementById('closeBtn').addEventListener('click', () => {
    window.close();
  });

  // Save on change
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('change', saveSettings);
  });

  // Clear data button
  document.getElementById('clearDataBtn').addEventListener('click', clearData);

  // Sign in button
  document.getElementById('signInBtn').addEventListener('click', signIn);
}

// Save settings
async function saveSettings() {
  settings = {
    // General
    currency: document.getElementById('currency').value,
    autoTrack: document.getElementById('autoTrack').checked,

    // Notifications
    notifications: document.getElementById('enableNotifications').checked,
    priceDropThreshold: parseInt(document.getElementById('priceDropThreshold').value),
    targetPriceNotif: document.getElementById('targetPriceNotif').checked,
    soundNotif: document.getElementById('soundNotif').checked,

    // Tracking
    checkInterval: parseInt(document.getElementById('checkInterval').value),
    historyDuration: parseInt(document.getElementById('historyDuration').value),

    // Appearance
    theme: document.getElementById('theme').value,
    compactMode: document.getElementById('compactMode').checked,
    showBadge: document.getElementById('showBadge').checked,

    // Account
    syncEnabled: document.getElementById('syncEnabled').checked
  };

  const response = await chrome.runtime.sendMessage({
    action: 'updateSettings',
    settings
  });

  if (response.success) {
    showSaveNotification();
  }
}

// Show save notification
function showSaveNotification() {
  const notification = document.getElementById('saveNotification');
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Clear data
async function clearData() {
  if (!confirm('Are you sure you want to clear all tracking data? This cannot be undone.')) {
    return;
  }

  await chrome.storage.local.clear();

  alert('All data has been cleared.');
  window.location.reload();
}

// Sign in
function signIn() {
  alert('Sign in feature coming soon! This will allow you to sync your data across devices.');
}
