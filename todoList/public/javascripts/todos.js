$(function(){
  getTodo();
  checkId();
});

$('#add').submit(function(){
  addTodo();
  checkId();
  return false;
});

function checkId(){
  var listId = $('#listId').val();
  console.log("------");
  console.log(listId);
}


function getTodo(){
var ids = $('#listId').val();
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    //todosにGETアクセスする
    console.log(ids);
    $.get('/todos',{ids: ids},function(todos){
      // 取得したToDoを追加していく
      $.each(todos, function(index, todo){
        var limit = new Date(todo.limitDate);

        console.log(limit);
        $list.append('<li><input type="checkbox" ' + (todo.isCheck ? 'checked' : '') + '>' + todo.content + ' 期限:' + limit.getFullYear() + limit.getMonth() + limit.getDate() +')<li>');
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });
}

function addTodo(){
  var listId = $('#listId').val();
  var content = $('#content').val();
  var limit = new Date($('#limit').val());
  $.post('/addTodo',{content:content,limit:limit,listId:listId},function(res){
      console.log(res);
      getTodo();
  });
}
