FileAnywhere - File Sharing Web Application
Project Overview
FileAnywhere is a secure and responsive file-sharing platform where users can sign up, log in, upload files (PDFs, images, or documents up to 10MB), generate unique downloadable links, view their uploaded files, and delete them. The application features a modern, vibrant UI with drag-and-drop file uploads, hover effects, and a fully responsive design. It uses JWT for authentication, Node.js with Express for the backend, MongoDB for data storage, and a React frontend built with Vite and styled with Tailwind CSS.
Tech Stack

Frontend:
React.js (TypeScript)
Vite (build tool)
Tailwind CSS (styling)
Lucide React (icons)
Axios (API requests)


Backend:
Node.js
Express.js
MongoDB (via Mongoose)
JWT (JSON Web Tokens for authentication)
Multer (file uploads)
Bcrypt.js (password hashing)


File Storage: Local filesystem (/uploads directory)
Dependencies:
Frontend: react, react-dom, react-router-dom, axios, lucide-react, tailwindcss, vite
Backend: express, mongoose, jsonwebtoken, bcryptjs, multer, dotenv, cors



Features

User Authentication: Sign up, log in, and log out using JWT-based authentication.
File Upload: Upload files (PDF, JPG, JPEG, PNG, DOC, DOCX) with a 10MB size limit, including drag-and-drop support and upload progress tracking.
Shareable Links: Generate unique download links for uploaded files.
File Management: View a list of uploaded files with icons based on file type, file size, and upload date; delete files securely.
Responsive Design: Fully responsive UI with a modern gradient-based aesthetic, hover effects, animations, and a mobile-friendly navbar.
Security: Sanitized filenames, restricted file types, and secure JWT authentication.

Project Structure
fileanywhere/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── File.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── files.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   ├── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.tsx
│   │   │   ├── FileList.tsx
│   │   │   ├── Navbar.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   ├── public/
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── package.json
├── README.md

Prerequisites

Node.js: v16 or higher
MongoDB: Local instance or MongoDB Atlas
Git: For cloning the repository
Browser: Modern browser (Chrome, Firefox, etc.) for testing

Setup Instructions
Backend Setup

Clone the Repository:
git clone <your-repo-url>
cd fileanywhere/backend


Install Dependencies:
npm install


Configure Environment Variables:

Create a .env file in the backend/ directory with:MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000


Replace <your-mongodb-connection-string> with your MongoDB connection string (e.g., MongoDB Atlas or mongodb://localhost:27017/fileanywhere).
Replace <your-jwt-secret> with a secure random string (e.g., generated via crypto.randomBytes(32).toString('hex')).


Start the Backend Server:
npm start


The server will run on http://localhost:5000.



Frontend Setup

Navigate to Frontend Directory:
cd fileanywhere/frontend


Install Dependencies:
npm install


Configure Tailwind CSS:

Ensure tailwind.config.js exists in frontend/:/** @type {import('tailwindcss').Config} */
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


Ensure index.css includes Tailwind directives:@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  min-height: 100vh;
}




Add Google Fonts:

In frontend/public/index.html, add the Inter font in the <head>:<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">




Configure Vite:

Ensure vite.config.ts exists in frontend/:import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});




Start the Frontend Development Server:
npm run dev


The frontend will run on http://localhost:3000.



Database Setup

MongoDB: Ensure MongoDB is running locally or use MongoDB Atlas.
If local, start MongoDB with mongod.
If using Atlas, obtain the connection string and update MONGO_URI in backend/.env.


The backend automatically creates a fileanywhere database with users and files collections upon first use.

Usage

Access the Application:

Open http://localhost:3000 in your browser.
Sign up or log in to access the dashboard.
Upload files via drag-and-drop or file selection.
View, download, or delete files from the file list.


Features in Action:

Sign Up/Login: Use the /register or /login routes with email and password. Passwords are hashed securely.
File Upload: Drag-and-drop or select files (PDF, JPG, JPEG, PNG, DOC, DOCX, max 10MB). A progress bar shows upload status.
File List: Displays files with icons (based on file type), size, and upload date. Click to download or delete with confirmation.
Responsive UI: Adapts to mobile, tablet, and desktop with a gradient-based design, hover effects, and animations.
Mobile Menu: Navbar includes a collapsible menu for mobile devices.



Notes

File Security: Filenames are sanitized with timestamps to prevent injection. Only allowed file types are accepted, with a 10MB size limit enforced by Multer.
Authentication: JWT tokens are stored in localStorage and sent in API request headers for protected routes.
Responsive Design: Uses Tailwind CSS with responsive utilities (sm:, md:, lg:) for a seamless experience across devices. The dashboard uses a grid layout for larger screens.
Styling: Features gradient backgrounds, frosted glass effects (backdrop-blur), hover animations (scale, color transitions), and file-type-specific icons via Lucide React.
Frontend Enhancements:
Drag-and-drop file uploads with visual feedback.
Upload progress bar and loading spinners.
Password visibility toggle for login/register.
Mobile-friendly navbar with toggle menu.
File list with confirmation dialogs for deletion.



Submission

Push the code to a GitHub repository:git add .
git commit -m "Complete FileAnywhere project"
git push origin main


Submit the repository URL to https://forms.gle/n82Erz4ZpEgu9B9z7 by June 14, 2025.

Troubleshooting

Backend Errors:
Ensure MongoDB is running and MONGO_URI is correct.
Check JWT_SECRET is set in .env.


Frontend Errors:
Run npm install in frontend/ if dependencies are missing.
Verify vite.config.ts and tailwind.config.js are configured correctly.


CORS Issues: Ensure the backend allows requests from http://localhost:3000 (handled by cors middleware).
Contact: For issues, email hr@istechnova.in.

Example package.json Files
backend/package.json
{
  "name": "fileanywhere-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.0",
    "multer": "^1.4.5-lts.1"
  }
}

frontend/package.json
{
  "name": "fileanywhere-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.4.0",
    "lucide-react": "^0.263.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}

