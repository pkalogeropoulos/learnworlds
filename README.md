# 🚀 LearnWorlds - Assignment for QA Automation Lead Software Engineer


![License](https://img.shields.io/github/license/pkalogeropoulos/learnworlds)
![Issues](https://img.shields.io/github/issues/pkalogeropoulos/learnworlds)
![Stars](https://img.shields.io/github/stars/pkalogeropoulos/learnworlds?style=social)
![E2E Tests](https://github.com/pkalogeropoulos/learnworlds/actions/workflows/playwright.yml/badge.svg)

---

## ✨ Overview

Quick overview of the submitted work:
1) School url = "https://pkalogerop.learnworlds.com"
2) Test Plan, Test Data strategy and lead skills Q&A can be found in this project **documents** folder.
3) CI config can be found in the **.github\workflows\playwright.yml**

## Execution and basic configuration
**Prerequisites (basic assumption is that you already have installed all Playwright related thingies)**
(Optional for Allure) Java ≥ 11

## Environment Configuration
For local tests you should use the following ".env.local" file:
```
DEMO_COUPON_NAME=pkalogerop-coupon
DEMO_COURSE_INITIAL_PRICE=10
DEMO_COUPON_DISCOUNTED_PRICE=5
DEMO_SCHOOL_NAME=pkalogerop
DEMO_SCHOOL_URL=https://pkalogerop.learnworlds.com
DEMO_COURSE_NAME=Intro to Ai
DEMO_COURSE_ID=699e693a2a1dfdd7190737f2
DEMO_NAME_01={adminUsernameHere}
DEMO_PASS_01={adminPasswordHere}
DEMO_USER_WITH_COUPON=testuser+197@gmail.com
DEMO_USER_WITHOUT_COUPON=testuser+890@gmail.com
STORAGE_STATE_PATH=storage/admin.state.json
```
For remote runs (via Github Actions) all necessary info are preconfigured in the yml file (as well as the secrets section for sensitive data).

**Run All Tests (Chromium)**
npx playwright test --project=chromium

**Continuous Integration (CI)**
Tests are automatically executed via GitHub Actions on:
1) Push to main
2) Pull requests
3) (No nightly builds are enabled for now)

## Built with:

- **TypeScript**
- **Node.js**
- Modular architecture principles
- CI/CD compatibility
- Clean code standards

---

## 🔥 Features

- ✅ Strict TypeScript configuration
- ✅ Modular folder structure
- ✅ Test-ready setup
- ✅ Linting & formatting support
- ✅ CI-ready architecture
- ✅ Environment configuration support
- ✅ Scalable and extensible design

---

🏗 Project Structure
```
learnworlds/
│
├── .github/
│   └── workflows/
│       └── e2e.yml                # GitHub Actions CI pipeline
│
├── src/
│   ├── api/                       # API layer (request payloads, API clients, schemas)
│   │   ├── AuthorApiClient.ts
│   │   ├── CreateUserPayload.ts
│   │   └── UserPayloadFactory.ts
│   │
│   ├── business/                  # Business logic layer (flows & orchestration)
│   │   ├── NavigationHandler.ts
│   │   └── SessionHandler.ts
│   │   └── CookieHandler.ts
│   │
│   ├── config/                    # Environment configuration & test data access
│   │   └── TestParams.ts
|   |   └── User.ts
|   |
│   ├── components/                # Page Object Model abstractions for common ui models
│   │   └── CookiesBannerComp.ts
│   │   └── HeaderComp.ts
│   │
│   ├── pages/                     # Page Object Model (UI abstraction)
│   │   ├── HomePage.ts
│   │   ├── SchoolHomePage.ts
│   │   ├── CoursesPage.ts
│   │   ├── PaymentPage.ts
│   │   ├── ThankYouPage.ts
│   │   ├── UsersPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── TransactionsPage.ts
│   │   └── AdminPage.ts
│   │
│
├── tests/
│   ├── assertions/
│   │   └── PaymentAssertions.ts                # Custom assertions/verifications
│   │   └── UserAssertions.ts                # Custom assertions/verifications
│   │
│   ├── fixtures/
│   │   └── test.ts                # Custom Playwright fixtures (POM injection)
│   │
│   ├── e2e/                        # End-to-end UI scenarios
│   │   ├── payments.spec.ts
│   │   ├── users.spec.ts
│   │   └── courses.spec.ts
│   │
│   └── api/                        # API-only test scenarios
│       └── create-user.spec.ts
│
├── storage/                        # Stored authentication states
│   └── admin.state.json
│
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json
└── README.md
```

---

## 📊 Reporting

This project integrates **Allure Reports** to provide rich, interactive test reporting with detailed insights into test execution.

Allure helps visualize:

- ✅ Test results
- ❌ Failures & stack traces
- 📎 Attachments (logs, screenshots, API responses)
- ⏱ Execution time
- 📈 Historical trends
- 🧪 Test categorization (epics, features, stories)
![Screenshot 2026-03-02 011221](https://github.com/user-attachments/assets/5cadafa7-d53f-452f-ab89-84f4e19216d0)

Here is also the default HTML Reporter
![reporter](https://github.com/user-attachments/assets/7b04e0ed-e3be-48bb-9c72-e2a639b7bd77)


---

**Tests info**

4 tests for ui and one for Api were created. 
Tests for ui can accessed here: payments.spec.ts
Api tests can be accessed here: api.spec.ts (user creation)

All necessary test params can be found in env.local file. Note that you will need to set your own user and/or school if you want to expand this more.
  
