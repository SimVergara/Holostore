# Holostore

## Mission Statement

Build a Celebrity Hologram Store application which includes a frontend and backend API, along with a database. 

## Setup

You will need to set up your database and change the `server/config/config.json` to match the credentials you set up. To set up the database:
  1. install `mysql` as well as `sequelize-cli`
  2. `cd server`
  3. `../node_modules/.bin/sequelize db:migrate`
    - your database should now be set up and ready to use (no data in it)

Continue by running the dev script below. 

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. There is only one basic test case that checks for page rendering.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
