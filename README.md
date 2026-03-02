# 🚀 LearnWorlds Toolkit

> A powerful, production-ready TypeScript toolkit for interacting with LearnWorlds — built for automation, integrations, and developer productivity.

![License](https://img.shields.io/github/license/pkalogeropoulos/learnworlds)
![Issues](https://img.shields.io/github/issues/pkalogeropoulos/learnworlds)
![Stars](https://img.shields.io/github/stars/pkalogeropoulos/learnworlds?style=social)

---

## ✨ Overview

LearnWorlds Toolkit is a clean, strongly-typed, and scalable TypeScript project designed to simplify interaction with LearnWorlds services.

This project focuses on:

- ⚡ Developer productivity
- 🔌 Integration readiness
- 🧱 Modular architecture
- 🧪 Testability
- 📈 Production scalability

Built with:

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
learnworlds/
│
├── src/                # Core source code
├── tests/              # Unit and integration tests
├── dist/               # Compiled output
├── .github/            # CI/CD workflows
│   └── workflows/
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE


Tests info
4 tests for ui and one for Api were created. 
Tests for ui can accessed here: payments.spec.ts
Api tests can be accessed here: api.spec.ts (user creation)

All necessary test params can be found in env.local file. Note that you will need to set your own user and/or school if you want to expand this more.





```bash
git clone https://github.com/pkalogeropoulos/learnworlds.git
cd learnworlds
