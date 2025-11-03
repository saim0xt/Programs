// PricePulse Dashboard Script

let products = [];
let currentView = 'overview';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  setupNavigation();
  setupEventListeners();
  renderView();
});

// Load data
async function loadData() {
  const response = await chrome.runtime.sendMessage({ action: 'getProducts' });
  if (response.success) {
    products = response.products;
    updateStats();
  }
}

// Setup navigation
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-view]');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = item.dataset.view;
      switchView(view);
    });
  });
}

// Switch view
function switchView(view) {
  currentView = view;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === view);
  });

  // Update views
  document.querySelectorAll('.view').forEach(viewEl => {
    viewEl.classList.remove('active');
  });

  document.getElementById(`${view}View`).classList.add('active');

  // Update title
  const titles = {
    overview: 'Overview',
    tracking: 'Tracking',
    wishlist: 'Wishlist',
    deals: 'Deals',
    analytics: 'Analytics'
  };

  document.getElementById('pageTitle').textContent = titles[view];

  renderView();
}

// Render current view
function renderView() {
  switch (currentView) {
    case 'overview':
      renderOverview();
      break;
    case 'tracking':
      renderTracking();
      break;
    case 'wishlist':
      renderWishlist();
      break;
    case 'deals':
      renderDeals();
      break;
    case 'analytics':
      renderAnalytics();
      break;
  }
}

// Update stats
function updateStats() {
  document.getElementById('statTracked').textContent = products.length;

  const drops = products.filter(p =>
    p.currentPrice < p.initialPrice
  ).length;
  document.getElementById('statDrops').textContent = drops;

  const savings = products.reduce((sum, p) => {
    return sum + Math.max(0, p.initialPrice - p.currentPrice);
  }, 0);
  document.getElementById('statSavings').textContent = `$${savings.toFixed(2)}`;

  const wishlist = products.filter(p => p.wishlist).length;
  document.getElementById('statWishlist').textContent = wishlist;

  document.getElementById('trackingBadge').textContent = products.length;
}

// Render overview
function renderOverview() {
  renderRecentDrops();
  renderTopDeals();
}

// Render recent drops
function renderRecentDrops() {
  const drops = products
    .filter(p => p.currentPrice < p.initialPrice)
    .sort((a, b) => b.lastChecked - a.lastChecked)
    .slice(0, 5);

  const container = document.getElementById('recentDrops');

  if (drops.length === 0) {
    container.innerHTML = '<div class="empty-state-small">No recent price drops</div>';
    return;
  }

  container.innerHTML = drops.map(p => `
    <div style="padding: 12px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">${truncate(p.title, 40)}</div>
        <div style="font-size: 13px; color: var(--text-secondary);">${p.site}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 700; color: var(--primary);">$${p.currentPrice.toFixed(2)}</div>
        <div style="font-size: 12px; color: var(--success);">-${((p.initialPrice - p.currentPrice) / p.initialPrice * 100).toFixed(1)}%</div>
      </div>
    </div>
  `).join('');
}

// Render top deals
function renderTopDeals() {
  const deals = products
    .filter(p => p.currentPrice < p.initialPrice)
    .sort((a, b) => {
      const aPercent = (a.initialPrice - a.currentPrice) / a.initialPrice;
      const bPercent = (b.initialPrice - b.currentPrice) / b.initialPrice;
      return bPercent - aPercent;
    })
    .slice(0, 5);

  const container = document.getElementById('topDeals');

  if (deals.length === 0) {
    container.innerHTML = '<div class="empty-state-small">No deals available</div>';
    return;
  }

  container.innerHTML = deals.map(p => {
    const discount = ((p.initialPrice - p.currentPrice) / p.initialPrice * 100).toFixed(0);
    return `
      <div style="padding: 12px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">${truncate(p.title, 40)}</div>
          <div style="font-size: 13px; color: var(--text-secondary);">${p.site}</div>
        </div>
        <div style="display: inline-flex; padding: 6px 12px; background: var(--success); color: white; border-radius: 8px; font-weight: 600; font-size: 14px;">
          ${discount}% OFF
        </div>
      </div>
    `;
  }).join('');
}

// Render tracking
function renderTracking() {
  const grid = document.getElementById('trackingGrid');

  if (products.length === 0) {
    grid.innerHTML = '<div class="empty-state-small" style="grid-column: 1/-1;">No tracked products</div>';
    return;
  }

  grid.innerHTML = products.map(p => createProductCardHTML(p)).join('');
  attachProductCardListeners();
}

