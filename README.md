# StepOne — Full-Stack TODO App

A clean, full-stack TODO application built with **React**, **Node.js/Express**, and **MongoDB**.

## Project Structure

```
StepOne/
├── client/          # React frontend (Create React App)
│   └── README.md
├── server/          # Express backend
│   └── README.md
└── README.md        ← you are here
```

## Quick Start

### 1. Start MongoDB
Make sure MongoDB is running locally (`mongod`) or use a MongoDB Atlas connection string.

### 2. Backend
```bash
cd server
cp .env.example .env   # edit MONGO_URI if needed
npm install
npm run dev
```

### 3. Frontend
```bash
cd client
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Features
- View, create, edit, and delete todos
- Toggle done/undone with optimistic UI updates
- Loading and error states handled gracefully
- Form validation on both client and server
- Completed tasks shown with strikethrough + faded style
