# 📁 FileAnywhere - File Sharing Web Application

**FileAnywhere** is a secure, responsive file-sharing platform that allows users to upload, manage, and share documents (PDFs, images, etc.) up to **10MB**. It features modern UI/UX with drag-and-drop support, file preview, and shareable download links.

---

## 🚀 Features

* 🔐 **JWT Authentication** — Sign up, log in, and log out securely.
* 📄 **File Upload** — Upload PDF, JPG, PNG, DOC, DOCX files up to 10MB.
* 🔗 **Downloadable Links** — Generate unique links to share files.
* 📋 **File Management** — View, download, and delete uploaded files.
* 🎨 **Modern UI** — Gradient background, animations, responsive navbar, and hover effects.
* 🛡️ **Security** — Sanitized filenames, file-type restrictions, JWT-protected APIs.

---

## 🛠️ Tech Stack

### Frontend

* **React.js** (TypeScript)
* **Vite** (Build Tool)
* **Tailwind CSS**
* **Lucide React** (Icons)
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** (via Mongoose)
* **JWT** (Authentication)
* **Multer** (File Uploads)
* **Bcrypt.js** (Password Hashing)

---

## 📁 Project Structure

```
fileanywhere/
├── backend/
│   ├── models/ (User.js, File.js)
│   ├── routes/ (auth.js, files.js)
│   ├── middleware/ (authMiddleware.js)
│   ├── uploads/ (Stored files)
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ (FileUpload.tsx, FileList.tsx, Navbar.tsx)
│   │   ├── pages/ (Dashboard.tsx, Login.tsx, Register.tsx)
│   │   ├── App.tsx, main.tsx, index.css
│   ├── public/
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## 💻 Setup Instructions

### ✅ Prerequisites

* Node.js v16+
* MongoDB (Local or Atlas)
* Git
* Modern browser

---

### 🔧 Backend Setup

```bash
git clone <your-repo-url>
cd fileanywhere/backend
npm install
```

Create a `.env` file:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

Start the backend server:

```bash
npm start
# Server running at http://localhost:5000
```

---

### 🌐 Frontend Setup

```bash
cd fileanywhere/frontend
npm install
```

Ensure Tailwind CSS is configured in `tailwind.config.js`:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1e3a8a',
        'primary-light': '#3b82f6',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
```

In `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  min-height: 100vh;
}
```

Add Google Fonts (`frontend/public/index.html`):

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
```

Vite config in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

Start the frontend dev server:

```bash
npm run dev
# Frontend running at http://localhost:3000
```

---

## ⚙️ Usage

* Open `http://localhost:3000`
* Register or log in
* Upload files via drag-and-drop
* View/download/delete files with animations

---

## ⚠️ Troubleshooting

* MongoDB connection errors? Check `MONGO_URI`.
* JWT issues? Ensure `JWT_SECRET` is in `.env`.
* CORS issues? Confirm backend allows `http://localhost:3000`.
* Missing frontend styles? Check Tailwind and Vite setup.

---

## 📥 Submission

Push code to GitHub:

```bash
git add .
git commit -m "Complete FileAnywhere project"
git push origin main
```

Submit the repo URL to:
[https://forms.gle/n82Erz4ZpEgu9B9z7](https://forms.gle/n82Erz4ZpEgu9B9z7) by **June 14, 2025**.

---

## 📢 Contact

For any queries or issues, please email: **[hr@istechnova.in](mailto:hr@istechnova.in)**
