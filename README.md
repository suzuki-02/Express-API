# Express API – Fullstack Boilerplate

A secure, testable, and extendable **Fullstack application** built with **Express.js**, **MongoDB**, and a modern **React + TypeScript + Tailwind** frontend.

---

## 🛡️ Backend

### 🔐 Auth + Articles API

A secure and scalable REST API with core features:
- Authentication (sign-up/sign-in)
- CRUD operations for articles
- Swagger documentation
- GitHub Actions CI pipeline
- In-memory testing with Jest + Supertest

---

### 🚧 Project Status: In Progress

Currently developing full article CRUD support and refining UI integration. Authentication is stable and production-ready. Folder structure and codebase are being refactored for scalability.

---

### 🧱 Monorepo Structure

This project follows a monorepo layout:
Express-API/
├── backend/
└── frontend/
Each has its own `package.json`, dev server, and README.

---

### 🛠️ Planned Features

- [ ] Markdown support for articles
- [ ] Rich text editor
- [ ] Role-based access control
- [ ] Article tags and filtering

---

### 🌐 Live Demo

- **API Base URL:** [`https://express-api-vo8j.onrender.com`](https://express-api-vo8j.onrender.com/)
- **Swagger Docs:** [`https://express-api-vo8j.onrender.com/api-docs`](https://express-api-vo8j.onrender.com/api-docs)

---

### 🧰 Tech Stack (Backend)

- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Atlas) + mongodb-memory-server (Test)
- **Testing:** Jest + Supertest
- **Docs:** Swagger (OpenAPI 3.0)
- **CI/CD:** GitHub Actions
- **Deployment:** Render

---

### ✅ Backend Features

- 🔐 Auth (Register, Login, Logout)
- 📝 Articles (Create, Read, Update, Delete)
- 🧪 Isolated testing with in-memory MongoDB
- ⚙️ Automated testing pipeline
- 📄 Swagger UI for dev-friendly docs

---

### 📦 Installation

```bash
git clone https://github.com/suzuki-02/Express-API.git
cd Express-API/backend
npm install
npm run dev
```
---

# Frontend

A simple and styled frontend built with **React**, **TypeScript**, and **Tailwind CSS**, featuring authentication (sign-up/sign-in) flows, protected routes, and context-based state management.

---

### ⚙️ Tech Stack

- **Framework:** React (with Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State:** React Context API
- **HTTP:** Axios with custom `safeRequest`
- **UI Kit:** [shadcn/ui](https://ui.shadcn.com/)
- **Notifications:** React Toastify

---

### ✅ Frontend Features

- 🔐 Auth UI (Sign Up / Sign In / Logout / Update Profile)
- 🧠 Global auth state with Context
- 📝 Article Form (Create/Edit)
- 📄 Article Detail + List Pages
- 💅 Reusable UI components
- 🔔 User-friendly toast notifications for actions

---
### 📁 Folder Structure Highlights
src/
│
├── components/
│   ├── auth/          # Auth UI (login, register)
│   ├── articles/      # Article form, list, detail
│   └── shared/        # Reusable buttons, inputs, etc.
│
├── pages/
│   ├── auth/          # Login/Register/UpdateProfile
│   ├── articles/      # ArticleDetail/Edit/New
│   └── Dashboard.tsx
│
├── hooks/             # useAuth, useArticles
├── types/             # Modularized: auth.ts, article.ts, user.ts, api.ts
├── utils/             # Axios instance, safeRequest helper
└── context/           # AuthContext

---

### 📦 Installation

```bash
cd Express-API/frontend
npm install
npm run dev
```