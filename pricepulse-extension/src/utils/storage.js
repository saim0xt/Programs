// Storage utility for PricePulse
export const Storage = {
  // Get data from storage
  async get(keys) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        resolve(result);
      });
    });
  },

  // Set data in storage
  async set(data) {
    return new Promise((resolve) => {
      chrome.storage.local.set(data, () => {
        resolve();
      });
    });
  },

  // Remove data from storage
  async remove(keys) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(keys, () => {
        resolve();
      });
    });
  },

  // Clear all storage
  async clear() {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  },

  // Get all tracked products
  async getProducts() {
    const data = await this.get(['products']);
    return data.products || [];
  },

  // Save a product
  async saveProduct(product) {
    const products = await this.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);

    if (existingIndex >= 0) {
      products[existingIndex] = { ...products[existingIndex], ...product };
    } else {
      products.push(product);
    }

    await this.set({ products });
    return product;
  },

  // Delete a product
  async deleteProduct(productId) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== productId);
    await this.set({ products: filtered });
  },

  // Get user settings
  async getSettings() {
    const data = await this.get(['settings']);
    return data.settings || {
      notifications: true,
      checkInterval: 6, // hours
      priceDropThreshold: 5, // percentage
      currency: 'USD',
      theme: 'light'
    };
  },

  // Save user settings
  async saveSettings(settings) {
    await this.set({ settings });
  },

  // Get price history for a product
  async getPriceHistory(productId) {
    const data = await this.get([`history_${productId}`]);
    return data[`history_${productId}`] || [];
  },

  // Add price to history
  async addPriceToHistory(productId, price) {
    const history = await this.getPriceHistory(productId);
    history.push({
      price,
      timestamp: Date.now()
    });

    // Keep only last 100 entries
    if (history.length > 100) {
      history.shift();
    }

    await this.set({ [`history_${productId}`]: history });
  },

  // Get user data
  async getUserData() {
    const data = await this.get(['user']);
    return data.user || null;
  },

  // Save user data
  async saveUserData(user) {
    await this.set({ user });
  }
};
