import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';

class NewPage extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: '',
      contentInput: '',
      authorInput: '',
      inputDirty: false,
    };
  }
  setInputDirty(e) {
    const isDirty = !!e.target.value.trim();
    this.setState({ inputDirty: isDirty });
  }
  fetchArticleId() {
    fetch('/api/get-posts')
      .then(res => res.json())
      .then((fetchedPosts) => {
        const newestId = fetchedPosts.reverse()[0]._id;
        // must change url after deploy!
        window.location.href=`http://localhost:3000/article/${newestId}`;
      })
      .catch(err => console.error(err));
  }
  postArticle() {
    fetch('/api/post', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.titleInput,
        content: this.state.contentInput,
        author: this.state.authorInput,
        time: new Date(),
      }),
    })
    .then(this.fetchArticleId())
    .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <textarea
          placeholder="title..."
          value={this.state.titleInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ titleInput: e.target.value })}
        />
        <textarea
          placeholder="content..."
          value={this.state.ContentInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ contentInput: e.target.value })}
        />
        <textarea
          placeholder="author..."
          value={this.state.authorInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ authorInput: e.target.value })}
        />
        <nav>
          <Link to="/">
            <button>
              Cancel
            </button>
          </Link>
          <button onClick={() => this.postArticle()}>
            Post
          </button>
          <Prompt
            when={this.state.inputDirty}
            message="leaving?"
          />
        </nav>
      </div>
    );
  }
}

export default NewPage;
