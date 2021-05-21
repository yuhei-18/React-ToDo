import React, { useState } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Card from 'components/atoms/Card'
import LeftMenu from 'components/atoms/LeftMenu'
import Contents from 'components/atoms/Contants'
import Header from 'components/organisms/Header'
import Detail from 'components/pages/todos/Detail'
import Create from 'components/pages/todos/Create'
import Edit from 'components/pages/todos/Edit'
import 'scss/_reset.scss'
import styles from './styles.module.scss'

const TODO_LIST = gql`
  query {
    todo {
      nodes {
        id
        title
        content
        dueDate
        priority
        isDone
        createdAt
        updatedAt
      }
    }
  }
`

function App() {
  const [todoId, setTodoId] = useState<number>(1)
  const { loading, error, data, refetch } = useQuery(TODO_LIST)

  function refetchTodoList() {
    refetch()
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <>
      <div className={styles.app}>
        <Header />

        <LeftMenu>
          {data.todo.nodes?.map((todo: Api.Todo) => (
            <Link
              to={`/todo/detail/${todo.id}`}
              onClick={() => setTodoId(todo.id)}
              className={styles.link}
              key={todo.id}
            >
              <Card
                title={todo.title}
                content={todo.content}
                priority={todo.priority}
                isDone={todo.isDone}
                dueDate={todo.dueDate}
                choice={todo.id === todoId}
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
                todo={
                  data.todo.nodes
                    ? data.todo.nodes.find((todo: Api.Todo) => {
                        return todo.id === todoId
                      })
                    : undefined
                }
              />
            </Route>
            <Route path="/todo/create">
              <Create refetch={refetchTodoList} />
            </Route>
            <Route path="/todo/edit">
              <Edit
                refetch={refetchTodoList}
                todo={
                  data.todo.nodes
                    ? data.todo.nodes.find((todo: Api.Todo) => {
                        return todo.id === todoId
                      })
                    : undefined
                }
              />
            </Route>
          </Switch>
        </Contents>
      </div>
    </>
  )
}

export default App
