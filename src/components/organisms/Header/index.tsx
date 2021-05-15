import React from 'react'
import { Link } from 'react-router-dom'
import { RiAddBoxLine } from 'react-icons/ri'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import styles from './styles.module.scss'

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link to="/todo/create">
          <RiAddBoxLine className={styles.icon} />
        </Link>
        <BiEdit className={styles.icon} />
      </div>

      <RiDeleteBin6Line className={styles.delete_icon} />
    </div>
  )
}

export default Header
