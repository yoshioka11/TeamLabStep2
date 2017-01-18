var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var post = require('./routes/post')
var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/todoList');
//DBのlistIDでauto incrementを使いたいので定義
var autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(connection);

var app = express();

// view engine setup
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//内容スキーマ設計(チェック,内容,作成日,期限)
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  isCheck     : {type: Boolean, default: false},
  content     : String,
  createdDate : {type: Date, default: Date.now},
  limitDate   : Date,
  listId      : {type: Number}
});
mongoose.model('Todo', todoSchema);
//一覧スキーマの設計(listID,タイトル,リスト内todoの合計,リスト内チェックされたtodoの合計)
var listSchema = new Schema({
  title     : String,
  sum       : {type: Number},
  checkSum  : {type: Number}
});
listSchema.plugin(autoIncrement.plugin, {model:'List',field:'listId'});
mongoose.model('List',listSchema);

app.get('/lists',function(req,res){
  var List = mongoose.model('List');
  List.find({},function(err,lists){
    res.send(lists);
  });
});

app.get('/',post.index);

app.post('/addList',function(req,res){
  var title = req.body.name;
  if(title){
    var List = mongoose.model('List');
    var list = new List();
    list.title = title;
    list.sum = 0;
    list.checkSum = 0;
    list.save();
    res.send(true);
  }else{
    res.send(false);
  }
});
app.get('/todo/id=:id([0-9]+)',post.show);

app.get('/todos',function(req,res){
    var listId = (req.query.ids);
    console.log(req.query.ids);
    var Todo = mongoose.model('Todo');
    Todo.find({listId: listId},function(err,todos){
    res.send(todos);
  });
});

app.post('/addTodo',function(req,res){
  var content = req.body.content;
  var listId = req.body.listId;
  var limit = req.body.limit;
  console.log(limit+listId+content);
  if(content && listId && limit){
      var Todo = mongoose.model('Todo');
      var todo = new Todo();
      todo.content = content;
      todo.limitDate = limit;
      todo.listId = listId;
      todo.save();

      res.send(true);
  }else{
    res.send(false);
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
