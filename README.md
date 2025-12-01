# Portfolio Website

Personal portfolio website for Kayla Plunkett (oh-kay-blanket), showcasing projects in code, data visualization, and art.

## Overview

A static, single-page portfolio site featuring:
- Interactive project grid with filtering (Isotope.js)
- WebP optimized images with blur-up loading
- 3D phone mockup styling for project thumbnails
- Light/dark theme support
- Responsive design

## Project Structure

```
.
├── index.html              # Main HTML file
├── css/
│   ├── sass/              # SCSS source files
│   │   ├── abstracts/     # Variables and media query mixins
│   │   ├── partials/      # Component styles
│   │   └── style.scss     # Main SCSS entry point
│   └── style.css          # Compiled CSS
├── img/
│   └── projects/
│       └── tall/          # Project thumbnail images (phone mockup format)
├── fonts/                 # Custom fonts (Despairs)
└── design/               # Design resources
```

## Tech Stack

- **HTML5** - Semantic markup
- **SCSS** - Modular CSS with variables and mixins
- **JavaScript (Vanilla)** - Image loading and filtering
- **Isotope.js** - Filterable project grid
- **FontAwesome** - Icons
- **Google Analytics** - Traffic tracking

## Build Commands

**Run development server:**
```bash
npm run dev
# or
npm run serve

# Then open: http://localhost:8000
```

**Compile SCSS:**
```bash
npm run scss
```

**Format code:**
```bash
npx prettier --write .
```

## Image Specifications

### Project Thumbnails (Tall Format)
- **Capture dimensions**: 414 x 896 (iPhone XR preview)
- **Final dimensions**: 500 x 1082
- **Format**: WebP (converted from PNG)
- **Quality**: 80
- **Location**: `img/projects/tall/`

All project images are styled as 3D phone mockups with perspective transforms and hover effects.

### Image Optimization
The site uses a blur-up loading technique:
1. Low-quality placeholder (`placeholder.jpg`, 3.5KB) loads immediately
2. Full WebP image loads in background
3. Smooth fade transition when loaded
4. Native lazy loading for off-screen images

**Performance:**
- Original PNGs: 4,532 KB
- Optimized WebPs: 664 KB
- **85.3% file size reduction**

## Project Management

### CSV-Based System
Projects are managed via `projects.csv` in the root directory. This makes adding, editing, and removing projects much easier than editing HTML directly.

**Google Sheets:** [Edit Projects](https://docs.google.com/spreadsheets/d/18s9pYOE9a9m2F4eE6GBbd99M2mmo7NP9yCP_6qgfl4M/edit?gid=0#gid=0)

**CSV Structure:**
```csv
id,title,url,description,tools,categories,image
```

**Fields:**
- `id` - Unique identifier (matches image filename without extension)
- `title` - Project display name
- `url` - Project link
- `description` - Project description text
- `tools` - Tech stack/tools used (space-separated for display)
- `categories` - Isotope filter categories (space-separated: code, viz, ui, art)
- `image` - Image filename (webp file in img/projects/tall/)

**Notes:**
- Use quotes around descriptions containing commas
- Categories should be space-separated (e.g., "code viz ui")
- Tools should be space-separated (e.g., "react d3")

## Features

### Filterable Project Grid
Categories:
- **all** - Show all projects
- **code** - Programming projects
- **viz** - Data visualizations
- **art** - Creative work (music, photography, visual art)

Uses Isotope.js for smooth filtering animations. Projects are loaded dynamically from CSV.

### 3D Phone Mockups
Project images feature realistic phone mockup styling:
- Pronounced perspective rotation (26deg Y-axis, 10deg X-axis)
- Multi-layer box shadows for depth
- Smooth hover animations (straightens and scales up)
- Responsive: 3D effects on desktop, flat on mobile

### Theme System
Supports light/dark themes via `data-theme` attribute on document root.
- CSS custom properties for theming
- Different fonts per theme
- Currently hardcoded to light mode (line 248 in index.html)

### Responsive Design
Breakpoints (from `_media.scss`):
- **Mobile**: ≤ 544px
- **Tablet**: ≥ 769px
- **Desktop**: ≥ 545px
- **Desktop Medium**: ≥ 992px
- **Desktop Large**: ≥ 1200px
- **Desktop Max**: ≥ 1320px

## Development

### SCSS Architecture

**Abstracts:**
- `_variables.scss` - CSS custom properties, colors, fonts, animations
- `_media.scss` - Responsive mixins

**Partials:**
- `_base.scss` - Global styles and resets
- `_home.scss` - Homepage layout and project grid
- `_ui-img.scss` - Image-specific UI styles
- `_img-loading.scss` - Blur-up loading and 3D effects

### Adding a New Project

1. **Capture screenshot:**
   - Use iPhone XR preview size (414 x 896)
   - Resize to 500 x 1082 if needed

2. **Optimize image:**
   ```bash
   # Install sharp if needed
   npm install --save-dev sharp

   # Convert to WebP
   npx sharp -i img/projects/tall/your-project.png -o img/projects/tall/your-project.webp --webp-quality 80
   ```

3. **Add to CSV:**

   Open `projects.csv` and add a new line:

   ```csv
   your-project-id,Project Name,https://your-project-url.com,"Description of your project.",tech stack,code viz,your-project.webp
   ```

   **Example:**
   ```csv
   weather-app,Weather Dashboard,https://weather.example.com,"A real-time weather dashboard with 5-day forecasts.",react openweather-api,code viz ui,weather-app.webp
   ```

4. **Categories:**
   - `code` - Programming projects
   - `viz` - Data visualizations
   - `ui` - Design/UI projects
   - `art` - Creative work

   Multiple categories can be used (space-separated: `code viz ui`).

5. **Refresh the page** - Projects load automatically from CSV on page load.

### Editing Projects

Simply edit the corresponding line in `projects.csv` and refresh the page. No HTML changes needed!

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- WebP support required (96%+ browser coverage)

## Links

- **Website**: https://ohkayblanket.com
- **GitHub**: https://github.com/oh-kay-blanket
- **LinkedIn**: https://www.linkedin.com/in/kaylaleeplunkett/

## License

Personal portfolio - all rights reserved.
