import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';
import Reply from './Reply';

class Article extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      author: '',
      time: '',
      reply: [],
      articleId: '',
    };
  }
  componentDidMount() {
    const { articleId } = this.props.match.params;
    fetch(`/api/get-posts/${articleId}`)
      .then(res => res.json())
      .then((article) => {
        this.setState({
          title: article.title,
          content: article.content,
          author: article.author,
          time: article.time,
          reply: article.reply,
          articleId: article._id,
        });
      })
      .catch(err => console.error(err));
  }
  removeArticle() {
    fetch(`/api/rmpost/${this.state.articleId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .catch(err => console.error(err));
      window.location.href=`http://localhost:3000/`;
  }
  article() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <hr />
        <h3>{this.state.content}</h3>
        <hr />
        <h3>{this.state.author}-{this.state.time}</h3>
      </div>
    );
  }
  controlBtn() {
    return (
      <div>
        <button>
          <Link to={`/article/edit/${this.state.articleId}`}>
          edit
          </Link>
        </button>
        <button onClick={() => this.removeArticle()}>remove</button>
      </div>
    );
  }
  render() {
    const replyArr = this.state.reply.reverse();
    return (
      <div>
        {this.article()}
        {this.controlBtn()}
        {replyArr.map((x, i) =>
          <Reply
            id={i}
            key={`${x._id}`}
            replyBody={x}
            // editReply={}
            removeReply={replyId => this.removeReply(replyId)}
          />,
        )}
        {/* <Input /> */}
      </div>
    );
  }
}

export default Article;
