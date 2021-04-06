import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import clsx from "clsx";
import api from "api";
import Required from "components/atoms/Required";
import styles from "components/pages/todos/Create/styles.module.scss";

type TodoCreateType = {
  title: string;
  content: string;
  priority: number;
  due_date: Date;
}

const Create: React.FC = () => {
  const { handleSubmit, control, errors } = useForm<TodoCreateType>();

  function TodoCreate(inputs: TodoCreateType) {
    const reqInput = inputs;
    reqInput.priority = Number(inputs.priority);
    api.todo.post(reqInput).then((res) => {
      console.info(res);
    }).catch((e) => {
      console.error(e);
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
              <textarea rows={18} className={styles.input} />
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
