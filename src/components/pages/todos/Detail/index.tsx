import React from "react";
import moment from 'moment';
import clsx from "clsx";
import styles from "components/pages/todos/Detail/styles.module.scss";

interface PropsType {
  todo?: Api.Todo;
}

const Detail: React.FC<PropsType> = (props) => {
  const { todo } = props;
  const priority = ["無", "低", "中", "高"];
  const now = moment();

  return(
    <div className={styles.todos}>
      <h1 className={styles.title}>{todo?.title}</h1>
      <div className={styles.todo_info}>
        <p className={styles.priority}>
          優先度：
          <strong className={clsx({
            [styles.priority_high]: todo?.priority === 3,
            [styles.priority_medium]: todo?.priority === 2,
            [styles.priority_low]: todo?.priority === 1,
            [styles.priority_none]: todo?.priority === 0,
          })}>
            {priority[todo?.priority ? todo?.priority : 0]}
          </strong>
        </p>
        <p className={styles.due_date}>
          期限：
          <span className={clsx({
            [styles.ago]: todo?.due_date && moment(todo?.due_date) < now
          })}>
            {moment(todo?.due_date).format("ll")}
          </span>
        </p>
      </div>
      <p className={styles.updated_at}>
        updated {moment(todo?.updated_at).fromNow()}
      </p>
      <p className={styles.content}>{todo?.content}</p>
    </div>
  )
};

export default Detail;