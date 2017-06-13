import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Article from './Article';
import EditPage from './EditPage';
import NewPage from './NewPage';

class BlogPage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: 'anonymous',
      accessToken: '',
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
      // window.FB.api(`me/?access_token${getAccessToken}`);
      // window.FB.api('/me', 'post', { access_token: getAccessToken });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  setName(getAccessToken) {
    window.FB.api('/me', { fields: 'name' }, (res) => {
      this.setState({
        loggedIn: true,
        name: res.name,
        accessToken: getAccessToken,
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
      // const accessToken = window.FB.getAuthResponse();
      localStorage.setItem('accessToken', response.authResponse.accessToken);
      const getAccessToken = localStorage.getItem('accessToken');
      console.log(getAccessToken);
      this.setName(getAccessToken);
    } else {
      this.setAnonymous();
    }
  }
  checkLoginState() {
    window.FB.getLoginStatus((res) => {
      this.statusChangeCallback(res);
    });
  }
  MyNewPage = () => <NewPage name={this.state.name} />
  MyEditPage = () => <EditPage name={this.state.name} />
  MyArticle = () => <Article name={this.state.name} />
  MyHomePage = () => <HomePage name={this.state.name} />
  render() {
    const { loggedIn, name } = this.state;
    return (
      <div>
        <Header loggedIn={loggedIn} name={name} />
        <BrowserRouter>
          <Switch>
            <Route path="/article/new" render={this.MyNewPage} />
            <Route path="/article/edit/:articleId" render={this.MyEditPage} />
            <Route path="/article/:articleId" render={this.MyArticle} />
            <Route exact path="/" render={this.MyHomePage} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default BlogPage;
