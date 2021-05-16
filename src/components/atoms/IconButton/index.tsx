import React from 'react'
import styles from './styles.module.scss'

interface PropsType {
  title: string
}

const IconButton: React.FC<PropsType> = ({ title, children }) => {
  return (
    <div className={styles.flex}>
      {children}
      <span>{title}</span>
    </div>
  )
}

export default IconButton
