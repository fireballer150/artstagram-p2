import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@styles/core.css';
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Join from './Join/Join';
import MainFeed from './MainFeed/MainFeed';
import Header from './Header/Header';
import Detail from './Detail/Detail';
import Profile from './Profile/Profile';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" component={Join}></Route>
        <Route path="/feed" component={MainFeed}></Route>
        <Route path="/profile" component={Profile}></Route>
      </Switch>
      {false && <Detail></Detail>}
    </Router>
  );
}

export default App;
