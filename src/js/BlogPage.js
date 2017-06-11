import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Article from './Article';
import EditPage from './EditPage';
import NewPage from './NewPage';

function BlogPage() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/article/new" component={NewPage} />
          <Route path="/article/edit/:articleId" component={EditPage} />
          <Route path="/article/:articleId" component={Article} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default BlogPage;
