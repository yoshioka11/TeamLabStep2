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
      if(todos.length > 0){
        $('#nan').text('');
      $.each(todos, function(index, todo){
        var create = new Date(todo.createdDate),
            createdYear = create.getFullYear(),
            createdMonth = create.getMonth() + 1,
            createdDate = create.getDate();

        var limit = new Date(todo.limitDate),
            limitYear = limit.getFullYear(),
            limitMonth = limit.getMonth() + 1,
            limitDate = limit.getDate();
            if(todo.isCheck){
              $list.prepend('<li>' + todo.content +'<br>作成日: '+createdYear+ '年'+createdMonth+'月' +createdDate+'日<br> 期限:' + limitYear + '年' + limitMonth + '月' + limitDate + '日<br><span id='+todo.createdDate+'>完了</span><li>');
            }else{
        $list.prepend('<li>' + todo.content +'<br>作成日: '+createdYear+ '年'+createdMonth+'月' +createdDate+'日<br> 期限:' + limitYear + '年' + limitMonth + '月' + limitDate + '日<br><form class="tes" value="'+todo.createdDate+'"><input type="submit" id="test" value="未完了"></form></li>').css('border','1px solid #ff0000');
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
$('#test').submit(function(){
  console.log('動いてるよ？');
  return false;
});
function addTodo(){
  var listId = $('#listId').val();
  var content = $('#content').val();
  var limit = new Date($('#limit').val());
  $.post('/addTodo',{content:content,limit:limit,listId:listId},function(res){
      console.log(res);
      getTodo();
  });
}
