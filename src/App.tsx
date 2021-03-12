import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import api from "api";
import Card from "components/atoms/Card";
import LeftMenu from "components/atoms/LeftMenu";
import Contents from "components/atoms/Contants";
import Detail from "components/pages/todos/Detail";
import 'scss/_reset.module.scss';
import styles from './styles.module.scss';

function App() {
  const [todos, setTodos] = useState<Api.Todo[]>();
  const [todoId, setTodoId] = useState<number>(1);

  useEffect(() => {
    api.todo.getAll().then((res) => {
      setTodos(res);
    })
  }, [setTodos])

  return (
    <>
      <div className={styles.app}>
        <LeftMenu>
          {todos?.map((todo) => (
            <Link
              to={`/todo/detail/${todo.id}`}
              onClick={() => setTodoId(todo.id)}
              className={styles.link}
              key={todo.id}
            >
              <Card
                title={todo.title}
                priority={todo.priority}
                is_done={todo.is_done}
                due_date={todo.due_date}
              />
            </Link>
          ))}
        </LeftMenu>

        <Contents>
          <Switch>
            <Route path="/" exact>
              <Redirect to={`/todo/detail/${todoId}`} />
            </Route>
            <Route path="/todo/detail/:id">
              <Detail
                todo={todos ? todos[todoId -1] : undefined}
              />
            </Route>
          </Switch>
        </Contents>
      </div>
    </>
  )
}

export default App;
