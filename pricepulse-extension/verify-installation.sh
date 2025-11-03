#!/bin/bash

echo "🔍 Verifying PricePulse Installation..."
echo ""

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Are you in the pricepulse-extension directory?"
    exit 1
fi

echo "✅ Found manifest.json"

# Required files check
REQUIRED_FILES=(
    "manifest.json"
    "package.json"
    "src/popup/popup.html"
    "src/popup/popup.css"
    "src/popup/popup.js"
    "src/dashboard/dashboard.html"
    "src/dashboard/dashboard.css"
    "src/dashboard/dashboard.js"
    "src/background/service-worker.js"
    "src/content/content-script.js"
    "src/content/content-styles.css"
    "src/options/options.html"
    "src/options/options.css"
    "src/options/options.js"
    "src/onboarding/onboarding.html"
    "src/onboarding/onboarding.css"
    "src/onboarding/onboarding.js"
    "src/utils/storage.js"
    "src/utils/price-extractor.js"
)

MISSING=0

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
        MISSING=$((MISSING + 1))
    fi
done

echo ""

if [ $MISSING -eq 0 ]; then
    echo "🎉 All required files present!"
    echo ""
    echo "📦 Extension is ready to load!"
    echo ""
    echo "Next steps:"
    echo "  1. Open chrome://extensions/ (or your browser's extension page)"
    echo "  2. Enable 'Developer mode'"
    echo "  3. Click 'Load unpacked'"
    echo "  4. Select this directory"
    echo ""
    echo "📖 See INSTALL.md for detailed instructions"
    exit 0
else
    echo "❌ $MISSING file(s) missing"
    echo ""
    echo "Please ensure all files are present before loading the extension."
    exit 1
fi
