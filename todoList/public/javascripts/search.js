
$('#go').submit(function(){
  getResultList();
// getResultTodo();
  // checkId();
  return false;
});


function getResultList(){
  var contents = $('#kensaku').val();
  var $lists = $('.lists');
  var $list = $('#list');
  $lists.fadeOut(function(){
    $lists.children().remove();
// /listsにGETアクセスする
  $.get('/searchList',{contents:contents},function(resultList){
        // 取得したToDoを追加していく
        $list.text('ToDoリストが'+resultList.length+'件見つかりました。');
        $.each(resultList,function(index,results){
          var create = new Date(results.createdDate),
              createdYear = create.getFullYear(),
              createdMonth = create.getMonth() + 1,
              createdDate = create.getDate();
          $lists.append('<li><a href="/todo/id='+results.listId+'">'+results.title+'</a>作成日:'+ createdYear +'年'+createdMonth+'月'+createdDate+'日</li>');
      });
        // 一覧を表示する
        $lists.fadeIn();
      });
  });
  getResultTodo()
}

function getResultTodo(){
  var contents = $('#kensaku').val();
  var $todos = $('.todos');
  var $todo = $('#todo');
  $todos.fadeOut(function(){
    $todos.children().remove();
  $.get('/searchTodo',{contents:contents},function(resultTodo){
    $todo.text('ToDoが'+resultTodo.length+'件見つかりました。');
      $.each(resultTodo,function(index,results){
        var create = new Date(results.createdDate),
            createdYear = create.getFullYear(),
            createdMonth = create.getMonth() + 1,
            createdDate = create.getDate();
        $todos.append('<li><a href="/todo/id='+results.listId+'">'+results.content+'</a></li><p>リスト：'+results.title+'作成日:'+createdYear+'年'+createdMonth+'月'+createdDate+'日</p>');
      });
      $todos.fadeIn();
  });
});
}
