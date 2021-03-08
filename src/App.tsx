import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LeftMenu from "components/organisms/LeftMenu";
import Top from "./components/pages";
import './scss/_reset.module.scss';
import styles from './styles.module.scss';

function App() {
  return (
    <>
      <div className={styles.App}>
        <LeftMenu />

        <div className={styles.Contents}>
          <Switch>
            <Route path="/" exact component={Top} />
          </Switch>
        </div>
      </div>
    </>
  )
}

export default App;
