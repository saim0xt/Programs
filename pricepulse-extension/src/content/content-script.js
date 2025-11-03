// PricePulse Content Script
import { PriceExtractor } from '../utils/price-extractor.js';

// Initialize
let productData = null;
let floatingButton = null;

// Detect product on page load
window.addEventListener('load', () => {
  setTimeout(detectProduct, 1000);
});

// Detect product
function detectProduct() {
  try {
    productData = PriceExtractor.extractProductData(window.location.href, document);

    if (productData && productData.title && productData.price) {
      showFloatingButton();
    }
  } catch (error) {
    console.error('PricePulse: Error detecting product', error);
  }
}

// Show floating button
function showFloatingButton() {
  // Remove existing button if any
  if (floatingButton) {
    floatingButton.remove();
  }

  floatingButton = document.createElement('div');
  floatingButton.id = 'pricepulse-floating-btn';
  floatingButton.innerHTML = `
    <div class="pricepulse-btn-content">
      <svg class="pricepulse-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="pricepulse-btn-text">Track Price</span>
    </div>
  `;

  floatingButton.addEventListener('click', handleTrackClick);
  document.body.appendChild(floatingButton);

  // Animate in
  setTimeout(() => {
    floatingButton.classList.add('pricepulse-visible');
  }, 100);
}

// Handle track button click
async function handleTrackClick() {
  if (!productData) return;

  // Show loading state
  floatingButton.classList.add('pricepulse-loading');

  try {
    const response = await chrome.runtime.sendMessage({
      action: 'trackProduct',
      data: {
        ...productData,
        url: window.location.href
      }
    });

    if (response.success) {
      // Show success state
      floatingButton.classList.remove('pricepulse-loading');
      floatingButton.classList.add('pricepulse-success');
      floatingButton.querySelector('.pricepulse-btn-text').textContent = 'Tracking!';

      // Hide after delay
      setTimeout(() => {
        floatingButton.classList.remove('pricepulse-visible');
        setTimeout(() => {
          floatingButton.remove();
        }, 300);
      }, 2000);
    }
  } catch (error) {
    console.error('PricePulse: Error tracking product', error);
    floatingButton.classList.remove('pricepulse-loading');
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProductData') {
    sendResponse({
      success: true,
      data: productData
    });
  }
  return true;
});

// Watch for URL changes (SPA navigation)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(detectProduct, 1000);
  }
}).observe(document, { subtree: true, childList: true });
