# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Kayla Plunkett (oh-kay-blanket). It's a static site showcasing various projects including code, data visualizations, and art.

## Build Commands

**Run development server:**
```bash
npm run dev
# Then open: http://localhost:8000
```

This is required for local development due to CORS restrictions when loading the CSV file.

**Compile SCSS to CSS:**
```bash
npm run scss
```

This compiles `css/sass/style.scss` to `css/style.css` with compression enabled.

**Format code:**
```bash
npx prettier --write .
```

## Architecture

### SCSS Structure

The project uses a modular SCSS architecture with separate concerns:

- **`css/sass/style.scss`** - Main entry point that imports all partials
- **`css/sass/abstracts/`** - Reusable utilities:
  - `_variables.scss` - CSS custom properties for theming (light/dark modes), colors, fonts, and animation keyframes
  - `_media.scss` - Responsive mixins (`@include desktop()`, `@include mobile()`, `@include tablet()`)
- **`css/sass/partials/`** - Component styles:
  - `_base.scss` - Global styles and resets
  - `_home.scss` - Homepage-specific styles (heading, about section, projects grid)
  - `_ui-img.scss` - Image-specific UI styles

### Responsive Design

Media query mixins from `_media.scss` support multiple breakpoints:
- `@include mobile()` - max-width 544px (default)
- `@include tablet()` - min-width 769px (default)
- `@include desktop()` - min-width 545px (default), or "medium" (992px), "large" (1200px), "max" (1320px)
- `@include min($px)` / `@include max($px)` - Custom breakpoints
- `@include minmax($min, $max)` - Range queries

### Theming

The site supports light/dark themes via CSS custom properties defined in `_variables.scss`. Theme is controlled by the `data-theme` attribute on the document root. Variables include:
- Text colors (main, body, accent, subtle)
- Background colors
- Link color
- Font families (different fonts per theme)

### JavaScript Functionality

Located inline in `index.html`:
- Theme detection (currently hardcoded to light mode)
- CSV-based project loading with automatic format detection (comma or tab-separated)
- Isotope.js integration for filterable project grid
- Filter buttons toggle active state and trigger Isotope filtering
- Blur-up image loading with placeholder

### Project Management

**Projects are managed via CSV** (`projects.csv`) for easy editing without touching HTML.

- **Google Sheets:** [Edit Projects](https://docs.google.com/spreadsheets/d/18s9pYOE9a9m2F4eE6GBbd99M2mmo7NP9yCP_6qgfl4M/edit?gid=0#gid=0)
- **CSV Format:** Supports both comma-separated (CSV) and tab-separated (TSV) formats
- **Fields:** id, title, url, description, tools, categories, image

**To add a new project:**
1. Add WebP image to `img/projects/tall/`
2. Add new row to `projects.csv` or edit in Google Sheets
3. Download and replace `projects.csv` if edited in Sheets
4. Projects load dynamically on page load

### Image Optimization

- **Format:** WebP (85% smaller than original PNGs)
- **Dimensions:** 500 x 1082 (captured at iPhone XR size: 414 x 896)
- **Loading:** Blur-up technique with `placeholder.jpg` (3.5KB) loading first
- **Styling:** 3D phone mockup with perspective transforms

### Project Structure

- **`index.html`** - Single-page site with dynamically loaded projects
- **`projects.csv`** - Project data (managed via Google Sheets)
- **`css/`** - Compiled CSS and FontAwesome assets
- **`img/projects/tall/`** - Project thumbnails (WebP format)
- **`fonts/`** - Custom fonts (Despairs font family)
- **`design/`** - Design resources

## Development Notes

- **Must use dev server** (`npm run dev`) for local development - opening `index.html` directly will fail due to CORS restrictions
- The site uses Isotope.js (loaded via CDN) for the filterable project grid
- Projects are categorized as: code, viz (data visualization), ui (design), art
- FontAwesome is included for icons (email, GitHub, LinkedIn)
- Google Analytics is integrated (tracking ID: G-J1STH8DQL9)
- Projects load dynamically from CSV on page load
- CSV parser auto-detects comma or tab separators (handles Google Sheets paste)

## Deployment

Standard static site deployment - no special build process needed:
```bash
git add .
git commit -m "Update projects"
git push
```

The CSV file is served as a static asset just like HTML, CSS, and images. CORS only affects local file:// protocol development.
