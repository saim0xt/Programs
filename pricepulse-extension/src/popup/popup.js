// PricePulse Popup Script

// State
let currentProducts = [];
let currentTab = 'tracking';
let currentPageData = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadProducts();
  await checkCurrentPage();
  setupEventListeners();
  setupTabs();
});

// Load products from storage
async function loadProducts() {
  const response = await chrome.runtime.sendMessage({ action: 'getProducts' });

  if (response.success) {
    currentProducts = response.products;
    renderProducts();
  }
}

// Check if current page is a product page
async function checkCurrentPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab) return;

    // Check if it's an e-commerce site
    const url = new URL(tab.url);
    const supportedSites = ['amazon', 'ebay', 'walmart', 'bestbuy', 'target', 'etsy', 'aliexpress'];
    const isSupportedSite = supportedSites.some(site => url.hostname.includes(site));

    if (isSupportedSite) {
      // Request product data from content script
      chrome.tabs.sendMessage(tab.id, { action: 'getProductData' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('No content script ready');
          return;
        }

        if (response && response.success) {
          showCurrentPageCard(response.data);
        }
      });
    }
  } catch (error) {
    console.error('Error checking current page:', error);
  }
}

// Show current page card
function showCurrentPageCard(data) {
  currentPageData = data;
  const currentPageEl = document.getElementById('currentPage');
  const pageTitleEl = document.getElementById('pageTitle');
  const pagePriceEl = document.getElementById('pagePrice');

  if (data.title && data.price) {
    pageTitleEl.textContent = data.title.substring(0, 50) + (data.title.length > 50 ? '...' : '');
    pagePriceEl.textContent = `${data.currency}${data.price.toFixed(2)}`;
    currentPageEl.classList.add('visible');
  }
}

// Setup event listeners
function setupEventListeners() {
  // Track button
  document.getElementById('trackBtn').addEventListener('click', trackCurrentProduct);

  // Refresh button
  document.getElementById('refreshBtn').addEventListener('click', refreshPrices);

  // Settings button
  document.getElementById('settingsBtn').addEventListener('click', openSettings);

  // Dashboard button
  document.getElementById('dashboardBtn').addEventListener('click', openDashboard);

  // Search input
  document.getElementById('searchInput').addEventListener('input', handleSearch);

  // Deals filter
  document.getElementById('dealsFilter').addEventListener('change', filterDeals);
}

// Setup tabs
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      switchTab(tabName);
    });
  });
}

// Switch tab
function switchTab(tabName) {
  currentTab = tabName;

  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  // Update tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const paneMap = {
    'tracking': 'trackingPane',
    'wishlist': 'wishlistPane',
    'deals': 'dealsPane'
  };

  document.getElementById(paneMap[tabName]).classList.add('active');

  // Render appropriate content
  if (tabName === 'tracking') {
    renderProducts();
  } else if (tabName === 'wishlist') {
    renderWishlist();
  } else if (tabName === 'deals') {
    renderDeals();
  }
}

// Track current product
async function trackCurrentProduct() {
  if (!currentPageData) return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const response = await chrome.runtime.sendMessage({
    action: 'trackProduct',
    data: {
      ...currentPageData,
      url: tab.url
    }
  });

  if (response.success) {
    // Show success feedback
    const btn = document.getElementById('trackBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7" stroke-width="2"/></svg> Tracked!';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      document.getElementById('currentPage').classList.remove('visible');
    }, 2000);

    // Reload products
    await loadProducts();
    switchTab('tracking');
  }
}

