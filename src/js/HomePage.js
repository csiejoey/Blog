import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { List, ListItem } from 'material-ui/List';
import ActionDescription from 'material-ui/svg-icons/action/description';
import Divider from 'material-ui/Divider';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    // const getAccessToken = localStorage.getItem('accessToken');
    // console.log(getAccessToken);
    fetch('/api/get-posts')
      .then(res => res.json())
      .then((fetchedPosts) => {
        // console.log(fetchedPosts[0]);
        let posts = fetchedPosts;
        // do i need to clean up state?
        posts = posts.map((p) => {
          return p;
        });
        return this.setState({ posts });
      })
      .catch(err => console.error(err));
  }
  titleLinks() {
    const titleArr = this.state.posts.reverse();
    console.log(titleArr);
    return (
      <div>
        <List>
          {titleArr.map((x, i) =>
            <Link
              id={i}
              key={x._id}
              to={`/article/${x._id}`}
            >
              <ListItem
                leftAvatar={<ActionDescription />}
                primaryText={x.title}
                secondaryText={
                  <p>
                    <span>{x.author} -- </span>
                    <span>{x.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}</span>
                  </p>
                }
                secondaryTextLines={2}
              />
              <Divider inset={true} />
            </Link>
          )}
          {/* <ListItem
            leftAvatar={<ActionDescription />}
            primaryText="primary_text"
            secondaryText={
              <p>
                <span>author</span>
                content
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} /> */}
        </List>
        {/* {titleArr.map((x, i) =>
          <Link
            id={i}
            key={x._id}
            to={`/article/${x._id}`}
          >
            <h2>{x.title}</h2>
          </Link>
        )} */}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.titleLinks()}
      </div>
    );
  }
}

export default HomePage;
