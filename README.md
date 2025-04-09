# ReactJS Frontend Testing Assignment

This project is a Cypress-based test suite designed to validate key UI components and functionalities on the [ReactJS Homepage](https://react.dev), as part of a frontend developer student assignment.

## Assignment Goals

Analyze the React homepage and create automated tests using Cypress. Cover layout, interactivity, accessibility, and feature behavior.

## Features Tested

### Header Component
- Visibility of logo and navigation links
- Responsive design checks
- Theme toggle functionality

### Footer Component
- Visibility of section links (Learn React, Community, etc.)
- Visibility and correctness of social media icons (Facebook, Twitter, GitHub, Bluesky)
- Link URL validation

### Search Functionality
- Search bar activation
- Typing and navigating results
- Saving and verifying starred searches

### Body Interactions
- Code line highlighting on hover
- Highlight box visibility

## Technology Stack

- Cypress – E2E testing framework
- JavaScript (ES6+)
- Page Object Model structure for test maintainability

## Project Structure

```
ReactJS-frontend-tests/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── header.cy.js
│   │   ├── footer.cy.js
│   │   └── body.cy.js
│   ├── support/
│   │   ├── pageObjects/        # POM files
│   │   │   ├── header.js
│   │   │   ├── footer.js
│   │   │   └── body.js
├── cypress.config.js
└── README.md
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/chengoiz/ReactJS-frontend-tests.git
cd ReactJS-frontend-tests
```

2. Install dependencies
```bash
npm install
```

3. Run Cypress
```bash
npx cypress open
```
