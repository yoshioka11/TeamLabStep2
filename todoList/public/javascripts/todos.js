$(function(){
  getTodo();
});

function getTodo(){

  // すでに表示されている一覧を非表示にして削除する
  var $list = $('.list');
  $list.fadeOut(function(){
    $list.children().remove();
    //todosにGETアクセスする
    $.get('/todos', function(lists){
      // 取得したToDoを追加していく
      $.each(lists, function(index, list){
        $list.append('<li><a href="/todo/'+ list.listId +'">'+ list.title + '</a></li>');
      });
      // 一覧を表示する
      $list.fadeIn();
    });
  });
}