// Render wishlist
function renderWishlist() {
  const wishlistProducts = products.filter(p => p.wishlist);
  const grid = document.getElementById('wishlistGrid');

  if (wishlistProducts.length === 0) {
    grid.innerHTML = '<div class="empty-state-small" style="grid-column: 1/-1;">No wishlist items</div>';
    return;
  }

  grid.innerHTML = wishlistProducts.map(p => createProductCardHTML(p)).join('');
  attachProductCardListeners();
}

// Render deals
function renderDeals() {
  const deals = products.filter(p => p.currentPrice < p.initialPrice);
  const grid = document.getElementById('dealsGrid');

  if (deals.length === 0) {
    grid.innerHTML = '<div class="empty-state-small" style="grid-column: 1/-1;">No deals available</div>';
    return;
  }

  grid.innerHTML = deals.map(p => createProductCardHTML(p)).join('');
  attachProductCardListeners();
}

// Render analytics
function renderAnalytics() {
  // Placeholder for chart rendering
  const canvas = document.getElementById('trendsChart');
  if (!canvas) return;

  // Simple visualization placeholder
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
}

// Create product card HTML
function createProductCardHTML(product) {
  const priceChange = ((product.currentPrice - product.initialPrice) / product.initialPrice * 100);
  const hasDiscount = priceChange < 0;

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img class="product-image" src="${product.image || ''}" alt="${product.title}">
        ${hasDiscount ? `<div class="product-badge">-${Math.abs(priceChange).toFixed(0)}%</div>` : ''}
      </div>
      <div class="product-details">
        <h3 class="product-name">${product.title}</h3>
        <div class="product-price-row">
          <div class="product-price">${product.currency}${product.currentPrice.toFixed(2)}</div>
          ${hasDiscount ? `<div class="price-trend down">▼ ${Math.abs(priceChange).toFixed(1)}%</div>` : ''}
        </div>
        <div class="product-meta">
          <span>${product.site}</span>
          <span>${formatDate(product.dateAdded)}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary view-product-btn">View</button>
          <button class="btn btn-danger delete-product-btn">Delete</button>
        </div>
      </div>
    </div>
  `;
}

// Attach product card listeners
function attachProductCardListeners() {
  document.querySelectorAll('.product-card').forEach(card => {
    const productId = card.dataset.id;
    const product = products.find(p => p.id === productId);

    if (!product) return;

    card.querySelector('.view-product-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      chrome.tabs.create({ url: product.url });
    });

    card.querySelector('.delete-product-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm('Remove this product from tracking?')) {
        await chrome.runtime.sendMessage({ action: 'deleteProduct', productId });
        await loadData();
        renderView();
      }
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('refreshBtn').addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ action: 'checkPriceNow' });
    await loadData();
    renderView();
  });

  document.getElementById('addProductBtn').addEventListener('click', () => {
    alert('Visit a product page and click "Track Price" to add products');
  });

  document.getElementById('settingsNav').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  // Search
  document.getElementById('trackingSearch')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
      const productId = card.dataset.id;
      const product = products.find(p => p.id === productId);
      const matches = product && (
        product.title.toLowerCase().includes(query) ||
        product.site.toLowerCase().includes(query)
      );
      card.style.display = matches ? '' : 'none';
    });
  });

  // Sort
  document.getElementById('trackingSort')?.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    sortProducts(sortBy);
    renderTracking();
  });
}

// Sort products
function sortProducts(sortBy) {
  switch (sortBy) {
    case 'newest':
      products.sort((a, b) => b.dateAdded - a.dateAdded);
      break;
    case 'oldest':
      products.sort((a, b) => a.dateAdded - b.dateAdded);
      break;
    case 'price-low':
      products.sort((a, b) => a.currentPrice - b.currentPrice);
      break;
    case 'price-high':
      products.sort((a, b) => b.currentPrice - a.currentPrice);
      break;
    case 'discount':
      products.sort((a, b) => {
        const aDiscount = (a.initialPrice - a.currentPrice) / a.initialPrice;
        const bDiscount = (b.initialPrice - b.currentPrice) / b.initialPrice;
        return bDiscount - aDiscount;
      });
      break;
  }
}

// Utilities
function truncate(str, length) {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
}
