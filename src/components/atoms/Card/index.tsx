import React from 'react'
import clsx from 'clsx'
import moment from 'moment'
import styles from './styles.module.scss'

const TITLE_MAX_LENGTH = 15
const CONTENT_MAX_LENGTH = 50

type Ref = HTMLDivElement

interface PropsType extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  title?: string
  content?: string
  dueDate?: Date
  priority?: 0 | 1 | 2 | 3
  isDone?: boolean
  choice?: boolean
}

const Card = React.forwardRef<Ref, PropsType>((props, ref) => {
  const {
    title,
    content,
    dueDate,
    priority = 0,
    isDone,
    choice,
    className,
  } = props
  const now = moment()

  return (
    <div
      ref={ref}
      className={clsx(className, styles.card, {
        [styles.done]: isDone === true,
        [styles.not_done]: isDone === false,
        [styles.priority_high]: priority === 3,
        [styles.priority_medium]: priority === 2,
        [styles.priority_low]: priority === 1,
        [styles.priority_none]: priority === 0,
        [styles.choice]: choice === true,
      })}
    >
      <div className={styles.contents}>
        <h3 className={styles.title}>
          {title && title.length > TITLE_MAX_LENGTH
            ? `${title.substr(0, TITLE_MAX_LENGTH)}...`
            : title}
        </h3>
        <p className={styles.content}>
          {content && content.length > CONTENT_MAX_LENGTH
            ? `${content.substr(0, CONTENT_MAX_LENGTH)}...`
            : content}
        </p>
        <p
          className={clsx(styles.date, {
            [styles.ago]: dueDate && moment(dueDate) < now,
          })}
        >
          {moment(dueDate).fromNow()}
        </p>
      </div>
    </div>
  )
})

export default Card
