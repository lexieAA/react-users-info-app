import React, {Component} from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Switch,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import "./style.css";
import UserList from './UserList';
import Account from "./Account";

class App extends Component {
  constructor() {
    this.state = {
        select: "",
    };
  }
  
  render() {
    return (
      <HashRouter>
      <UserList/>
      <Switch>
        <Route path="/"></Route>
        <Route path="/:select">
          <Account/>
        </Route>
      </Switch>
      </HashRouter>
    );
  }
}



render(<UserList/>, document.getElementById('root'));
