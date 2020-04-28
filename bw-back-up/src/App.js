
import React, { Component } from 'react';
import Login from './components/UserLogin';
import Register from './components/Register'
// import Div from './styled-comp'
import { Link, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </nav>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
    );
  }
}
export default App