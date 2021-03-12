import React, {ReactNode} from 'react';
import styles from "./styles.module.scss";

type Props = {
  children?: ReactNode;
}

const Contents: React.FC = ({ children }: Props) => {
  return (
    <div className={styles.contents}>
      {children}
    </div>
  )
}

export default Contents;