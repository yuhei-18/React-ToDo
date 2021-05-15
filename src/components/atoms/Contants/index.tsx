import React from 'react'
import styles from './styles.module.scss'

const Contents: React.FC = ({ children }) => {
  return <div className={styles.contents}>{children}</div>
}

export default Contents
