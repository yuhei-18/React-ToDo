import React, { useEffect, useState } from 'react';
import Card from 'components/atoms/Card';
import api from "api";
import styles from "./styles.module.scss";

const LeftMenu: React.FC = () => {
  const [todos, setTodos] = useState<Api.Todo[]>();

  useEffect(() => {
    api.todo.get().then((res) => {
      setTodos(res);
    })
  }, [setTodos])

  return (
    <div className={styles.left_menu}>
      {todos?.map((todo) => (
        <Card
          title={todo.title}
          priority={todo.priority}
          is_done={todo.is_done}
          due_date={todo.due_date}
        />
      ))}
    </div>
  )
}

export default LeftMenu;