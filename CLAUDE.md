# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Kayla Plunkett (oh-kay-blanket). It's a static site showcasing various projects including code, data visualizations, and art.

## Build Commands

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
- Isotope.js integration for filterable project grid
- Filter buttons toggle active state and trigger Isotope filtering

### Project Structure

- **`index.html`** - Single-page site with project portfolio
- **`css/`** - Compiled CSS and FontAwesome assets
- **`img/`** - Project thumbnails and assets
- **`fonts/`** - Custom fonts (Despairs font family)
- **`design/`** - Design resources

## Development Notes

- The site uses Isotope.js (loaded via CDN) for the filterable project grid
- Projects are categorized as: code, viz (data visualization), ui (design), art
- FontAwesome is included for icons (email, GitHub, LinkedIn)
- Google Analytics is integrated (tracking ID: G-J1STH8DQL9)
