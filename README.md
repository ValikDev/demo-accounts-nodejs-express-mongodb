# Node.js + Express + TypeScript API

A modular, scalable Express API built with TypeScript and ESLint Stylistic.

## Setup

Install dependencies:

```bash
npm install
```

Run in development (uses ts-node + nodemon):

```bash
npm run dev
```

Build & run compiled output:

```bash
npm run build
npm start
```

Notes:
- Environment variables are read directly from process.env in `src/config/env.ts`.
- The scaffold includes an `Account` entity (modules/accounts) demonstrating the CRUD structure.

