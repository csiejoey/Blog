// not used
import React, { Component } from 'react';
import BlogPage from './js/BlogPage';

class FBLogin extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: '',
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
    window.FB.api('/me', (res) => {
      this.setState({
        loggedIn: true,
        name: res.name,
      });
    });
  }
  // this.props.setState?
  setAnonymous() {
    this.setState({
      loggedIn: false,
      name: 'anonymous',
    });
  }
  statusChangeCallback(res) {
    console.log('statusChangeCallback');
    console.log(res);
    if (res.status === 'connected') {
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
    if (this.state.login === false) {
      return (
        <div
          class="fb-login-button"
          data-size="medium"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="true" />
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
        {this.loginBtn()}
        <BlogPage />
      </div>
    );
  }
}

export default FBLogin;
