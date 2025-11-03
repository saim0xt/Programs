# Contributing to PricePulse

Thank you for your interest in contributing to PricePulse! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to see if the bug has already been reported
2. **Create a new issue** with a clear title and description
3. **Include steps to reproduce** the bug
4. **Provide system information** (browser, OS, extension version)
5. **Add screenshots** if applicable

### Suggesting Features

1. **Check existing issues** for similar feature requests
2. **Create a new issue** with the "enhancement" label
3. **Describe the feature** and its benefits
4. **Explain use cases** for the feature
5. **Consider implementation** if possible

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages** (`git commit -m 'Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Use meaningful variable names
- Keep functions small and focused

### JavaScript

```javascript
// Good
function calculateDiscount(originalPrice, currentPrice) {
  const difference = originalPrice - currentPrice;
  return (difference / originalPrice) * 100;
}

// Avoid
function calc(a, b) {
  return ((a - b) / a) * 100;
}
```

### CSS

- Use CSS custom properties for colors and spacing
- Follow BEM naming convention when applicable
- Group related properties
- Add comments for complex styles

```css
/* Good */
.product-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 16px;
}

/* Avoid */
.pc {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}
```

### HTML

- Use semantic HTML elements
- Add ARIA labels for accessibility
- Keep markup clean and readable
- Validate HTML structure

## Testing

Before submitting a PR:

1. **Test the extension** in Chrome/Edge
2. **Test in Firefox** if possible
3. **Check all features** work as expected
4. **Verify responsive design** on different screen sizes
5. **Test accessibility** with keyboard navigation

## Adding New E-commerce Sites

To add support for a new e-commerce site:

1. **Update manifest.json**
   - Add URL pattern to `content_scripts.matches`
   - Add URL pattern to `host_permissions`

2. **Update price-extractor.js**
   - Add extraction method for the site
   - Test price extraction thoroughly

3. **Update documentation**
   - Add site to supported sites list in README

Example:

```javascript
// In price-extractor.js
extractNewSite(doc) {
  const title = doc.querySelector('.product-title')?.textContent.trim();
  const priceText = doc.querySelector('.price')?.textContent.trim();
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  const image = doc.querySelector('.product-image')?.src;
  const currency = priceText?.match(/[$€£¥]/)?.[0] || '$';

  return { title, price, image, currency };
}
```

## Documentation

When making changes:

- Update README.md if adding features
- Update INSTALL.md if changing installation process
- Add inline comments for complex code
- Update JSDoc comments for functions

## Commit Messages

Use clear, descriptive commit messages:

```
Good:
- Add support for Best Buy product pages
- Fix price extraction for Amazon
- Improve notification timing logic
- Update dashboard UI for mobile devices

Avoid:
- fix bug
- update
- changes
```

## Code Review Process

1. **Maintainers review** all pull requests
2. **Feedback is provided** within a few days
3. **Make requested changes** if needed
4. **PR is merged** once approved

## Community Guidelines

- Be respectful and constructive
- Help others learn and grow
- Follow the Code of Conduct
- Celebrate successes together

## Getting Help

If you need help:

- Comment on your issue or PR
- Join our community discussions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PricePulse! 🎉
