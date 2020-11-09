# Technical assignment for ABN AMRO

## Assignment:

The goal is to display a few popular TV shows based on their rating and genre on a
dashboard and when the user clicks on a TV show then the details of that TV show should
be displayed on another screen. Also, the user should be able to search for a TV show to get
the details.

## Demo

![](app-demo.gif)

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

## Architecture

Any app becomes big sooner or later. To maintain the ability to support it in the long term, you need to divide the application into functional blocks. This is why my app allocates each block as a separate unit. The app contains the following blocks:

-   component - is a presentation
-   container - is a glue between a component and data
-   view-model - is the logic of the atomic part of the application
-   store - is a shared application data storage
-   repository - is an interaction with data sources (a server for example)
-   service - an entity that performs other operations
