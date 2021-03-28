import React from 'react';
import { Link } from 'react-router-dom';
import { VscDiffAdded } from "react-icons/vsc";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link to="/todo/create">
        <VscDiffAdded className={styles.create_icon} />
      </Link>
    </div>
  )
}

export default Header;