import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3001/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post("http://localhost:3001/todos", { task });
    setTask("");
    fetchTodos();
  };

  const updateTodo = async (id, newTask) => {
    await axios.put(`http://localhost:3001/todos/${id}`, { task: newTask });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="app-container">
      <h1 className="title">Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              defaultValue={todo.task}
              onBlur={(e) => updateTodo(todo.id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;