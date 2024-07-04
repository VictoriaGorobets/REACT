## Installation and Setup Instructions

To get started with project, follow these steps:

1. **Clone down this repository:**

`git clone https://github.com/VictoriaGorobets/REACT/tree/class-components`

2. **Ensure that Node.js and npm are installed globally on your machine.** Run in terminal:

`node -v && npm -v`

3. **Navigate to the project directory in your terminal.**

4. **Run the following command to install dependencies:**

`npm install`

5. **To start the development server, run:**

`npm start`

6. **Once the server is running, you can visit the app at:**
   [http://localhost:5173/](http://localhost:5173/)


## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Runs the development server using Vite.

### `npm start`

Alias for `npm run dev`.

### `npm run build`

Builds the project for production using TypeScript and Vite.

### `npm run dev:build`

Builds the project in development mode using TypeScript and Vite.

### `npm run format`

Formats code files in the `src` directory using Prettier.

### `npm run ci:format`

Checks code formatting in the `src` directory using Prettier and reports any deviations from the formatting rules.

### `npm run lint`

Runs ESLint to analyze code in the `src` directory, specifically files with extensions `.ts` and `.tsx`. It enforces coding standards and reports any potential errors or warnings.

### `lint:fix`

This script runs ESLint with the `--fix` option, which automatically fixes problems in your code according to the linting rules defined in your configuration files. It's a convenient way to ensure your code adheres to a consistent style and avoids common errors.

### `npm run preview`

Previews the production build using Vite.

### `npm test`

Runs tests using Vitest.

### `npm run prepare`

This script is executed automatically by npm before the package is packed and published. In this case, it sets up Husky, a tool for creating Git hooks.
