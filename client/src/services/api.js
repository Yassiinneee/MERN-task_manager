export const fetchTasks = async (params) => {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'All') query.append('status', params.status);
  if (params?.priority && params.priority !== 'All') query.append('priority', params.priority);
  if (params?.category && params.category !== 'All') query.append('category', params.category);
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`/api/tasks?${query.toString()}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Failed to fetch tasks');
  return json.data;
};

export const createTaskAPI = async (taskData) => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Failed to create task');
  return json.data;
};

export const updateTaskAPI = async (id, taskData) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Failed to update task');
  return json.data;
};

export const deleteTaskAPI = async (id) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Failed to delete task');
};
