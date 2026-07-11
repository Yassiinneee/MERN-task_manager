import React, { useState, useEffect } from 'react';
import { fetchTasks, createTaskAPI, updateTaskAPI, deleteTaskAPI } from './services/api';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { Plus, Search, Layers, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchTasks({
        status: statusFilter,
        priority: priorityFilter,
        category: categoryFilter,
        search: searchQuery
      });
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [statusFilter, priorityFilter, categoryFilter, searchQuery]);

  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      await updateTaskAPI(editingTask._id, taskData);
      showNotification('Task successfully updated!');
    } else {
      await createTaskAPI(taskData);
      showNotification('New task successfully created!');
    }
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTaskAPI(id);
      showNotification('Task successfully deleted!');
      loadTasks();
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskAPI(id, { status });
      showNotification(`Task status updated to ${status}`);
      loadTasks();
    } catch (err) {
      setError(err.message || 'Failed to update status');
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 flex flex-col font-sans select-none">
      {/* Header */}
      <header className="bg-white border-b-2 border-black sticky top-0 z-30 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Layers className="w-6 h-6 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-2xl tracking-tighter uppercase text-slate-900">
                  TaskFlow <span className="text-indigo-600">MERN</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-200 border-2 border-black text-slate-900 flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Database className="w-3 h-3" /> Express + MongoDB
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Beta Launch v1.4 • MVC Controllers & REST API
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadTasks}
              className="p-2.5 rounded-xl border-2 border-black bg-white hover:bg-slate-100 text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all cursor-pointer"
              title="Refresh Tasks"
            >
              <RefreshCw className="w-4 h-4 font-black" />
            </button>
            <button
              onClick={openCreateModal}
              className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black text-sm uppercase rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 font-black" />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Success Toast */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-200 border-2 border-black rounded-2xl text-slate-900 text-sm font-black flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-800" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Toast */}
        {error && (
          <div className="mb-6 p-4 bg-rose-200 border-2 border-black rounded-2xl text-slate-900 text-sm font-black flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-fadeIn">
            <span>{error}</span>
          </div>
        )}

        {/* Task Statistics */}
        <TaskStats tasks={tasks} />

        {/* Search and Filters Toolbar */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-black bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-black bg-white text-slate-900 text-xs font-black uppercase focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-black bg-white text-slate-900 text-xs font-black uppercase focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-black bg-white text-slate-900 text-xs font-black uppercase focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="General">General</option>
                <option value="Development">Development</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
                <option value="Testing">Testing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task List Component */}
        <TaskList
          tasks={tasks}
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          loading={loading}
        />
      </main>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
}
