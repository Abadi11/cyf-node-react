import "./App.css";
import TodoList from "./TodoList.js";
import React, { useState } from "react";

function App() {
  /*
  Exercise C2.1: Add a name state, controlled by an input box that reads "Todo list for [xxxxxxx]". Pass the name as a prop to TodoList
  */
  const [name, setName] = useState("");
  return (
    <div className="App">
      <header>TodoList</header>
      <input type="text" value={name} onChange={(e)=> setName(() => e.target.value)} />
      <TodoList name={name}/>
    </div>
  );
}

export default App;
