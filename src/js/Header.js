import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: 'anonymous',
    };
  }
  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '330684807331906',
        cookie: true,
        xfbml: true,
        version: 'v2.9',
      });
      window.FB.AppEvents.logPageView();
      window.FB.Event.subscribe('auth.statusChange', this.statusChangeCallback);
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  setName() {
    window.FB.api('/me', { fields: 'name' }, (res) => {
      this.setState({
        loggedIn: true,
        name: res.name,
      });
    });
  }
  setAnonymous() {
    this.setState({
      loggedIn: false,
      name: 'anonymous',
    });
  }
  statusChangeCallback = (response) => {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      this.setName();
    } else {
      this.setAnonymous();
    }
  }
  checkLoginState() {
    window.FB.getLoginStatus((res) => {
      this.statusChangeCallback(res);
    });
  }
  loginBtn() {
    if (this.state.loggedIn === false) {
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
        <div>{this.state.name}</div>
      );
    }
  }
  render() {
    return (
      <div>
        <h1>CKDCGOOD</h1>
        {this.loginBtn()}
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
