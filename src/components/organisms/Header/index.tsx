import React from 'react'
import { Link } from 'react-router-dom'
import { RiAddBoxLine, RiDeleteBin6Line } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import IconButton from 'components/atoms/IconButton'
import styles from './styles.module.scss'

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.flex}>
        <Link to="/todo/create">
          <IconButton title="Create">
            <RiAddBoxLine />
          </IconButton>
        </Link>
        <Link to="/todo/edit">
          <IconButton title="Edit">
            <BiEdit />
          </IconButton>
        </Link>
      </div>

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={styles.delete_button} href="#">
        <IconButton title="Delete">
          <RiDeleteBin6Line />
        </IconButton>
      </a>
    </div>
  )
}

export default Header
