<div align="center">

# 📋 MERN Task Manager

### A Modern Full-Stack Task Management Application built with the MERN Stack deploying inside Microsoft Azure

<img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb">
<img src="https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react">
<img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js">
<img src="https://img.shields.io/badge/Microsoft%20Azure-0089D6?style=for-the-badge&logo=microsoftazure&logoColor=white">

<br>



A responsive full-stack task management application that enables users to create, manage, update, and organize daily tasks efficiently using the **MERN Stack (MongoDB, Express.js, React, and Node.js)**.

</div>

---

# 📖 Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Application Architecture
- Getting Started
- Installation
- Environment Variables
- Running the Project
- API Endpoints
- Database Schema
- Screenshots
- Future Improvements
- Contributing
- License
- Author

---

# 📌 Overview

The **MERN Task Manager** is a complete CRUD application designed to simplify task organization.

The application demonstrates best practices for full-stack web development by combining:

- Modern React frontend
- RESTful Express API
- MongoDB database
- Mongoose ODM
- Responsive user interface
- Clean project architecture

Users can create, edit, delete, and monitor their tasks while interacting with a clean and intuitive interface.

---

# ✨ Features

## Task Management

- ✅ Create new tasks
- ✅ Update existing tasks
- ✅ Delete tasks
- ✅ View all tasks
- ✅ Mark task status
- ✅ Real-time task statistics

## Backend

- RESTful API
- Express.js server
- MongoDB integration
- Mongoose Models
- Error handling middleware
- Modular architecture

## Frontend

- React Components
- Responsive Layout
- Dynamic UI updates
- API integration
- Modern styling

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- JavaScript (ES6+)
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Development Tools

- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```
MERN-task_manager/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskStats.jsx
│   │   │
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── index.html
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── data/
│   │   └── tasks.json
│   │
│   └── server.js
│
├── Screenshots/
├── package.json
└── README.md
```

---

# 🏗 Application Architecture

```
                React Frontend
                      │
                      │ HTTP Requests
                      ▼
              Express REST API
                      │
          Controllers & Routes
                      │
                      ▼
                 Mongoose ODM
                      │
                      ▼
                 MongoDB Database
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure the following software is installed:

- Node.js
- npm
- MongoDB (Local or Atlas)
- Git

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/MERN-task_manager.git

cd MERN-task_manager
```

## Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
```

If using MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

---

# ▶️ Running the Project

Start the application:

```bash
npm run dev
```

The application will start on:

```
http://localhost:5000
```


---

# ☁️ Azure Deployment Guide

This project can be deployed to **Microsoft Azure App Service**, allowing the Node.js backend to run in the cloud while connecting securely to a MongoDB Atlas database.

## Prerequisites

Before deploying, ensure you have:

- An active Azure account
- Azure App Service created
- MongoDB Atlas database
- Git installed
- Azure CLI (optional)

---

## Step 1 — Prepare the Application

Verify that your application:

- Uses the `PORT` environment variable

```javascript
const PORT = process.env.PORT || 5000;
```

- Connects to MongoDB using environment variables

```javascript
mongoose.connect(process.env.MONGO_URI);
```

- Has a production start script in `package.json`

```json
"scripts": {
  "start": "node server.js"
}
```

---

## Step 2 — Create an Azure Web App

1. Sign in to the Azure Portal.
2. Create a **Resource Group**.
3. Create an **App Service Plan**.
4. Create a new **Web App**.
5. Select:

- Runtime Stack: **Node.js**
- Operating System: **Linux**
- Region: Your preferred location

---

## Step 3 — Configure Environment Variables

Inside the Azure Portal:

```
Web App
    ↓
Settings
    ↓
Environment Variables
```

Add the following variables:

| Name | Value |
|------|-------|
| PORT | 5000 |
| MONGO_URI | Your MongoDB Atlas Connection String |
| NODE_ENV | production |

Save the configuration and restart the Web App.

---

## Step 4 — Deploy the Application

Deployment options include:

### GitHub Actions (Recommended)

1. Push the project to GitHub.
2. Open the Azure Web App.
3. Navigate to:

```
Deployment Center
```

4. Select:

- Source: GitHub
- Repository
- Branch

Azure automatically generates a GitHub Actions workflow for continuous deployment.

---

### Local Git Deployment

Configure Azure Git deployment:

```bash
git remote add azure <Azure-Git-URL>

git push azure main
```

---

### Azure CLI Deployment

```bash
az login

az webapp up \
  --name your-app-name \
  --resource-group your-resource-group \
  --runtime "NODE|20-lts"
```

---

## Step 5 — Verify Deployment

Once deployment is complete, open:

```
https://your-app-name.azurewebsites.net
```

If the API is working correctly, your application is successfully deployed.

---

## Deployment Workflow

```
Developer
     │
     ▼
 GitHub Repository
     │
 GitHub Actions
     │
     ▼
 Azure App Service
     │
     ▼
 Express.js Server
     │
     ▼
 MongoDB Atlas
```

---

## Azure Services Used

| Service | Purpose |
|----------|----------|
| Azure App Service | Hosts the Node.js application |
| Azure Deployment Center | Continuous Deployment |
| Azure Monitor | Application monitoring |
| Environment Variables | Secure configuration management |
| MongoDB Atlas | Cloud-hosted database |

---

## Benefits of Azure Deployment

- Cloud hosting with high availability
- Automatic deployments from GitHub
- Secure environment variable management
- Built-in monitoring and diagnostics
- Easy scalability
- HTTPS enabled by default
- Reliable production hosting

---

## Expected Deployment Architecture

```
                Users
                  │
                  ▼
        Azure App Service
                  │
          Express REST API
                  │
             Mongoose ODM
                  │
                  ▼
           MongoDB Atlas
```

Azure App Service provides a reliable and scalable hosting environment for the backend while MongoDB Atlas manages persistent cloud database storage, enabling a production-ready MERN application.

---

# 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/tasks | Retrieve all tasks |
| GET | /api/tasks/:id | Retrieve a task |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---

# 🗄 Database Schema

Example Task document:

```javascript
{
    title: String,
    description: String,
    completed: Boolean,
    createdAt: Date,
    updatedAt: Date
}
```

---

# 📸 Screenshots

The project includes screenshots demonstrating:

- Application Interface
- MongoDB Connection
- GitHub Actions Workflow
- Azure Deployment
- Local Development
- Build Process
- Deployment Status

Screenshots are available inside the **Screenshots/** directory.

---

# 🚀 Future Improvements

- User Authentication
- JWT Authorization
- Task Categories
- Due Dates
- Priority Levels
- Search Tasks
- Filter Tasks
- Pagination
- Notifications
- Dark Mode
- Drag & Drop
- File Attachments
- Team Collaboration
- Docker Support
- Unit Testing
- CI/CD Pipeline Enhancements

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request.

---

# 📄 License

This project is available for educational purposes.

Feel free to modify and improve it for learning or personal projects.

---

# 👨‍💻 Author

**Yassine Kaltoum**

Software & Network Engineering

- Full Stack Development
- MERN Stack
- MongoDB
- React
- Node.js
- Express.js
- REST APIs
- Database Design
- Deployment using Cloud (Microsoft-Azure)

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

**Happy Coding! 🚀**

</div>
