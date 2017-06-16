## ｊｏｅｙ‘ｓ　ｂｌｏｇ

## ａｕｔｈｏｒ：ｊｏｅｙ　ｈｕａｎｇ

A commentable blog.

## usage:
## to have author name, you must login in "POSTING" page, for i have unfixed bug, sorry.
## 一定要在「發文」的頁面，臉書登入，發文，才會有名字，因為我有ｂｕｇ，抱歉。

practice:
1. material ui      v
2. fb.login
3. mongo/mongoose   v
4. react-router     v
5. favicon          v
6. (testing)
7. uglify(webpack)  v
8. loading(transition)
9. CKEditor         v

## try CKEditor's HTMLPARSER (next time => try react-rte)

problem faced:
1. const parsedContent = this.state.content.replace(/\r?\n/g, '<br />');
2. why can't i rerender reply array?
3. difference between
  boo(res) { console.log(res) }
  boo = (res) => { console.log(res) }
4. fetch vs isomorphic fetch
5. mongoose.Promise = global.Promise; ?
6. production v.s. test?
7. CKEditor: how to fix photo-upload & table
8. console.log(this.props.value) twice? the first time is undefined? why cant i pass as props?
9. automatically logout?
10. firebox css property????

problem solved:
1. create-react-app watch automatically
2. online database => use mongodb
3. kill the occupied port 'lsof -i tcp:3000' || delete cache in devtool-> application cache storage
4. 'import': webpack reads babelrc -> transpile -> output bundle.js to 'static' folder in middleware(virtual folder)(publicPath) -> include script in index.html
5. mac/data/db/mongodb-osx..... => ./mongod (this is the server, and ./mongo is the client)
6. use state change instead of redirect to post and remove reply.
7. react router 4 pass props: use render method
  MyHomePage = () => <HomePage name={this.state.name} />
  <Route exact path="/" render={this.MyHomePage} />
8. favicon path: find the path of middleware directory
9. must define isomorphic fetch for safari, ie, and firefox (import 'babel-polyfill';import fetch from 'isomorphic-fetch';)

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
12. must CONNECT TO INTERNET while using CDN....
13. after CKEditor => notice the parsed data => no need to e.target.value
14. don't parsedhtml while saving to db, it will cause multi <br /> everytime edited.
15. don't reverse array everytime rendered
16. don't setState while posting => it will cause refresh(render)
17. notice the correctness of redirect url!
18. The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
19. i -S everything...
20. babel-cli must be add to use babel-node

------------------------------------------------------------------------------

mlab username: csiejoey, bloguri

Requirement

v 需連接 database（種類不限）
v 需實現所見及所得編輯
v 實作 Restful API
UI

發文頁面
v 文章總欄頁面（advance: 分頁）
v 單一文章頁面（advance: 留言功能）
Optional

登入系統
