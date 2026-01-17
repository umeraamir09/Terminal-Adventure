# Enjin-Inspired Ghost Theme

A modern, feature-rich Ghost theme inspired by premium blog designs. This theme offers a magazine-style layout with beautiful animations, dark mode support, and production-ready responsive design.

![Theme Preview](assets/screenshot-desktop.jpg)

## Features

### Design & Layout
- **Magazine-style grid layouts** - Multiple layout options including magazine grid, classic list, masonry, and cards
- **Hero section variants** - Featured slider, large featured post, grid featured, and minimal styles
- **Modern typography** - Premium fonts (Inter, Playfair Display) with customizable title and body fonts
- **Dark/Light mode** - Automatic theme detection with manual toggle support
- **Smooth animations** - Elegant entrance animations and hover effects
- **Fully responsive** - Optimized for mobile, tablet, and desktop

### Post Features
- **Reading progress indicator** - Shows progress as users scroll through articles
- **Table of contents** - Auto-generated from post headings with sticky sidebar
- **Social sharing** - Share buttons for Twitter, Facebook, LinkedIn, and copy link
- **Author cards** - Beautiful author info section at the end of posts
- **Related posts** - Smart related post suggestions based on tags

### Technical Features
- **Ghost 5.x & 6.x compatible** - Fully tested with latest Ghost versions
- **SEO optimized** - Clean markup and proper meta tags
- **Members support** - Full integration with Ghost membership features
- **Newsletter signup** - Beautiful subscription forms
- **Lightbox** - Image zoom and gallery support
- **Search integration** - Built-in Ghost search support

## Installation

### Via Ghost Admin
1. Download the theme zip file from [Releases](https://github.com/umeraamir09/Terminal-Adventure/releases)
2. Go to Ghost Admin → Settings → Design → Themes
3. Click "Upload theme" and select the zip file
4. Activate the theme

### Via CLI
```bash
# Clone the repository
git clone https://github.com/umeraamir09/Terminal-Adventure.git

# Install dependencies
yarn install

# Build the theme
yarn zip

# Upload dist/enjin-inspired.zip via Ghost Admin
```

## Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Yarn](https://yarnpkg.com/)
- [Ghost](https://ghost.org/) instance for testing

### Setup
```bash
# Install dependencies
yarn install

# Start development mode with live reload
yarn dev
```

### Build
```bash
# Build CSS and JS
npx gulp build

# Create distributable zip
yarn zip

# Run theme validation
yarn test
```

## Customization

### Theme Settings
The theme includes many customization options available in Ghost Admin → Settings → Design:

#### General
- **Navigation Layout**: Logo on left, Logo centered, or Minimal
- **Title Font**: Modern sans-serif, Elegant serif, or Display
- **Body Font**: Modern sans-serif or Elegant serif
- **Color Scheme**: Light, Dark, or Auto
- **Accent Color Style**: Vibrant, Subtle, or Gradient
- **Enable Animations**: Toggle entrance animations

#### Homepage
- **Show Hero Section**: Display featured posts hero
- **Hero Style**: Featured slider, Large featured, Grid featured, or Minimal
- **Feed Layout**: Magazine grid, Classic list, Masonry, or Cards

#### Post Page
- **Post Image Style**: Wide, Full bleed, Contained, or Hidden
- **Show Reading Progress**: Progress bar at top of page
- **Show Table of Contents**: Sticky sidebar navigation
- **Show Share Buttons**: Social sharing buttons
- **Show Author Card**: Author info at end of posts
- **Show Related Posts**: Suggested posts section
- **Email Signup Text**: Custom CTA text

#### Footer
- **Footer Text**: Custom footer message

### Custom Templates

Create custom templates for specific pages:
- `page-about.hbs` - Custom template for /about/
- `tag-news.hbs` - Custom template for /tag/news/
- `author-john.hbs` - Custom template for /author/john/

### CSS Customization

Edit `assets/css/screen.css` for styling changes:

```css
/* Custom accent color */
:root {
    --color-primary: #your-color;
}
```

## File Structure

```
├── assets/
│   ├── css/
│   │   ├── global.css      # CSS reset and base styles
│   │   └── screen.css      # Main theme styles
│   ├── js/
│   │   ├── lib/            # Third-party libraries
│   │   └── main.js         # Main JavaScript
│   ├── built/              # Compiled assets
│   └── images/             # Theme images
├── partials/
│   ├── icons/              # SVG icons
│   ├── lightbox.hbs        # Lightbox markup
│   └── post-card.hbs       # Post card component
├── default.hbs             # Base template
├── index.hbs               # Homepage
├── post.hbs                # Single post
├── page.hbs                # Static pages
├── tag.hbs                 # Tag archive
├── author.hbs              # Author archive
├── error.hbs               # Error pages
└── error-404.hbs           # 404 page
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome for Android (latest)

## Credits

- Design inspired by [Enjin Theme](https://themex.studio/)
- Fonts: [Inter](https://rsms.me/inter/), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- Icons: Custom SVG icons
- Built on [Ghost](https://ghost.org/)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- [Ghost Documentation](https://ghost.org/docs/)
- [Theme Documentation](https://ghost.org/docs/themes/)
- [Open an Issue](https://github.com/umeraamir09/Terminal-Adventure/issues)
