import React, { useState, useEffect } from "react";
import "./App.css";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("listas");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("listas", temp);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      complete: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      
      if (todo.id === id) {
        todo.text = editingText;
      }

      
      
      return todo;
    });

    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <h1>O que pretende fazer hoje?</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          className="todo-input"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="Adicionar a Lista"
        />
        <button className="todo-button" type="submit">
          Adicionar
        </button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <>
              <input
                className="todo-input edit"
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
              <button className="todo-button" onClick={() => editTodo(todo.id)}>
                Editar
              </button>
            </>
          ) : (
            <>
              <div
                className={todo.completed ? "todo-row complete" : "todo-row"}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </div>

              <div className="icons">
                {/* <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => toggleComplete(todo.id)}
                  checked={todo.completed}
                /> */}
                <RiCloseCircleLine
                  className="delete-icon"
                  onClick={() => deleteTodo(todo.id)}
                />

                {todoEditing === todo.id ? (
                  <button
                    className="todo-button"
                    onClick={() => editTodo(todo.id)}
                  >
                    Submit
                  </button>
                ) : (
                  <TiEdit
                    className="edit-icon"
                    onClick={() => setTodoEditing(todo.id)}
                  />
                )}
              </div>
            </>
          )}

          {/* <button className="todo-button" onClick={() => deleteTodo(todo.id)}>
            Excluir
          </button> */}

          {/* {todoEditing === todo.id ? (
            <button className="todo-button" onClick={() => editTodo(todo.id)}>
              Submit
            </button>
          ) : (
            <button
              className="todo-button"
              onClick={() => setTodoEditing(todo.id)}
            >
              Editar Tarefa
            </button>
          )} */}
        </div>
      ))}
    </div>
  );
}

export default App;
