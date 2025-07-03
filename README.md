# Backend

## 🛡️ Auth API

A secure and scalable authentication REST API built with **Express.js**, tested with **Jest + Supertest**, and documented using **Swagger**. Ideal for modern full-stack applications.

---

### 🚧 Project Status: In Progress

This project is actively being developed. Core features like authentication, CI/CD, and documentation are working, but the API is still evolving. Feedback and contributions are welcome!

---

### 🚀 Live Demo

- **API Base URL:** [`https://express-api-vo8j.onrender.com`](https://express-api-vo8j.onrender.com/)
- **Swagger Docs:** [`https://express-api-vo8j.onrender.com/api-docs`](https://express-api-vo8j.onrender.com/api-docs)

> Replace the above links with your actual Render deployment URLs.

---

### 🧰 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Atlas for production, In-memory for testing)
- **Testing:** Jest + Supertest + mongodb-memory-server
- **Docs:** Swagger (OpenAPI 3.0)
- **CI:** GitHub Actions

---

### ✅ Features

- 🔐 **Authentication Routes**
  - Sign-up, Sign-in, Sign-out
- 🧪 **Comprehensive Tests**
  - Fast, isolated tests using in-memory MongoDB
- ⚙️ **CI Pipeline**
  - Runs tests on every push / PR via GitHub Actions
- 🧾 **Swagger UI**
  - Auto-generated, interactive API documentation
- 🌐 **Deployed on Render**
  - Publicly accessible for testing/integration

---

### 📦 Installation

```bash
git clone https://github.com/suzuki-02/Express-API.git
cd your-repo
npm install
```
---

# Frontend

A simple and styled frontend built with **React**, **TypeScript**, and **Tailwind CSS**, featuring authentication (sign-up/sign-in) flows, protected routes, and context-based state management.

---

### ⚙️ Tech Stack

- **Frontend Framework:** React + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Notifications:** React Toastify

---

### ✨ Features

- 🔐 Authentication (Sign Up / Sign In) UI
- 💾 Persistent session using `localStorage`
- 🎨 Modern styling with Tailwind
- 🧠 Global auth state via Context
- ✅ Error handling with toast messages

---

### 📦 Installation

```bash
git clone https://github.com/suzuki-02/Express-API.git
cd Express-API
npm install
cd frontend
npm install
npm run dev
```