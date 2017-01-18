$(function(){
  getList();
});
$('#form').submit(function(){
  postList();
  return false;
});

function getList(){
  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    // /listsにGETアクセスする
    $.get('/lists', function(lists){
      // 取得したToDoを追加していく
      $.each(lists, function(index, list){
        $list.append('<li><a href="/todo/id='+ list.listId +'">'+ list.title + '</a></li>');
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });


}

// フォームに入力されたToDoを追加する
function postList(){
  // フォームに入力された値を取得
  var name = $('#title').val();
  //入力項目を空にする
  $('#title').val('');
  console.log(name);
  // /todoにPOSTアクセスする
  $.post('/addList', {name: name}, function(res){
    $('#newAdd').append("新しいリストを追加しました。");
    console.log(res);

    getList();
  });
}
