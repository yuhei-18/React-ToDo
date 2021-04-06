import React from 'react';
import { Link } from 'react-router-dom';
import { RiAddBoxLine } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link to="/todo/create">
          <RiAddBoxLine className={styles.create_icon} />
        </Link>
        <BiEdit className={styles.create_icon} />
      </div>

        <AiFillDelete className={styles.delete_icon} />
    </div>
  )
}

export default Header;