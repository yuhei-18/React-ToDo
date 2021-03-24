import React, {ReactNode} from 'react';
import styles from "./styles.module.scss";

type Props = {
  children?: ReactNode;
}

const Header: React.FC = ({ children }: Props) => {
  return (
    <div className={styles.header}>
      {children}
    </div>
  )
}

export default Header;