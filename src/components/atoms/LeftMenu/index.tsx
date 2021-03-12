import React, {ReactNode} from 'react';
import styles from "./styles.module.scss";

type Props = {
  children?: ReactNode;
}

const LeftMenu: React.FC = ({ children }: Props) => {
  return (
    <div className={styles.left_menu}>
      {children}
    </div>
  )
}

export default LeftMenu;