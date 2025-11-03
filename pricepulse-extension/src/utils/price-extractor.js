// Price extraction utilities for different e-commerce sites
export const PriceExtractor = {
  // Extract product data based on the website
  extractProductData(url, document) {
    const hostname = new URL(url).hostname;

    if (hostname.includes('amazon')) {
      return this.extractAmazon(document);
    } else if (hostname.includes('ebay')) {
      return this.extractEbay(document);
    } else if (hostname.includes('walmart')) {
      return this.extractWalmart(document);
    } else if (hostname.includes('bestbuy')) {
      return this.extractBestBuy(document);
    } else if (hostname.includes('target')) {
      return this.extractTarget(document);
    } else if (hostname.includes('etsy')) {
      return this.extractEtsy(document);
    } else if (hostname.includes('aliexpress')) {
      return this.extractAliExpress(document);
    }

    return this.extractGeneric(document);
  },

  // Amazon extractor
  extractAmazon(doc) {
    const title = doc.querySelector('#productTitle')?.textContent.trim() ||
                  doc.querySelector('h1 span')?.textContent.trim();

    const priceWhole = doc.querySelector('.a-price-whole')?.textContent.trim();
    const priceFraction = doc.querySelector('.a-price-fraction')?.textContent.trim();
    const price = priceWhole ? parseFloat(`${priceWhole}.${priceFraction || '00'}`.replace(/[^0-9.]/g, '')) : null;

    const image = doc.querySelector('#landingImage')?.src ||
                  doc.querySelector('#imgBlkFront')?.src ||
                  doc.querySelector('.a-dynamic-image')?.src;

    const currency = doc.querySelector('.a-price-symbol')?.textContent.trim() || '$';

    return { title, price, image, currency };
  },

  // eBay extractor
  extractEbay(doc) {
    const title = doc.querySelector('h1.x-item-title__mainTitle')?.textContent.trim();
    const priceText = doc.querySelector('.x-price-primary span')?.textContent.trim();
    const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;
    const image = doc.querySelector('.ux-image-carousel-item img')?.src;
    const currency = priceText?.match(/[$€£¥]/)?.[0] || '$';

    return { title, price, image, currency };
  },

  // Walmart extractor
  extractWalmart(doc) {
    const title = doc.querySelector('h1[itemprop="name"]')?.textContent.trim();
    const priceText = doc.querySelector('[itemprop="price"]')?.textContent.trim();
    const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;
    const image = doc.querySelector('[data-testid="hero-image-container"] img')?.src;
    const currency = '$';

    return { title, price, image, currency };
  },

  // Best Buy extractor
  extractBestBuy(doc) {
    const title = doc.querySelector('.sku-title h1')?.textContent.trim();
    const priceText = doc.querySelector('.priceView-customer-price span')?.textContent.trim();
    const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;
    const image = doc.querySelector('.primary-image')?.src;
    const currency = '$';

    return { title, price, image, currency };
  },

  // Target extractor
  extractTarget(doc) {
    const title = doc.querySelector('[data-test="product-title"]')?.textContent.trim();
    const priceText = doc.querySelector('[data-test="product-price"]')?.textContent.trim();
    const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;
    const image = doc.querySelector('[data-test="image-gallery"] img')?.src;
    const currency = '$';

    return { title, price, image, currency };
  },

  // Etsy extractor
  extractEtsy(doc) {
    const title = doc.querySelector('h1')?.textContent.trim();
    const priceText = doc.querySelector('.wt-text-title-03')?.textContent.trim();
    const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;
    const image = doc.querySelector('.carousel-pane img')?.src;
    const currency = priceText?.match(/[$€£¥]/)?.[0] || '$';

    return { title, price, image, currency };
  },

  // AliExpress extractor
  extractAliExpress(doc) {
    const title = doc.querySelector('h1')?.textContent.trim();
    const priceText = doc.querySelector('.product-price-value')?.textContent.trim();
    const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : null;
    const image = doc.querySelector('.magnifier-image')?.src;
    const currency = priceText?.match(/[$€£¥]/)?.[0] || '$';

    return { title, price, image, currency };
  },

  // Generic extractor (fallback)
  extractGeneric(doc) {
    // Try common patterns
    const title = doc.querySelector('h1')?.textContent.trim() ||
                  doc.querySelector('[itemprop="name"]')?.textContent.trim();

    // Try to find price with common patterns
    const priceSelectors = [
      '[itemprop="price"]',
      '.price',
      '.product-price',
      '[data-price]',
      '.cost'
    ];

    let price = null;
    for (const selector of priceSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        const text = element.textContent || element.getAttribute('content');
        const parsed = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (!isNaN(parsed)) {
          price = parsed;
          break;
        }
      }
    }

    const image = doc.querySelector('[itemprop="image"]')?.src ||
                  doc.querySelector('.product-image img')?.src ||
                  doc.querySelector('img[alt*="product" i]')?.src;

    const currency = '$';

    return { title, price, image, currency };
  },

  // Parse price from text
  parsePrice(text) {
    if (!text) return null;
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  }
};
