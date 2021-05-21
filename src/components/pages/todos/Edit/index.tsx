import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import moment from 'moment'
import Required from 'components/atoms/Required'
import { Notification } from 'lib/notification'
import styles from 'components/pages/todos/Edit/styles.module.scss'

const TODO_UPDATE = gql`
  mutation TodoUpdate($input: TodoUpdateInput!) {
    todoUpdate(input: $input) {
      todo {
        id
        title
        content
        priority
        isDone
      }
      todoErrors {
        code
        field
        message
      }
    }
  }
`

type TodoEditType = {
  title: string
  content: string
  priority: number
  due_date: Date | null
}

type PropsType = {
  refetch: () => void
  todo: Api.Todo
}

const Edit: React.FC<PropsType> = (props: PropsType) => {
  const { refetch, todo } = props
  const [updateTodo] = useMutation(TODO_UPDATE)
  const { handleSubmit, control, errors } = useForm<TodoEditType>()

  function TodoEdit(inputs: TodoEditType) {
    const reqInput = inputs

    if (reqInput.due_date?.toString() === '') {
      reqInput.due_date = null
    }

    updateTodo({
      variables: {
        input: {
          id: Number(todo.id),
          title: reqInput.title,
          content: reqInput.content,
          dueDate: reqInput.due_date,
          priority: Number(reqInput.priority),
        },
      },
    })
      .then((res) => {
        Notification({
          title: 'SUCCESS',
          message: `ToDo「${res.data.todoUpdate.todo.title}」を更新しました。`,
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

  return (
    <div className={styles.create}>
      <form onSubmit={handleSubmit(TodoEdit)}>
        <div className={styles.head}>
          <h1>ToDo Edit</h1>
          <button type="submit" className={styles.submit}>
            Save
          </button>
        </div>

        <div className={styles.flex}>
          <div className={styles.title}>
            <p className={styles.label}>
              タイトル
              <Required />
            </p>
            <Controller
              name="title"
              control={control}
              defaultValue={todo?.title || ''}
              rules={{
                required: 'タイトルの入力は必須です。',
                maxLength: {
                  value: 32,
                  message: 'タイトルの文字数を少なくしてください',
                },
              }}
              as={
                <input
                  type="text"
                  className={clsx(styles.input, styles.normal)}
                />
              }
            />
            <div className={styles.error}>
              <ErrorMessage name="title" errors={errors} />
            </div>
          </div>

          <div className={styles.date}>
            <p className={styles.label}>期限</p>
            <Controller
              name="due_date"
              control={control}
              defaultValue={moment(todo?.dueDate).format('YYYY-MM-DD')}
              as={
                <input
                  type="date"
                  className={clsx(styles.input, styles.normal)}
                />
              }
            />
          </div>

          <div className={styles.priority}>
            <p className={styles.label}>優先度</p>
            <Controller
              name="priority"
              control={control}
              defaultValue={todo?.priority || ''}
              as={
                <select className={clsx(styles.input, styles.normal)}>
                  <option value={0}> </option>
                  <option value={1}>低</option>
                  <option value={2}>中</option>
                  <option value={3}>高</option>
                </select>
              }
            />
          </div>
        </div>

        <div className={styles.contents}>
          <p className={styles.label}>
            内容
            <Required />
          </p>
          <Controller
            name="content"
            control={control}
            defaultValue={todo?.content || ''}
            rules={{
              required: '内容の入力は必須です。',
              maxLength: {
                value: 2048,
                message: '内容の文字数を少なくしてください。',
              },
            }}
            as={<textarea rows={18} className={styles.input} />}
          />
          <div className={styles.error}>
            <ErrorMessage name="content" errors={errors} />
          </div>
        </div>
      </form>
    </div>
  )
}
export default Edit
