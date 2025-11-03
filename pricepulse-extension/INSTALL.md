# Installation Guide

This guide will walk you through installing PricePulse in your browser.

## Chrome / Edge / Brave / Opera

1. **Download or Clone**
   - Download the extension files or clone the repository
   - Extract the ZIP file if downloaded

2. **Open Extensions Page**
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`
   - Brave: Navigate to `brave://extensions/`
   - Opera: Navigate to `opera://extensions/`

3. **Enable Developer Mode**
   - Find the "Developer mode" toggle in the top right corner
   - Turn it ON

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the `pricepulse-extension` folder
   - Select the folder and click "Select Folder" or "Open"

5. **Verify Installation**
   - You should see the PricePulse icon in your extensions area
   - Click the icon to open the popup
   - The onboarding guide will automatically open

## Firefox

1. **Download or Clone**
   - Download the extension files or clone the repository
   - Extract the ZIP file if downloaded

2. **Open Debug Page**
   - Navigate to `about:debugging#/runtime/this-firefox`

3. **Load Temporary Add-on**
   - Click "Load Temporary Add-on..."
   - Navigate to the `pricepulse-extension` folder
   - Select the `manifest.json` file
   - Click "Open"

4. **Verify Installation**
   - The PricePulse icon should appear in your toolbar
   - Click the icon to open the popup
   - The onboarding guide will automatically open

**Note**: In Firefox, temporary add-ons are removed when you close the browser. For permanent installation, you'll need to package and sign the extension.

## Safari (macOS)

Safari requires converting the extension to Safari Web Extension format. This is more complex and requires:

1. Xcode installed
2. Using `xcrun safari-web-extension-converter` tool
3. Code signing with Apple Developer account

For now, PricePulse is optimized for Chromium-based browsers and Firefox.

## Troubleshooting

### Extension won't load
- Make sure you selected the correct folder (the one containing `manifest.json`)
- Check that all files are present and not corrupted
- Try restarting your browser

### Icons not showing
- The extension may work without icon files, but for best experience:
- Ensure the `assets/icons/` folder exists
- Add placeholder PNG files or use the provided icons

### Content script not working
- Make sure you're on a supported e-commerce site
- Check that the site URL matches the patterns in `manifest.json`
- Try refreshing the product page after installation

### Notifications not working
- Grant notification permissions when prompted
- Check browser notification settings
- Verify notifications are enabled in extension settings

## Updating the Extension

When you make changes to the code:

1. **Chrome/Edge/Brave**
   - Go to extensions page
   - Click the refresh icon on the PricePulse card
   - Or use Ctrl+R (Cmd+R on Mac) while on the extensions page

2. **Firefox**
   - Click "Reload" on the extension in `about:debugging`
   - Or remove and re-add the temporary add-on

## Uninstalling

### Chrome/Edge/Brave/Opera
1. Go to extensions page
2. Click "Remove" on the PricePulse card
3. Confirm removal

### Firefox
1. Go to `about:addons`
2. Find PricePulse
3. Click "Remove"
4. Confirm removal

**Note**: Uninstalling will remove all stored data including tracked products and price history.

## Next Steps

After installation:
1. Complete the onboarding guide
2. Visit a product page on Amazon, eBay, or other supported sites
3. Click "Track Price" to start tracking
4. Customize settings to your preferences
5. Open the dashboard to see all features

Enjoy saving money with PricePulse! 🎉
