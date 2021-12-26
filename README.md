# Solitaire React App

![CICD Workflow](https://github.com/ckonig/solitaire/workflows/CI/badge.svg?branch=main)

![Cypress Workflow](https://github.com/ckonig/solitaire/workflows/Cypress%20Free/badge.svg?branch=main)

An implementation of the classic Solitaire game.\
A playground for JavaScript, TypeScript, React, Cypress and (S)CSS.

## Demo

[Try it out](https://ckonig.github.io/solitaire)

## Development

```bash
git clone git@github.com:ckonig/solitaire.git
cd solitaire
yarn
yarn start
```

When working with Visual Studio Code, use the `dev` task to run `tsc` and `es-lint` as separate tasks with the correct error catchers.

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn run predeploy`

Builds the latest version of the game.

### `yarn run analyze`

Analyze the dependencies, module sizes and code splitting.

### `yarn run deploy`

Builds the latest version of the game and deploys it to the [github page](https://ckonig.github.io/solitaire/).\
Enabled by [gh-pages](https://www.npmjs.com/package/gh-pages).

### `yarn cypress run`

Runs the cypress tests once in headless mode.

### `npx cypress open`

Launches the interactive cypress test runner.
