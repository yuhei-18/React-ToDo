import React, { useEffect, useState } from 'react';
import './App.css';
import api from 'api';

function App() {
  const [todos, setTodos] = useState<Api.Todo[]>();

  useEffect(() => {
    api.todo.get().then((res) => {
      setTodos(res);
    })
  }, [setTodos])

  return (
    <div>
      <h1>あいうえお</h1>
      {todos?.map((todo) => (
        <>
          <p>{todo.id}</p>
          <p>{todo.title}</p>
        </>
      ))}
    </div>
  );
}

export default App;
