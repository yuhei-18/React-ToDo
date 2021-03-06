import React, { useEffect, useState } from 'react';
import './App.css';
import api from 'api';
import Card from 'components/atoms/Card';

function App() {
  const [todos, setTodos] = useState<Api.Todo[]>();

  useEffect(() => {
    api.todo.get().then((res) => {
      setTodos(res);
    })
  }, [setTodos])

  return (
    <div>
      {todos?.map((todo) => (
        <Card
          title={todo.title}
          priority={todo.priority}
          is_done={todo.is_done}
          due_date={todo.due_date}
        />
      ))}
    </div>
  );
}

export default App;
