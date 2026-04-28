import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ErrorBanner from './components/ErrorBanner';
import './App.css';

export default function App() {
  const { todos, loading, error, clearError, createTodo, updateTodo, toggleDone, deleteTodo } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">✓</span>
            <span className="logo-text">StepOne</span>
          </div>
          <span className="task-count">{todos.filter((t) => !t.done).length} remaining</span>
        </div>
      </header>

      <main className="app-main">
        <ErrorBanner message={error} onDismiss={clearError} />
        <TodoForm onSubmit={createTodo} loading={false} />
        <TodoList
          todos={todos}
          loading={loading}
          onToggle={toggleDone}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}
