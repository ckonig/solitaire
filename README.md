# Solitaire React App

![CICD Workflow](https://github.com/ckonig/solitaire/workflows/CI/badge.svg?branch=master)

An implementation of the classic Solitaire game.\
Serves as general playground for JavaScript, TypeScript, React and (S)CSS.

[Try it out](https://ckonig.github.io/solitaire)

## Development

```bash
git clone git@github.com:ckonig/solitaire.git
cd solitaire
npm install
npm start
```

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run predeploy`

Builds the latest version of the game.

### `npm run analyze`

Analyze the dependencies, module sizes and code splitting.

### `npm run deploy`

Builds the latest version of the game and deploys it to the [github page](https://ckonig.github.io/solitaire/).

Enabled by [gh-pages](https://www.npmjs.com/package/gh-pages).
