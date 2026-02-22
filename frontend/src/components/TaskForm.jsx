import { useEffect, useMemo, useState } from "react";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

export default function TaskForm({ initialValues, onSubmit, onCancel }) {
  const defaults = useMemo(
    () => ({
      title: "",
      description: "",
      status: "TODO"
    }),
    []
  );
  const [form, setForm] = useState(defaults);

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        description: initialValues.description || "",
        status: initialValues.status || "TODO"
      });
    } else {
      setForm(defaults);
    }
  }, [initialValues, defaults]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task name"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What needs to happen?"
          rows={3}
        />
      </div>
      <div className="form-row">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={form.status} onChange={handleChange}>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="form-actions">
        <button className="btn primary" type="submit">
          {initialValues ? "Update task" : "Create task"}
        </button>
        {onCancel && (
          <button className="btn ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
