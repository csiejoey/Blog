import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ContentCreate from 'material-ui/svg-icons/content/create';
import NewPage from './NewPage';
import HomePage from './HomePage';
import logo from './../../public/b.svg';
import './../css/Header.css';

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
        <div className="nav">
          <div className="leftBtn">
            <img
              src={logo}
              alt="b"
            />
            <h1>ｅ　ａ　ｇｏｏｄ　ｍａｎ，老爸都唸</h1>
          </div>
          <div className="rightBtn">
            <div className="svgBtn">
              <IconButton tooltip="ｈｏｍｉｅｐａｇｅ">
                <a href="https://joeyyee-blog.herokuapp.com/">
                  <ActionHome />
                </a>
              </IconButton>
              <IconButton tooltip="ｎｅｗ　ｓｈｙｔ">
                <a href="https://joeyyee-blog.herokuapp.com/article/new">
                  <ContentCreate />
                </a>
              </IconButton>
            </div>
            {this.loginBtn()}
          </div>
        </div>
        <hr />
        {/* <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <br />
            <Link to="/article/new">New</Link>
            <Route exact path="/" />
            <Route path="/article/new" />
          </nav>
        </BrowserRouter> */}
      </div>
    );
  }
}

export default Header;
