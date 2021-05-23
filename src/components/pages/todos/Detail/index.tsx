import React from 'react'
import moment from 'moment'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { MdUpdate, MdDateRange } from 'react-icons/md'
import { BsFillExclamationDiamondFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import IconButton from 'components/atoms/IconButton'
import { Notification } from 'lib/notification'
import styles from 'components/pages/todos/Detail/styles.module.scss'

const TODO_DELETE = gql`
  mutation TodoDelete($input: TodoDeleteInput!) {
    todoDelete(input: $input) {
      deletedTodoId
      todoErrors {
        code
        field
        message
      }
    }
  }
`

interface PropsType {
  refetch: () => void
  todo?: Api.Todo
}

const Detail: React.FC<PropsType> = (props) => {
  const { refetch, todo } = props
  const [todoDelete] = useMutation(TODO_DELETE)
  const priority = ['None', 'Low', 'Medium', 'High']
  const now = moment()

  function TodoDelete(id: number) {
    todoDelete({
      variables: {
        input: {
          id,
        },
      },
    })
      .then(() => {
        Notification({
          title: 'SUCCESS',
          message: `ToDo「${todo?.title}」を削除しました。`,
          type: 'success',
        })

        // Todo リストを再取得する。
        refetch()
      })
      .catch((e) => {
        console.error(e)
        Notification({
          title: 'Error',
          message: `${e}`,
          type: 'danger',
        })
      })
  }

  if (!todo) {
    return (
      <div className={styles.todos}>
        <h3 className={clsx(styles.title, styles.todo_none)}>
          左の Todo リストを選択してくだい。
          <br />
          または、左上のアイコンから Todo を作成してください。
        </h3>
      </div>
    )
  }

  return (
    <>
      <div className={styles.button_area}>
        <Link to="/todo/edit">
          <IconButton title="Edit">
            <BiEdit />
          </IconButton>
        </Link>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={styles.delete_button}
          onClick={() => TodoDelete(todo?.id)}
          href="#"
        >
          <IconButton title="Delete">
            <RiDeleteBin6Line />
          </IconButton>
        </a>
      </div>

      <div className={styles.todos}>
        <div className={styles.todo_info}>
          <div className={styles.due_date}>
            <MdDateRange className={styles.icon} />
            <p
              className={clsx({
                [styles.ago]: todo?.dueDate && moment(todo?.dueDate) < now,
              })}
            >
              {todo?.dueDate !== null
                ? moment(todo?.dueDate).format('YYYY-MM-DD')
                : 'no limit'}
            </p>
          </div>
          <div className={styles.priority}>
            <BsFillExclamationDiamondFill className={styles.icon} />
            <p
              className={clsx({
                [styles.priority_high]: todo?.priority === 3,
                [styles.priority_medium]: todo?.priority === 2,
                [styles.priority_low]: todo?.priority === 1,
                [styles.priority_none]: todo?.priority === 0,
              })}
            >
              {priority[todo?.priority ? todo?.priority : 0]}
            </p>
          </div>
          <div className={styles.updated_at}>
            <MdUpdate className={styles.icon} />
            <p>updated {moment(todo?.updatedAt).fromNow()}</p>
          </div>
        </div>
        <h1 className={styles.title}>{todo?.title}</h1>
        <p className={styles.content}>{todo?.content}</p>
      </div>
    </>
  )
}

export default Detail
