import React from "react";
import moment from 'moment';
import clsx from "clsx";
import { MdUpdate, MdDateRange } from "react-icons/md"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import styles from "components/pages/todos/Detail/styles.module.scss";

interface PropsType {
  todo?: Api.Todo;
}

const Detail: React.FC<PropsType> = (props) => {
  const { todo } = props;
  const priority = ["None", "Low", "Medium", "High"];
  const now = moment();

  return(
    <div className={styles.todos}>
      <h1 className={styles.title}>{todo?.title}</h1>
      <div className={styles.todo_info}>
        <div className={styles.priority}>
          <BsFillExclamationDiamondFill className={styles.icon} />
          <p className={clsx({
            [styles.priority_high]: todo?.priority === 3,
            [styles.priority_medium]: todo?.priority === 2,
            [styles.priority_low]: todo?.priority === 1,
            [styles.priority_none]: todo?.priority === 0,
          })}>
            {priority[todo?.priority ? todo?.priority : 0]}
          </p>
        </div>
        <div className={styles.due_date}>
          <MdDateRange className={styles.icon} />
          <p className={clsx({
            [styles.ago]: todo?.due_date && moment(todo?.due_date) < now
          })}>
            {moment(todo?.due_date).format("ll")}
          </p>
        </div>
        <div className={styles.updated_at}>
          <MdUpdate className={styles.icon} />
          <p>updated {moment(todo?.updated_at).fromNow()}</p>
        </div>
      </div>
      <p className={styles.content}>{todo?.content}</p>
    </div>
  )
};

export default Detail;