# Four Pillars Puzzle

A browser puzzle game rendered with the HTML Canvas API.

Each move rotates 3 pillars at once: the pillar you click and its 2 linked neighbors. The goal is to match all pillar rotations to the target pattern represented by the colored connector lines.

## Tech Stack

- JavaScript (ES modules)
- Webpack 5
- HTML5 Canvas
- CSS

## Prerequisites

- npm

## Development

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build:prod
```

3. Run locally by opening `index.html` in your browser.

## Deployment

1. Install dependencies:

```bash
npm ci
```

2. Build the project:

```bash
npm run build:dev
```

3. Publish/deploy these files:

- `index.html`
- `styles.css`
- `dist/bundle.js`
- `src/images/`
- `fonts/`

Build output is generated in `dist/bundle.js`.
