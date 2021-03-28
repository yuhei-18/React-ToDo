import React from 'react';
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import styles from "components/pages/todos/Create/styles.module.scss";

const Create: React.FC = () => {
  const { handleSubmit, control, errors } = useForm();

  return (
    <div className={styles.create}>
      <form onSubmit={handleSubmit(() => {})}>

        <div className={styles.head}>
          <h1>ToDo 作成</h1>
          <button type="submit" className={styles.submit}>保存</button>
        </div>

        <div className={styles.flex}>
          <div className={styles.title}>
            <p className={styles.label}>タイトル</p>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={() =>
                <input type="text" className={clsx(styles.input, styles.normal)} />
              }
            />
          </div>

          <div className={styles.date}>
            <p className={styles.label}>期限</p>
            <Controller
              name="due_date"
              control={control}
              defaultValue=""
              render={() =>
                <input type="date" className={clsx(styles.input, styles.normal)} />
              }
            />
          </div>

          <div className={styles.priority}>
            <p className={styles.label}>優先度</p>
            <Controller
              name="priority"
              control={control}
              defaultValue=""
              render={() =>
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
          <p className={styles.label}>内容</p>
          <Controller
            name="contents"
            control={control}
            defaultValue=""
            render={() =>
              <textarea rows={20} className={styles.input} />
            }
          />
        </div>

      </form>
    </div>
  )
}

export default Create;
