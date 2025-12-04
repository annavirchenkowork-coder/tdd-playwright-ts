# 🧪 Playwright TDD Framework (TypeScript)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) <br>
This repository contains a complete **Test-Driven Development (TDD)** automation framework built with **TypeScript** and **Playwright**.
It includes fully runnable end-to-end tests covering essential user flows, a clean Page Object Model, reusable utilities, and a production-ready project structure.

The framework is designed for clarity, maintainability, and easy expansion — suitable for real-world automation work as well as personal projects.

Developers who wish to add new scenarios can follow the recommended **TDD workflow**:

> Write the failing test → implement the minimal solution → refactor → repeat.

This ensures consistency, clean design, and test reliability as the framework grows.

The project validates a complete *self-enrollment and checkout workflow*, including:

- application start
- personal details entry
- payment plan selection
- agreement confirmation
- final payment submission

The goal is to showcase strong *testing architecture*, solid *TDD practices*, and production-quality *Playwright implementation*.

## 📚 Table of Contents
1. [Prerequisites](#Prerequisites)
2. [Environment Setup](#environment-setup)
3. [How to Run Tests](#how-to-run-tests)
4. [Project Structure](#project-structure)
5. [TDD Workflow for Adding New Tests](#tdd-workflow-for-adding-new-tests)
6. [Git Workflow](#git-workflow)<br>

## ⚙️ Prerequisites

Before you start, make sure the following tools are installed on your machine:
- **Node.js** (v18 or higher)
- **npm** (v6 or higher — included with Node.js)
- **Visual Studio Code** (or any IDE of your choice)
- **Git**

## 💻 Environment Setup
This project is fully set up and ready to run. To explore or test it on your own device:

### 1. Clone the Repository
```sh
git clone https://github.com/<your-username>/tdd-playwright-ts.git
```

### 2. Open the Project in Your IDE
Navigate to the cloned folder and open it in VS Code or any preferred editor.

### 3. Install Dependencies
```sh
npm install
```

### 4. Configure Environment Variables
This framework uses sample credentials to run end-to-end tests on the demo environment.

If you’d like to run the tests locally, create a `.env` file in the project root with the following content:
```
SEP_QA_URL = https://qa.sep.tdtm.cydeo.com/taws
SEP_USERNAME = automation-user
SEP_PASSWORD = 123abc

CARD_NUMBER = 4242424242424242
EXPIRATION_DATE = 12/28
CVC = 368
ZIP_CODE = 22102
```

⚠️ These are demo credentials for the public test environment. No personal or sensitive data is involved.

The framework uses the dotenv package to load these variables securely into your local environment.

## ▶️ How to Run Tests
#### Run the full test suite:
```sh
npm test
```

#### Run a specific test folder or file:
```sh
npx playwright test tests/payment-plans
```

#### Generate an HTML report:
```sh
npm run report
```

## 🗂️ Project Structure

```
tdd-playwright-ts
│
├── data
│   └── qa_data.json              # Test data for UI workflows
│
├── test-results
│   └── .last-run.json
│
├── pages                         # Page Object Model classes
│   ├── BasePage.ts
│   ├── LeftMainPage.ts
│   ├── PaymentPlanPage.ts
│   ├── ReviewPaymentPage.ts
│   └── StartApplicationPage.ts
│
├── tests                         # Automated test suites (fully runnable)
│   ├── getting-started
│   ├── payment-plans
│   └── submit-payment
│
├── utilities                     # Shared helper functions
│   ├── qa-data-reader.ts
│   └── sep-ui-utilities.ts
│
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

### Framework Highlights
- **Strong POM architecture** with reusable selectors and methods
- **Organized test folders** aligned with app workflows
- **Centralized test data** for easy maintenance
- **Utility modules** to simplify common UI actions
- **TypeScript static typing** for improved reliability and readability

## 🔧 TDD Workflow for Adding New Tests
This framework **already includes complete, runnable test suites**, but if you want to extend it or create additional scenarios, the recommended process is:
### 1. Write a failing test (Red)
Create a new test file or case that expresses the expected behavior — it should fail initially.
### 2. Implement only the minimum required code (Green)
Add or update:
- Page Object methods
- utilities
- locators
- data <br>

until the test passes.
### 3. Refactor
Once the test passes:
- remove duplication
- rename unclear methods
- clean up logic
- apply DRY principles

The cycle keeps the codebase healthy, scalable, and clean.

## 🌱 Git Workflow
A simple, clean branching strategy is recommended:
### 1. Clone the repo
```sh
git clone https://github.com/<your-username>/tdd-playwright-ts.git
```
### 2. Create a new branch (for enhancements, fixes, or new tests)
```sh
git checkout -b feature/your-feature-name
```
### 3. Commit your changes
```sh
git add .
git commit -m "Add new feature test for payment flow"
```

### 4. Push to GitHub
```sh
git push origin feature/your-feature-name
```

### 5. Open a Pull Request
Submit a PR to the develop branch once your feature or fix is ready for review.

## ✅ Final Note
This framework provides a ready-to-use Playwright setup with complete tests, clean architecture, modular utilities, and a welcoming structure for further expansion.

Whether you’re learning TDD, practicing automation design, or contributing new features, this project gives you a strong foundation — and a clear workflow to grow it confidently. 🚀