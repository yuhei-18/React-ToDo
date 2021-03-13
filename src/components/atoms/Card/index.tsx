import React from 'react';
import clsx from "clsx";
import moment from 'moment'
import styles from './styles.module.scss';

const TITLE_MAX_LENGTH = 15;
const CONTENT_MAX_LENGTH = 50;

type Ref = HTMLDivElement;

interface PropsType extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  title?: string;
  content?: string;
  due_date?: Date;
  priority?: 0 | 1 | 2 | 3;
  is_done?: boolean;
}

const Card = React.forwardRef<Ref, PropsType>((props, ref) => {
  const { title, content, due_date, priority = 0, is_done, className, ...rest } = props
  const now = moment();

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
        <h3 className={styles.title}>
          {title && title.length > TITLE_MAX_LENGTH ? (
            title.substr(0, TITLE_MAX_LENGTH) + "..."
          ) : (
            title
          )}
        </h3>
        <p className={styles.content}>
          {content && content.length > CONTENT_MAX_LENGTH ? (
            content.substr(0, CONTENT_MAX_LENGTH) + "..."
          ) : (
            content
          )}
        </p>
        <p
          className={
            clsx(styles.date, {
              [styles.ago]: due_date && moment(due_date) < now
            })
          }
        >
          {moment(due_date).fromNow()}
        </p>
      </div>
    </div>
  )
})

export default Card;