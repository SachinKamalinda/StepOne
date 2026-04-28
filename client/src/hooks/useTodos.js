import { useState, useEffect, useCallback } from 'react';
import { todosApi } from '../api/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  // Fetch all todos on mount
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create a todo — optimistic insert
  const createTodo = async (title, description) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic = { _id: tempId, title, description, done: false, createdAt: new Date().toISOString() };
    setTodos((prev) => [optimistic, ...prev]);

    try {
      const created = await todosApi.create(title, description);
      setTodos((prev) => prev.map((t) => (t._id === tempId ? created : t)));
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t._id !== tempId));
      setError(err.message);
    }
  };

  // Update todo — optimistic update
  const updateTodo = async (id, title, description) => {
    const original = todos.find((t) => t._id === id);
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, title, description } : t)));

    try {
      const updated = await todosApi.update(id, title, description);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === id ? original : t)));
      setError(err.message);
    }
  };

  // Toggle done — optimistic toggle
  const toggleDone = async (id) => {
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t)));

    try {
      const updated = await todosApi.toggleDone(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t)));
      setError(err.message);
    }
  };

  // Delete todo — optimistic delete
  const deleteTodo = async (id) => {
    const original = todos.find((t) => t._id === id);
    setTodos((prev) => prev.filter((t) => t._id !== id));

    try {
      await todosApi.delete(id);
    } catch (err) {
      setTodos((prev) => [original, ...prev]);
      setError(err.message);
    }
  };

  return { todos, loading, error, clearError, createTodo, updateTodo, toggleDone, deleteTodo };
}
