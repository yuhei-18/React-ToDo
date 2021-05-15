import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {useMutation} from '@apollo/client';
import gql from 'graphql-tag';
import {ErrorMessage} from '@hookform/error-message';
import clsx from "clsx";
import Required from "components/atoms/Required";
import {Notification} from "lib/notification";
import styles from "components/pages/todos/Create/styles.module.scss";

const TODO_CREATE = gql`
  mutation todoCreate(
    $input: TodoCreateInput!,
  ){
    todoCreate(
      input: $input,
    ){
      todo{
        title
      }
    }
  }
`;

type TodoCreateType = {
  title: string;
  content: string;
  priority: number;
  due_date: Date | null;
}

type PropsType = {
  refetch: () => void;
}

const Create: React.FC<PropsType> = (props: PropsType) => {
  const { refetch } = props;
  const [createTodo] = useMutation(TODO_CREATE);
  const { handleSubmit, control, errors, reset } = useForm<TodoCreateType>();

  function TodoCreate(inputs: TodoCreateType) {
    const reqInput = inputs;

    if (reqInput.due_date?.toString() === "") {
      reqInput.due_date = null;
    }

    createTodo({ variables: { input: {
      title: reqInput.title,
      content: reqInput.content,
      dueDate: reqInput.due_date,
      priority: Number(reqInput.priority)
    }}}).then((res) => {
      Notification({
        title: "SUCCESS",
        message: `ToDo「${res.data.todoCreate.todo.title}」を作成しました。`,
        type: "success",
      })

      // フォームを空にする。
      reset();

      // Todo リストを再取得する。
      refetch();
    }).catch((e) => {
      console.error(e);
      Notification({
        title: "Error",
        message: `${e}`,
        type: "danger",
      })
    })
  }

  return (
    <div className={styles.create}>
      <form onSubmit={handleSubmit(TodoCreate)}>

        <div className={styles.head}>
          <h1>ToDo 作成</h1>
          <button type="submit" className={styles.submit}>保存</button>
        </div>

        <div className={styles.flex}>
          <div className={styles.title}>
            <p className={styles.label}>タイトル<Required /></p>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{
                required: "タイトルの入力は必須です。",
                maxLength: {
                  value: 32,
                  message: "タイトルの文字数を少なくしてください"
                }
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
              defaultValue=""
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
              defaultValue=""　
              as={
                <select className={clsx(styles.input, styles.normal)}>
                  <option value={0}>{""}</option>
                  <option value={1}>低</option>
                  <option value={2}>中</option>
                  <option value={3}>高</option>
                </select>
              }
            />
          </div>
        </div>

        <div className={styles.contents}>
          <p className={styles.label}>内容<Required /></p>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{
              required: "内容の入力は必須です。",
              maxLength: {
                value: 2048,
                message: "内容の文字数を少なくしてください。"
              }
            }}
            as={
              <textarea rows={15} className={styles.input} />
            }
          />
          <div className={styles.error}>
            <ErrorMessage name="content" errors={errors} />
          </div>
        </div>

      </form>
    </div>
  )
}

export default Create;
