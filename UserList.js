import React, {Component} from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import Account from "./Account";

const Profile = ({ match }) => (
  <div>
    <h3>{match.params.select}</h3>
    
  </div>
);

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      followers:[],
      repo: [],
      users: [],
      userResult: [],
      select: ""
    };
  this.filterList = this.filterList.bind(this);
  this.onItemClick = this.onItemClick.bind(this);
  }
  getName(){
    return(this.state.select)
  }

  onItemClick(user, e) {  
    this.setState({ 
      select: user['login'],
      users: [],
      userResult: [],
     });
    // console.log(user['login']);
}


  componentDidMount() {
    const apiUrl = 'https://api.github.com/users';

    fetch(apiUrl)
      .then(response => response.json())
      .then(
        (result) => {
          this.setState({
            users: result,
            userResult: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  filterList(e){
    let updateList = this.state.users;
    updateList = updateList.filter(user=> {
      return user.login.toLowerCase().search(
        e.target.value.toLowerCase()
        ) !== -1;
    });

    this.setState({
      userResult: updateList
    });
  }

  render() {
    const {userResult} = this.props;
    const { error, userResult, users, select} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
      <React.Fragment>
       <header>
        <div class="header">
            <div class="search">
              <input type="text" placeholder="Search..."  class="round" onChange=
          {this.filterList}/>

              <input type="submit" class="corner" value="" />
            </div>
        </div>
        </header>
        <div class="container">
          <div class="info">
            <div class="title">
            </div>
              <div class="profiles">
                <ul> 
                <Router>
                  <Link to={'/'}>

                    {this.state.userResult.map(user => {
                    let boundItemClick = this.onItemClick.bind(this, user);
                    return <li key={user.login} onClick={boundItemClick}>
                      <Link to={`${user.login}`} >
                        <div class="account">
                          <div class="icon">
                            <img src= {user.avatar_url}></img>
                          </div>
                          <div class="username">
                            {user.login}
                          </div>
                        </div>
                      </Link>
                  </li>
                  })}
                  </Link>
                  <Route path="/:select"><Account details={this.state.select} /></Route>
                </Router>
                </ul>
              </div>
          </div>
        </div>
      </React.Fragment>
    );
    }
  }


}



export default UserList;