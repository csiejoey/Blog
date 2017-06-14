import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BlogPage from './js/BlogPage';

// require('./../public/b.ico');
const App = () => (
  <MuiThemeProvider>
    <BlogPage />
  </MuiThemeProvider>
);

ReactDom.render(
  <App />,
  document.getElementById('root'),
);
