import React from 'react'
import styles from './styles.module.scss'

const LeftMenu: React.FC = ({ children }) => {
  return <div className={styles.left_menu}>{children}</div>
}

export default LeftMenu
