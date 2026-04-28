import { useState } from 'react';

export default function TodoForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    else if (title.trim().length > 200) errs.title = 'Title must be under 200 characters';
    if (description.length > 1000) errs.description = 'Description must be under 1000 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    await onSubmit(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">New Task</h2>
      <div className="field-group">
        <input
          className={`field-input ${errors.title ? 'field-input--error' : ''}`}
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors((p) => ({ ...p, title: '' })); }}
          disabled={loading}
          maxLength={200}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>
      <div className="field-group">
        <textarea
          className={`field-input field-textarea ${errors.description ? 'field-input--error' : ''}`}
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => { setDescription(e.target.value); if (errors.description) setErrors((p) => ({ ...p, description: '' })); }}
          disabled={loading}
          maxLength={1000}
          rows={3}
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </div>
      <button className="btn btn--primary" type="submit" disabled={loading}>
        {loading ? 'Adding…' : '+ Add Task'}
      </button>
    </form>
  );
}
