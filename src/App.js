import React, { useState, useEffect } from 'react';
import './App.css';
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList"
function App() {
  
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // load local todos
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') == null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  //Run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  
  useEffect(() => {
    const filterHandler = () => {
      switch(status){
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }

    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    filterHandler();
    saveLocalTodos();
  }, [todos, status])


  return (
    <div className="App">
      <header>
        <h1>Mor's Todo list</h1>
      </header>
      <Form 
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus} />
      <TodoList 
        setTodos={setTodos}
        filteredTodos={filteredTodos}
        todos={todos}/>
    </div>
  );
}

export default App;
