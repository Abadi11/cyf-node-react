import React, { useState, useEffect } from "react";

const SERVER = "https://buttery-carbonated-garage.glitch.me";

/*
  Exercise C1.1: Render each item in the list (returned from the server) as a <li>
  Exercise C1.2: Add an newItem state, controlled by an input box and an "add" button that adds the newItem to the list
  Exercise C1.3: When the add button is pressed, also call sendTodoListItemToServer
  Exercise C1.4: Switch over your todolist to your local server by changing SERVER to "//localhost:4000"
  Exercise C2.1: Modify the TodoList component to take a props with a name that is used in the fetch uri (GET)
  Exercise C2.2: Modify the TodoList component to send the name to the fetch uri (POST)
*/

function TodoList(props) {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch(`${SERVER}/${props.name}`)
      .then((res) => res.json())
      .then((list) => {
        console.log("got todolist from server", list);
        setList(list);
      });
  }, []);

  function sendTodoListItemToServer(item) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: item,
      }),
    };
    fetch(`${SERVER}/${props.name}`, requestOptions).then((response) => {
      console.log("Successfully sent to server", response);
    });
  }

  function inputHandler(event){
    setNewItem(event.target.value);
    console.log(event.target.value);
  }
  const addHandler = () => {
    // setList(() => [...list, newItem]);
    setList(() => list.concat(newItem));
    sendTodoListItemToServer();
  };
  return (
    <div>
      <input type="text" value={newItem} onChange={inputHandler}/>
      <button onClick={addHandler}>Add</button>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default TodoList;
