import React, {Component} from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Link, Route } from 'react-router-dom';
import App, {getSelect} from './App';


export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: (this.props.details!= null) ? this.props.details: null,
      followers: [],
      repos: [],
      name:""
    }
  }

  componentDidMount() {
    const apiUrl = 'https://api.github.com/users/'+ this.state.details + "/followers";
    const apiUrl2 = 'https://api.github.com/users/'+ this.state.details + "/repos";
    fetch(apiUrl)
       .then(response => response.json())
       .then(
         (result) => {
           this.setState({
             followers: result,
           });
         }
       )

       fetch(apiUrl2)
       .then(response => response.json())
       .then(
         (result) => {
           this.setState({
             repos: result,
           });
         }
       )
      console.log(apiUrl);
  }


render() {
      const result = Object.values(this.state.repos);
      console.log(result);
      // const result2 = Object.values(this.state.followers);
      // console.log(result2);
      const { error, repos, followers, detail} = this.state;
      return(
      <div class="account">

        <h1>{this.state.details}</h1>
        <h3>Repositories</h3>
        <div class="profile">
          <ul>
            {result.map( repo =>
              <li key={repo.name}>{repo.name}</li>
            )}
          </ul>
        </div>
        <h3>Followers</h3>
        <ul>
           {followers.map( follow =>
             <li key={follow.login}>{follow.login}</li>
           )}
         </ul>
         <Router>
         <Route exact path="/"><App/></Route>
       </Router>
      </div>
    );
  }
}

export default Account;
