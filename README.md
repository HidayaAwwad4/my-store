
## Project Description
MyStore is a simple e-commerce single-page application built with Angular.
It allows users to browse products, view details, add products to a shopping cart,
proceed to checkout, and see a confirmation page after placing an order.

## Features
- **Product List**: Displays all available products using data from `data.json`.
- **Product Details**: Shows detailed info including image, price, and description.
- **Shopping Cart**: Adds/removes items, updates quantities, and calculates total price dynamically.
- **Checkout Form**: Collects user information with validation (name, address, email, card number).
- **Order Confirmation**: Shows a confirmation page with an order number after successful checkout.
- **Persistent Cart**: Cart items are stored in `localStorage` for persistence across sessions.
- **Responsive Design**: The app is styled for a user-friendly experience on desktop and mobile.

## Prerequisites
- Node.js >= 18
- Angular CLI >= 19.2.0

## Development server
To start a local development server, run:

```bash
npm install
ng serve
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


