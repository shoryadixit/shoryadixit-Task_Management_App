# Task Management Application

## Overview

This project is a full-stack task management application built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js). The application allows users to manage tasks, including creating, reading, updating, and deleting tasks. It also features an analytics dashboard for task distribution, completion rates, and upcoming deadlines.

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **Pagination**: Navigate through tasks with pagination.
- **Filtering**: Filter tasks by due date, priority, and search keywords.
- **Analytics Dashboard**: View task distribution, completion rates, and upcoming deadlines.
- **JWT Authentication**: Secure user sessions with JSON Web Tokens (JWT).

## Technologies

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT
  - Authentication
  
- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - Recoil (for state management)

- **Database**: MongoDB

## Setup

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/shoryadixit/shoryadixit-Task_Management_App.git
   cd backend
   ```

2. **Install Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory and add the following details of the .env.example details.

4. **Start the Server**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the `frontend` directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the Frontend Development Server**

   ```bash
   npm run dev
   ```
