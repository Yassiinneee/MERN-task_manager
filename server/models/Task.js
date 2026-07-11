const mongoose = require('mongoose');
const { getDataStore, saveDataStore, isConnected } = require('../config/db');

// Define Mongoose Schema if connected
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a task description'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium'
    },
    category: {
      type: String,
      enum: ['Development', 'Frontend', 'Backend', 'Design', 'Testing', 'General'],
      default: 'General'
    },
    dueDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const MongooseTask = mongoose.models.Task || mongoose.model('Task', taskSchema);

// Hybrid model wrapper supporting MongoDB or Local JSON Store
class TaskModel {
  static async find(query = {}) {
    if (isConnected()) {
      return await MongooseTask.find(query).sort({ createdAt: -1 });
    }
    const tasks = getDataStore();
    return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  static async findById(id) {
    if (isConnected()) {
      return await MongooseTask.findById(id);
    }
    const tasks = getDataStore();
    return tasks.find(t => t._id === id || t.id === id) || null;
  }

  static async create(data) {
    if (isConnected()) {
      const task = await MongooseTask.create(data);
      return task;
    }
    const tasks = getDataStore();
    const newTask = {
      _id: Date.now().toString(),
      ...data,
      dueDate: data.dueDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.unshift(newTask);
    saveDataStore(tasks);
    return newTask;
  }

  static async findByIdAndUpdate(id, updateData, options = { new: true }) {
    if (isConnected()) {
      return await MongooseTask.findByIdAndUpdate(id, updateData, options);
    }
    const tasks = getDataStore();
    const index = tasks.findIndex(t => t._id === id || t.id === id);
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    saveDataStore(tasks);
    return tasks[index];
  }

  static async findByIdAndDelete(id) {
    if (isConnected()) {
      return await MongooseTask.findByIdAndDelete(id);
    }
    const tasks = getDataStore();
    const index = tasks.findIndex(t => t._id === id || t.id === id);
    if (index === -1) return null;
    
    const deleted = tasks.splice(index, 1)[0];
    saveDataStore(tasks);
    return deleted;
  }
}

module.exports = TaskModel;
