export default function TaskCard({ task, onEdit, onDelete, onStatus }) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`status-pill ${task.status?.toLowerCase()}`}>{task.status}</span>
      </div>
      <p className="task-description">{task.description || "No description provided."}</p>
      <div className="task-card-actions">
        <button className="btn ghost" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn ghost" onClick={() => onStatus(task)}>
          Change status
        </button>
        <button className="btn danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
