import React from "react";
import moment from 'moment';
import styles from "components/pages/todos/Detail/styles.module.scss";

interface PropsType {
  todo?: Api.Todo;
}

const Detail: React.FC<PropsType> = (props) => {
  const { todo } = props;
  const priority = ["無", "低", "中", "高",];

  return(
    <div className={styles.todos}>
      <h1 className={styles.title}>{todo?.title}</h1>
      <div className={styles.todo_info}>
        <p className={styles.priority}>
          優先度：
          <strong className={styles.priority_value}>
            {priority[todo?.priority ? todo?.priority : 0]}
          </strong>
        </p>
        <p className={styles.due_date}>
          期限：{moment(todo?.due_date).format("LLL")}
        </p>
      </div>
      <p className={styles.updated_at}>
        最終更新日：{moment(todo?.updated_at).format("LLL")}
      </p>
      <p>{todo?.content}</p>
    </div>
  )
};

export default Detail;