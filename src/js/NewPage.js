import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';

class NewPage extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: '',
      contentInput: '',
      inputDirty: false,
    };
  }
  componentDidMount() {
    // const getAccessToken = localStorage.getItem('accessToken');
    // console.log(getAccessToken);
    CKEDITOR.replace('editor', {
      skin: 'moono',
    });
    CKEDITOR.instances.editor.on('change', () => {
      const data = CKEDITOR.instances.editor.getData();
      console.log(data);
      this.setState({
        contentInput: data,
      });
    });
  }
  setInputData() {
    CKEDITOR.instances.editor.setData(this.state.contentInput);
  }
  setInputDirty(e) {
    const isDirty = !!e.target.value.trim();
    this.setState({ inputDirty: isDirty });
  }
  fetchArticleIdAndRedirect() {
    fetch('/api/get-posts')
      .then(res => res.json())
      .then((fetchedPosts) => {
        const newestId = fetchedPosts.reverse()[0]._id;
        // must change url after deploy!
        window.location.href = `http://localhost:3000/article/${newestId}`;
      })
      .catch(err => console.error(err));
  }
  postArticle() {
    if (!this.state.inputDirty) {
      alert('title cant be blank');
      return;
    }
    fetch('/api/post', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.titleInput,
        content: this.state.contentInput,
        author: this.props.name,
        time: new Date(),
      }),
    })
    .then(this.fetchArticleIdAndRedirect())
    .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <h3>this is NewPage</h3>
        <textarea
          placeholder="title..."
          value={this.state.titleInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ titleInput: e.target.value })}
        />
        <textarea
          id="editor"
        />
        {/* <CKEditor
          defaultValue={this.state.contentInput}
          editorInput={e => this.setInputDirty(e)}
          editorChange={e => this.setState({ contentInput: e })}
        /> */}
        {/* <textarea
          placeholder="author..."
          value={this.state.authorInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ authorInput: e.target.value })}
        /> */}
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
