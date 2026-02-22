import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  createTask,
  deleteTask,
  filterTasks,
  getTasks,
  searchTasks,
  updateStatus,
  updateTask
} from "../api/tasks.js";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import Pagination from "../components/Pagination.jsx";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

export default function DashboardPage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [editingTask, setEditingTask] = useState(null);

  const queryKey = useMemo(() => `${page}-${search}-${filter}`, [page, search, filter]);

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (search.trim()) {
        data = await searchTasks({ title: search.trim(), page, size: 8 }, token);
      } else if (filter !== "ALL") {
        data = await filterTasks({ status: filter, page, size: 8 }, token);
      } else {
        data = await getTasks({ page, size: 8 }, token);
      }
      setTasks(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "Unable to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [queryKey]);

  const handleCreate = async (payload) => {
    setError("");
    try {
      await createTask(payload, token);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      setError(err.message || "Unable to create task");
    }
  };

  const handleUpdate = async (payload) => {
    if (!editingTask) return;
    setError("");
    try {
      await updateTask(editingTask.id, payload, token);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      setError(err.message || "Unable to update task");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteTask(id, token);
      loadTasks();
    } catch (err) {
      setError(err.message || "Unable to delete task");
    }
  };

  const handleCycleStatus = async (task) => {
    const current = STATUSES.indexOf(task.status);
    const nextStatus = STATUSES[(current + 1) % STATUSES.length];
    try {
      await updateStatus(task.id, nextStatus, token);
      loadTasks();
    } catch (err) {
      setError(err.message || "Unable to update status");
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Command center</h1>
          <p>Focus on what matters next.</p>
        </div>
        <div className="dashboard-controls">
          <input
            className="search-input"
            placeholder="Search by title"
            value={search}
            onChange={handleSearchChange}
          />
          <select className="status-filter" value={filter} onChange={handleFilter}>
            <option value="ALL">All statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="dashboard-grid">
        <TaskForm
          initialValues={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={editingTask ? () => setEditingTask(null) : null}
        />
        <div className="task-column">
          {loading ? (
            <div className="card loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="card empty-state">
              <h3>No tasks yet</h3>
              <p>Start by creating your first task.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDelete}
                onStatus={handleCycleStatus}
              />
            ))
          )}
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
}
