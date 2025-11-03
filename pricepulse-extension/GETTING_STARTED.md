# Getting Started with PricePulse

Welcome to PricePulse! This guide will help you get up and running quickly.

## 🚀 Quick Start

### 1. Installation

**For Chrome/Edge/Brave:**
```bash
1. Navigate to chrome://extensions/ (or edge://extensions/)
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the pricepulse-extension folder
5. The extension icon will appear in your toolbar
```

**For Firefox:**
```bash
1. Navigate to about:debugging#/runtime/this-firefox
2. Click "Load Temporary Add-on"
3. Select the manifest.json file from pricepulse-extension folder
4. The extension icon will appear in your toolbar
```

### 2. First Time Setup

When you first install PricePulse:

1. **Onboarding Guide** - A welcome screen will automatically open
   - Learn about features
   - Understand how tracking works
   - Review permissions

2. **Grant Permissions** - Allow:
   - ✅ Storage (to save tracked products)
   - ✅ Notifications (for price drop alerts)
   - ✅ Active tab access (to detect products)

### 3. Track Your First Product

**Method 1: Using the Floating Button**
1. Visit Amazon, eBay, Walmart, or any supported site
2. Go to a product page
3. Look for the floating "Track Price" button (bottom right)
4. Click it to start tracking

**Method 2: Using the Extension Popup**
1. While on a product page, click the PricePulse icon
2. You'll see the product detected at the top
3. Click "Track Price"

### 4. Explore the Dashboard

Click the "Open Dashboard" button in the popup to:

- 📊 View all tracked products
- 📈 See price history charts
- 💰 Find the best deals
- ❤️ Manage your wishlist
- 📉 Track your savings

### 5. Customize Settings

Click the settings icon (⚙️) to:

- Set price drop threshold (default: 5%)
- Choose check interval (default: 6 hours)
- Select currency preference
- Enable/disable notifications
- Customize appearance

## 📱 Using PricePulse

### Popup Interface

The popup has three main tabs:

1. **Tracking** - All your tracked products
   - Search and filter products
   - View current prices
   - See price changes
   - Quick actions (view, chart, delete)

2. **Wishlist** - Products you've favorited
   - Click the heart icon on any product card
   - Organize items you're considering
   - Track multiple wishlists

3. **Deals** - Best price drops
   - Filter by discount percentage (10%, 20%, 30%+)
   - Automatically highlights best deals
   - Sort by biggest savings

### Dashboard Features

**Overview Tab:**
- Statistics: Tracked items, price drops, savings, wishlist
- Recent price drops list
- Top deals cards

**Tracking Tab:**
- All tracked products in a grid
- Search functionality
- Sort options (newest, oldest, price, discount)
- Product cards with images and details

**Wishlist Tab:**
- All wishlist items
- Same grid layout as tracking
- Quick access to favorited products

**Deals Tab:**
- Products with price drops
- Sorted by discount percentage
- Visual indicators for savings

**Analytics Tab:**
- Price trend charts (coming soon)
- Savings over time
- Best deal history

### Notifications

You'll receive notifications when:

1. **Price Drops** - When price decreases by your threshold amount
   - Example: "🎉 Price Drop Alert! Your item is now 25% cheaper"
   - Click to view the product

2. **Target Price Reached** - When a product hits your set price
   - Example: "🎯 Target Price Reached! Product is now $49.99"
   - Click to purchase

3. **Best Time to Buy** - Smart timing suggestions (coming soon)

## 🎯 Pro Tips

### Maximize Savings

1. **Set Target Prices**
   - Think about your budget
   - Set realistic target prices
   - Get notified when reached

2. **Track Multiple Sites**
   - Same product might be cheaper elsewhere
   - Track the same item on different sites
   - Compare prices easily

3. **Check Regularly**
   - Visit the dashboard weekly
   - Review price trends
   - Act on good deals quickly

4. **Use Wishlist**
   - Add items you're considering
   - Watch price trends over time
   - Buy when the price is right

### Organization

1. **Search Function**
   - Use keywords to find products
   - Search by site name
   - Filter by category (coming soon)

2. **Sort Options**
   - Sort by biggest discount to find deals
   - Sort by newest to see recent additions
   - Sort by price to compare costs

3. **Regular Cleanup**
   - Remove products you've bought
   - Delete items no longer interested in
   - Keep your list manageable

## 🛠️ Troubleshooting

### Product Not Detected

**Issue**: Floating button doesn't appear
- ✅ Check you're on a supported site
- ✅ Refresh the page after installing
- ✅ Clear browser cache
- ✅ Check content script is enabled

**Solution**: Use the popup instead
- Click extension icon
- Manually track from popup

### Notifications Not Working

**Issue**: Not receiving price drop alerts
- ✅ Check browser notification permissions
- ✅ Verify notifications enabled in settings
- ✅ Ensure check interval isn't too long
- ✅ Confirm threshold settings

**Solution**: Test with manual refresh
- Click refresh button in popup
- Check if notifications appear

### Prices Not Updating

**Issue**: Prices seem stale
- ✅ Check your internet connection
- ✅ Verify check interval setting
- ✅ Try manual refresh
- ✅ Check if site changed structure

**Solution**:
- Click "Refresh" in dashboard
- Wait for next scheduled check
- Report site issues on GitHub

## 📚 Learn More

- **Full Documentation**: See [README.md](README.md)
- **Installation Guide**: See [INSTALL.md](INSTALL.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Changelog**: See [CHANGELOG.md](CHANGELOG.md)

## 🆘 Need Help?

- **GitHub Issues**: Report bugs or request features
- **Email Support**: support@pricepulse.com
- **Community**: Join our discussions

## 🎉 You're Ready!

Start tracking prices and saving money! Visit your favorite shopping sites and begin adding products to track.

Happy saving with PricePulse! 💰
