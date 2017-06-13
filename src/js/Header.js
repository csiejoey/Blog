import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NewPage from './NewPage';
import HomePage from './HomePage';

class Header extends Component {
  loginBtn() {
    if (this.props.loggedIn === false) {
      return (
        <div
          className="fb-login-button"
          data-size="medium"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="true"
        />
      );
    } else {
      return (
        <div>{this.props.name}</div>
      );
    }
  }
  MyNewPage = () => <NewPage name={this.props.name} />
  MyHomePage = () => <HomePage name={this.props.name} />
  render() {
    return (
      <div>
        <h1>CKDCGOOD</h1>
        {this.loginBtn()}
        {/* <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <br />
            <Link to="/article/new">New</Link>
            <Route exact path="/" />
            <Route path="/article/new" />
          </nav>
        </BrowserRouter> */}
        <a href="http://localhost:3000/">
          back to home
        </a>
        <br />
        <a href="http://localhost:3000/article/new">
          post new article
        </a>
      </div>
    );
  }
}

export default Header;
