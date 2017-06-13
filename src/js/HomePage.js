import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    return (
      <div>
        {titleArr.map((x, i) =>
          <Link
            id={i}
            key={x._id}
            to={`/article/${x._id}`}
          >
            <h2>{x.title}</h2>
          </Link>
        )}
      </div>
    );
  }
  render() {
    return (
      <div>
        <h3>this is HomePage</h3>
        {this.titleLinks()}
      </div>
    );
  }
}

export default HomePage;
