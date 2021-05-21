import React from 'react'
import { Link } from 'react-router-dom'
import { RiAddBoxLine } from 'react-icons/ri'
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
      </div>
    </div>
  )
}

export default Header
