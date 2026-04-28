import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    else if (title.trim().length > 200) errs.title = 'Title too long';
    if (description.length > 1000) errs.description = 'Description too long';
    if (Object.keys(errs).length) return setErrors(errs);

    setSaving(true);
    await onUpdate(todo._id, title.trim(), description.trim());
    setSaving(false);
    setEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setErrors({});
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className={`todo-item ${todo.done ? 'todo-item--done' : ''} ${todo._id?.startsWith('temp-') ? 'todo-item--saving' : ''}`}>
      {editing ? (
        <div className="todo-edit">
          <input
            className={`field-input ${errors.title ? 'field-input--error' : ''}`}
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={200}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
          <textarea
            className={`field-input field-textarea ${errors.description ? 'field-input--error' : ''}`}
            value={description}
            onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
            onKeyDown={handleKeyDown}
            rows={2}
            maxLength={1000}
            placeholder="Description (optional)"
          />
          {errors.description && <span className="field-error">{errors.description}</span>}
          <div className="todo-edit-actions">
            <button className="btn btn--sm btn--primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button className="btn btn--sm btn--ghost" onClick={handleCancel} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            className={`todo-checkbox ${todo.done ? 'todo-checkbox--checked' : ''}`}
            onClick={() => onToggle(todo._id)}
            aria-label={todo.done ? 'Mark undone' : 'Mark done'}
          >
            {todo.done && (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <div className="todo-content">
            <span className="todo-title">{todo.title}</span>
            {todo.description && <p className="todo-description">{todo.description}</p>}
            <span className="todo-date">{new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="todo-actions">
            <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit" title="Edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button className="icon-btn icon-btn--danger" onClick={() => onDelete(todo._id)} aria-label="Delete" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
