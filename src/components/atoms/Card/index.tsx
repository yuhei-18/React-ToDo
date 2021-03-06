import React from 'react';
import clsx from "clsx";
import styles from './styles.module.scss';

type Ref = HTMLDivElement;

interface PropsType extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  title?: string;
  due_date?: Date;
  priority?: 0 | 1 | 2 | 3;
  is_done?: boolean;
}

const Card = React.forwardRef<Ref, PropsType>((props, ref) => {
  const { title, due_date, priority = 0, is_done, className, ...rest } = props

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(className, styles.card, {
        [styles.done]: is_done === true,
        [styles.not_done]: is_done === false,
        [styles.priority_high]: priority === 3,
        [styles.priority_medium]: priority === 2,
        [styles.priority_low]: priority === 1,
        [styles.priority_none]: priority === 0,
      })}
    >
      <div className={styles.contents}>
        <p>{title}</p>
        <p>{due_date}</p>
      </div>
    </div>
  )
})

export default Card;