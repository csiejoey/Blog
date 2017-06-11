## ｊｏｅｙ‘ｓ　ｂｌｏｇ

## ａｕｔｈｏｒ：ｊｏｅｙ　ｈｕａｎｇ

blog 2: without using create-react-app

practice:
1. material ui
2. fb.login
3. mongo/mongoose v
4. react-router   v
5. favicon
6. (testing)
7. uglify(webpack)
8. loading(transition)

problem faced:

2. different tables?
3. how to save reply? foreign key?
4. ejs's index.html?
5. mongoose.Promise = global.Promise; ?

problem solved:
1. create-react-app watch automatically
2. online database => use mongodb
3. kill the occupied port 'lsof -i tcp:3000' || delete cache in devtool-> application cache storage
4. 'import': webpack reads babelrc -> transpile -> output bundle.js to 'static' folder in middleware(virtual folder)(publicPath) -> include script in index.html
5. mac/data/db/mongodb-osx..... => ./mongod (this is the server, and ./mongo is the client)

notice:
1. module.exports = server;
2. static dirname (beware of 'path')
3. node server.js (manually execute it)
4. naming filename & classname the same
5. include 'path', 'webpack'
6. place bundle.js script in <body> rather than <head>
7. npm script: 'eslint .'
8. why can't i server.use('/test', () => res.json('xxxxxxx');); in server.js ====> don't forget arguments (req, res)
9. cli copy directory => cp -a /source/. dest
10. router.post('/rmpost/:articleId') & req.params.articleId => naming has to be same
11. (req, res) don't mess up the ORDER!!!!! first req, second res.

------------------------------------------------------------------------------

Requirement

需連接 database（種類不限）
需實現所見及所得編輯
實作 Restful API
UI

發文頁面
文章總欄頁面（advance: 分頁）
單一文章頁面（advance: 留言功能）
Optional

登入系統

<div>
  <textarea
    placeholder="title..."
    value={this.state.titleInput}
    onInput={e => this.setInputDirty(e)}
    onChange={e => this.setState({ titleInput: e.target.value })}
  />
  <textarea
    placeholder="content..."
    value={this.state.contentInput}
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
