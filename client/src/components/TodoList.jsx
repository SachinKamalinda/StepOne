import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onUpdate, onDelete, loading }) {
  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner" />
        <p className="state-text">Loading your tasks…</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="state-container state-container--empty">
        <div className="empty-icon">✓</div>
        <p className="state-text">No tasks yet. Add one above!</p>
      </div>
    );
  }

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="todo-list">
      {pending.length > 0 && (
        <section>
          <h3 className="list-section-label">To Do <span className="badge">{pending.length}</span></h3>
          {pending.map((t) => (
            <TodoItem key={t._id} todo={t} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </section>
      )}
      {done.length > 0 && (
        <section>
          <h3 className="list-section-label list-section-label--done">Completed <span className="badge badge--done">{done.length}</span></h3>
          {done.map((t) => (
            <TodoItem key={t._id} todo={t} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </section>
      )}
    </div>
  );
}
