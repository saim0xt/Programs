# PricePulse - Smart Price Tracker Browser Extension

<div align="center">

![PricePulse Logo](assets/icons/icon128.png)

**A modern, visually stunning price tracker for online shopping**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](manifest.json)

Track prices • Get alerts • Save money

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Development](#development)

</div>

---

## ✨ Features

### 🎯 Smart Price Tracking
- **Automatic Product Detection** - Detects products on popular e-commerce sites
- **Real-time Price Monitoring** - Checks prices at customizable intervals
- **Price History Charts** - Visualize price trends over time
- **Multi-site Support** - Works with Amazon, eBay, Walmart, Best Buy, Target, Etsy, AliExpress, and more

### 🔔 Intelligent Alerts
- **Price Drop Notifications** - Get notified when prices drop
- **Target Price Alerts** - Set your ideal price and get alerted when reached
- **Customizable Thresholds** - Control when you receive notifications
- **Browser Notifications** - Native notification support

### 💎 Beautiful UI/UX
- **Modern Design** - Clean, intuitive interface with smooth animations
- **Responsive Layout** - Works perfectly on all screen sizes
- **Dark Mode Support** - Easy on the eyes (coming soon)
- **Micro-interactions** - Delightful animations throughout

### 📊 Comprehensive Dashboard
- **Overview Stats** - Track your savings and active deals
- **Price Analytics** - Detailed insights into price trends
- **Wishlist Management** - Organize products you want to track
- **Deal Finder** - Discover the best price drops automatically

### 🎨 Customization
- **Flexible Settings** - Customize check intervals, thresholds, and more
- **Multiple Currencies** - Support for USD, EUR, GBP, CAD, AUD
- **Notification Preferences** - Control what alerts you receive
- **Appearance Options** - Personalize the look and feel

---

## 🚀 Installation

### From Source (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pricepulse-extension.git
   cd pricepulse-extension
   ```

2. **Install dependencies (optional)**
   ```bash
   npm install
   ```

3. **Load in Chrome/Edge**
   - Open `chrome://extensions/` (or `edge://extensions/`)
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `pricepulse-extension` folder

4. **Load in Firefox**
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file

### From Store (Coming Soon)
- Chrome Web Store
- Firefox Add-ons
- Edge Add-ons

---

## 📖 Usage

### Quick Start

1. **Install the Extension**
   Follow the installation instructions above

2. **Visit a Product Page**
   Go to any supported e-commerce site (Amazon, eBay, etc.)

3. **Track the Product**
   - Click the floating "Track Price" button on the product page
   - Or use the extension popup to track the current page

4. **Manage Your Tracking**
   - Click the extension icon to view tracked products
   - Open the dashboard for detailed analytics
   - Set target prices for specific products

### Supported E-commerce Sites

- **Amazon** (amazon.com, amazon.co.uk, amazon.ca, amazon.de, amazon.fr)
- **eBay** (ebay.com)
- **Walmart** (walmart.com)
- **Best Buy** (bestbuy.com)
- **Target** (target.com)
- **Etsy** (etsy.com)
- **AliExpress** (aliexpress.com)
- **Shopify Stores** (*.shopify.com)

### Features Guide

#### 1. Tracking Products
- **Automatic Detection**: Extension automatically detects products on supported sites
- **Manual Tracking**: Use the popup to manually add products
- **Bulk Management**: Track multiple products at once

#### 2. Price Alerts
- **Set Target Price**: Define your ideal price for any product
- **Threshold Alerts**: Get notified for drops above a certain percentage
- **Smart Timing**: Receive alerts at optimal times

#### 3. Dashboard
- **Overview**: See all your tracked products at a glance
- **Analytics**: View detailed price history charts
- **Deals**: Find the best price drops across your tracked items
- **Wishlist**: Organize products you're considering

#### 4. Settings
- **Notifications**: Customize alert preferences
- **Check Interval**: Set how often to check prices (1-24 hours)
- **Currency**: Choose your preferred currency
- **Appearance**: Customize the look and feel

---

## 🛠️ Development

### Project Structure

```
pricepulse-extension/
├── manifest.json                 # Extension manifest
├── src/
│   ├── background/
│   │   └── service-worker.js    # Background service worker
│   ├── popup/
│   │   ├── popup.html           # Extension popup
│   │   ├── popup.css            # Popup styles
│   │   └── popup.js             # Popup logic
│   ├── dashboard/
│   │   ├── dashboard.html       # Dashboard page
│   │   ├── dashboard.css        # Dashboard styles
│   │   └── dashboard.js         # Dashboard logic
│   ├── content/
│   │   ├── content-script.js    # Content script
│   │   └── content-styles.css   # Injected styles
│   ├── options/
│   │   ├── options.html         # Settings page
│   │   ├── options.css          # Settings styles
│   │   └── options.js           # Settings logic
│   ├── onboarding/
│   │   ├── onboarding.html      # Onboarding flow
│   │   ├── onboarding.css       # Onboarding styles
│   │   └── onboarding.js        # Onboarding logic
│   └── utils/
│       ├── storage.js           # Storage utilities
│       └── price-extractor.js   # Price extraction logic
├── assets/
│   ├── icons/                   # Extension icons
│   └── images/                  # Images and graphics
└── README.md                    # This file
```

### Technologies Used

- **Manifest V3** - Latest Chrome extension API
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with animations
- **Chrome APIs** - Storage, Alarms, Notifications

### Key APIs

- `chrome.storage.local` - Local data storage
- `chrome.alarms` - Periodic price checking
- `chrome.notifications` - Price drop alerts
- `chrome.tabs` - Tab interaction
- `chrome.runtime` - Background messaging

### Building

No build step required! The extension works directly with the source files.

For production optimization (optional):
```bash
npm run build
```

### Testing

1. **Manual Testing**
   - Load the extension in developer mode
   - Visit supported e-commerce sites
   - Test tracking and notification features

2. **Debugging**
   - Use Chrome DevTools for popup/dashboard
   - Check `chrome://extensions` for background worker logs
   - Inspect content scripts on product pages

---

## 🎨 Design Philosophy

PricePulse is built with a focus on:

- **User Experience**: Intuitive, delightful interactions
- **Performance**: Fast, efficient, non-intrusive
- **Privacy**: All data stored locally, no tracking
- **Accessibility**: ARIA labels, keyboard navigation
- **Aesthetics**: Modern, clean, professional design

---

## 🔒 Privacy & Security

- **Local Storage Only**: All data stays on your device
- **No Tracking**: We don't collect or share your data
- **Secure**: No external API calls for tracking
- **Transparent**: Open-source code you can audit

### Permissions Explained

- **storage**: Save tracked products locally
- **alarms**: Schedule periodic price checks
- **notifications**: Alert you about price drops
- **activeTab**: Detect products on current page
- **host_permissions**: Access product pages to extract prices

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue with details
2. **Suggest Features**: Share your ideas
3. **Submit PRs**: Fix bugs or add features
4. **Improve Docs**: Help make documentation better

### Development Guidelines

- Follow existing code style
- Test thoroughly before submitting
- Update documentation as needed
- Keep commits focused and descriptive

---

## 📝 Roadmap

### Version 1.1
- [ ] Dark mode support
- [ ] Export/import tracking data
- [ ] More e-commerce sites
- [ ] Enhanced charts with zoom

### Version 1.2
- [ ] Price prediction using ML
- [ ] Cloud sync across devices
- [ ] Mobile companion app
- [ ] Social sharing features

### Version 2.0
- [ ] Multi-user accounts
- [ ] Price comparison across sites
- [ ] Coupon code integration
- [ ] Browser action shortcuts

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- Icons from [Heroicons](https://heroicons.com/)
- Design inspiration from modern web apps
- Community feedback and contributions

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/pricepulse-extension/issues)
- **Email**: support@pricepulse.com
- **Twitter**: [@PricePulse](https://twitter.com/pricepulse)

---

<div align="center">

Made with ❤️ by the PricePulse Team

**[⬆ back to top](#pricepulse---smart-price-tracker-browser-extension)**

</div>