// Render products
function renderProducts(products = currentProducts) {
  const container = document.getElementById('productsContainer');
  const emptyState = document.getElementById('emptyState');

  if (products.length === 0) {
    emptyState.style.display = 'flex';
    container.querySelectorAll('.product-card').forEach(card => card.remove());
    return;
  }

  emptyState.style.display = 'none';

  // Clear existing cards
  container.querySelectorAll('.product-card').forEach(card => card.remove());

  // Sort by date added (newest first)
  const sortedProducts = [...products].sort((a, b) => b.dateAdded - a.dateAdded);

  // Create product cards
  sortedProducts.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Create product card
function createProductCard(product) {
  const template = document.getElementById('productCardTemplate');
  const card = template.content.cloneNode(true);
  const cardEl = card.querySelector('.product-card');

  cardEl.dataset.productId = product.id;

  // Image
  const img = card.querySelector('.product-image');
  img.src = product.image || 'assets/images/placeholder.png';
  img.alt = product.title;

  // Wishlist button
  const wishlistBtn = card.querySelector('.wishlist-btn');
  if (product.wishlist) {
    wishlistBtn.classList.add('active');
  }
  wishlistBtn.addEventListener('click', () => toggleWishlist(product.id));

  // Title
  card.querySelector('.product-title').textContent = product.title;

  // Meta
  card.querySelector('.product-site').textContent = product.site.replace('www.', '');
  card.querySelector('.product-date').textContent = formatDate(product.dateAdded);

  // Pricing
  card.querySelector('.price-current').textContent = `${product.currency}${product.currentPrice.toFixed(2)}`;

  // Price change
  const priceChange = calculatePriceChange(product);
  const priceChangeEl = card.querySelector('.price-change');

  if (priceChange !== 0) {
    priceChangeEl.textContent = `${priceChange > 0 ? '+' : ''}${priceChange.toFixed(1)}%`;
    priceChangeEl.classList.add(priceChange > 0 ? 'negative' : 'positive');
  } else {
    priceChangeEl.style.display = 'none';
  }

  // Actions
  card.querySelector('.view-btn').addEventListener('click', () => viewProduct(product.url));
  card.querySelector('.chart-btn').addEventListener('click', () => viewChart(product.id));
  card.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product.id));

  return card;
}

// Calculate price change percentage
function calculatePriceChange(product) {
  if (!product.initialPrice || product.initialPrice === product.currentPrice) {
    return 0;
  }

  const change = ((product.currentPrice - product.initialPrice) / product.initialPrice) * 100;
  return change;
}

// Format date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else {
    return date.toLocaleDateString();
  }
}

// Toggle wishlist
async function toggleWishlist(productId) {
  const product = currentProducts.find(p => p.id === productId);
  if (!product) return;

  product.wishlist = !product.wishlist;

  await chrome.runtime.sendMessage({
    action: 'updateProduct',
    product
  });

  await loadProducts();
}

// View product
function viewProduct(url) {
  chrome.tabs.create({ url });
}

// View chart
function viewChart(productId) {
  chrome.tabs.create({
    url: chrome.runtime.getURL(`src/dashboard/dashboard.html?product=${productId}`)
  });
}

// Delete product
async function deleteProduct(productId) {
  if (!confirm('Are you sure you want to stop tracking this product?')) {
    return;
  }

  await chrome.runtime.sendMessage({
    action: 'deleteProduct',
    productId
  });

  await loadProducts();
}

// Handle search
function handleSearch(e) {
  const query = e.target.value.toLowerCase();

  if (!query) {
    renderProducts();
    return;
  }

  const filtered = currentProducts.filter(product =>
    product.title.toLowerCase().includes(query) ||
    product.site.toLowerCase().includes(query)
  );

  renderProducts(filtered);
}

// Render wishlist
function renderWishlist() {
  const wishlistProducts = currentProducts.filter(p => p.wishlist);
  const container = document.getElementById('wishlistContainer');

  container.innerHTML = '';

  if (wishlistProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke-width="2"/>
        </svg>
        <h3>No Wishlist Items</h3>
        <p>Add items to your wishlist by clicking the heart icon</p>
      </div>
    `;
    return;
  }

  wishlistProducts.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Render deals
function renderDeals() {
  const threshold = parseInt(document.getElementById('dealsFilter').value) || 0;
  const deals = currentProducts.filter(product => {
    const change = calculatePriceChange(product);
    return change < -threshold;
  });

  const container = document.getElementById('dealsContainer');
  container.innerHTML = '';

  if (deals.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-width="2"/>
        </svg>
        <h3>No Price Drops Yet</h3>
        <p>We'll notify you when prices drop on your tracked items</p>
      </div>
    `;
    return;
  }

  // Sort by biggest discount
  deals.sort((a, b) => calculatePriceChange(a) - calculatePriceChange(b));

  deals.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Filter deals
function filterDeals() {
  renderDeals();
}

// Refresh prices
async function refreshPrices() {
  const btn = document.getElementById('refreshBtn');
  btn.disabled = true;
  btn.innerHTML = '<div class="loading"></div>';

  await chrome.runtime.sendMessage({ action: 'checkPriceNow' });

  setTimeout(async () => {
    await loadProducts();
    btn.disabled = false;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/>
        <path d="M9 12l2 2 4-4" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }, 2000);
}

// Open settings
function openSettings() {
  chrome.runtime.openOptionsPage();
}

// Open dashboard
function openDashboard() {
  chrome.tabs.create({
    url: chrome.runtime.getURL('src/dashboard/dashboard.html')
  });
}
