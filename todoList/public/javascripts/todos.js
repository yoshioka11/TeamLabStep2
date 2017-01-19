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

//テストコード
// function checkId(){
//   var listId = $('#listId').val();
//   console.log("------");
//   console.log(listId);
// }


function getTodo(){
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
        //titleの表示
        $('#listTitle').text(todo.title);
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
              $list.prepend('<li>' + todo.content +'<br>作成日: '+createdYear+ '年'+createdMonth+'月' +createdDate+'日<br> 期限:' + limitYear + '年' + limitMonth + '月' + limitDate + '日<input class="checks" name="checkbox" type="checkbox" value="'+todo.createdDate+'" onclick="test()" checked="checked"><li>');
            }else{
        $list.prepend('<li>' + todo.content +'<br>作成日: '+createdYear+ '年'+createdMonth+'月' +createdDate+'日<br> 期限:' + limitYear + '年' + limitMonth + '月' + limitDate + '日<input class="checks" name="checkbox" type="checkbox" value="'+todo.createdDate+'" onclick="test()"></li>').css('border','1px solid #ff0000');
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
  var limit = new Date($('#limit').val());
  $.post('/addTodo',{content:content,limit:limit,listId:listId},function(res){
      console.log(res);
      getTodo();
  });
}

//checkboxにチェックが入った時に動作。postでいつのデータにチェックが入ったか送信。app.js側で受け取ったデータの時刻でisCheckがupdataされる。
//listIdも送信することでチェックボックスが押されたタイミングでcheckSumを更新することが出来る。
function test(){
var nakami = $('.checks').val();
var listId = $('#listId').val();
console.log(listId+'も送信します。');
console.log(nakami+'を送信します。');
  $.post('/update',{checked:nakami,listId:listId},function(req,res){
  getTodo();
  });
}
