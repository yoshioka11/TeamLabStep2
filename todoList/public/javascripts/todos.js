$(function(){
  getTodo();
  getTitle();
  // checkId();
});

$('#add').submit(function(){
  addTodo();
  // checkId();
  return false;
});
var check = 0;
//テストコード
// function checkId(){
//   var listId = $('#listId').val();
//   console.log("------");
//   console.log(listId);
// }


function getTodo(){
  check = 0;
var ids = $('#listId').val();
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    //todosにGETアクセスする
    $.get('/todos',{ids: ids},function(todos){
      // 取得したToDoを追加していく
      console.log(todos[0].title);
      if(todos.length > 0){
        $('#nan').text('');
      $.each(todos, function(index, todo){
        check = todo.todoId;
        //きれいに表示しようとすると助長だったので変数にしまって整頓した。
        var create = new Date(todo.createdDate),
            createdYear = create.getFullYear(),
            createdMonth = create.getMonth() + 1,
            createdDate = create.getDate();

        var limit = new Date(todo.limitDate),
            limitYear = limit.getFullYear(),
            limitMonth = limit.getMonth() + 1,
            limitDate = limit.getDate();
            if(todo.isCheck){
               $list.prepend('<li>' + valueEscape(todo.content) +'<br>作成日: '+createdYear+ '年'+createdMonth+'月' +createdDate+'日<br> 期限:' + limitYear + '年' + limitMonth + '月' + limitDate + '日<input class="checks" id="'+todo.todoId+'" name="checkbox'+todo.todoId+'" type="checkbox" value="'+todo.createdDate+'" onclick="change()" checked="checked"><li>').css('border','1px solid #ff0000');
            }else{
         $list.prepend('<li>' + valueEscape(todo.content) +'<br>作成日: '+createdYear+ '年'+createdMonth+'月' +createdDate+'日<br> 期限:' + limitYear + '年' + limitMonth + '月' + limitDate + '日<input class="checks" id="'+todo.todoId+'" name="checkbox'+todo.todoId+'" type="checkbox" value="'+todo.createdDate+'" onclick="done()"></li>').css('border','1px solid #ff0000');
      }
      });
    }else{
      $('#nan').text('登録されたToDoはありません。').css('color','red');
    }
      // 一覧を表示する
      $list.fadeIn();
    });
  });
}

function getTitle(){
  var ids = $('#listId').val();
  $.post('/getTitle',{title:ids},function(title){
    console.log(title);
    $.each(title,function(index,titles){
      console.log(titles);
      $('#listTitle').text(titles.title);
    });
  });
}

//作成ボタンを押すとpostでデータを送信app.js側でデータベースに入る
function addTodo(){
  var listId = $('#listId').val();
  var content = $('#content').val();
  console.log(content.length);
    if(content.length<31 && content.length > 0){
  var limit = new Date($('#limit').val());
  console.log(limit);
  $.post('/addTodo',{content:content,limit:limit,listId:listId},function(res){
      console.log(res);
      getTodo();
  });
    }else{
      $('#angry').text("１文字以上,30文字以内で入力してください");
    }
}

//checkboxにチェックが入った時に動作。postでいつのデータにチェックが入ったか送信。app.js側で受け取ったデータの時刻でisCheckがupdataされる。
//listIdも送信することでチェックボックスが押されたタイミングでcheckSumを更新することが出来る。
function done(){
var chekers = [];
var nakami = $('.checks').val();
var listId = $('#listId').val();
console.log('check='+check);
for(var i=0;check>=i;i++){
  if($('[name=checkbox'+i+']').prop("checked")){
    chekers.push(i);
    console.log(chekers);
  }
}
console.log(chekers+'を送信します。');
  $.post('/update',{checked:chekers,listId:listId},function(req,res){
  getTodo();
  });
  getTodo();
}

function change(){
var chekers = [];
var nakami = $('.checks').val();
var listId = $('#listId').val();
console.log('check='+check);
for(var i=0;check>=i;i++){
  if($('[name=checkbox'+i+']').prop("checked")){

  }else{
    chekers.push(i);
  }
}
console.log(chekers+'を送信します。');
  $.post('/change',{checked:chekers,listId:listId},function(req,res){
  getTodo();
  });
  getTodo();
}

//エスケープ関数
function valueEscape(val){
    return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
}
