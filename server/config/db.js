const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// In-memory / JSON fallback store for standalone preview reliability
const DATA_FILE = path.join(__dirname, '../data/tasks.json');

const ensureDataFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initialTasks = [
      {
        _id: '1',
        title: 'Review MERN Architecture',
        description: 'Verify controllers, models, and routes separation in Express.',
        status: 'Completed',
        priority: 'High',
        category: 'Development',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Build React Task Components',
        description: 'Create TaskForm and TaskList components with Tailwind CSS styling.',
        status: 'In Progress',
        priority: 'Medium',
        category: 'Frontend',
        dueDate: new Date(Date.now() + 172800000).toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        title: 'Test REST API Endpoints',
        description: 'Verify GET, POST, PUT, and DELETE routes for tasks.',
        status: 'Pending',
        priority: 'Low',
        category: 'Testing',
        dueDate: new Date(Date.now() + 259200000).toISOString(),
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialTasks, null, 2));
  }
};

ensureDataFile();

let isConnected = false;

const connectDB = async () => {
  if (process.env.MONGO_URI) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI,);
      isConnected = true;
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.warn(`MongoDB connection failed: ${error.message}. Falling back to local JSON file storage.`);
    }
  } else {
    console.log('No MONGO_URI provided in environment. Using robust local JSON file storage for tasks.');
  }
};

module.exports = { connectDB, getDataStore: () => {
  try {
    ensureDataFile();
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}, saveDataStore: (tasks) => {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}, isConnected: () => isConnected };
