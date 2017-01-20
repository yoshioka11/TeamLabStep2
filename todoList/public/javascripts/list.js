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
      var i = 0;
      $.each(lists, function(index, list){
        var most = new Date(list.most),
            mostYear = most.getFullYear(),
            mostMonth = most.getMonth() + 1,
            mostDate = most.getDate();
        //日付がないものはtodoがないと表示する。
        if(!(Number(mostYear))){
          $list.append('<li><a href="/todo/id='+ list.listId +'">'+ valueEscape(list.title) + '</a><br><span>ToDoがありません。</span></li>');
        }else{
          $list.append('<li><a href="/todo/id='+ list.listId +'">'+ valueEscape(list.title) + '</a><br><span>'+list.sum+'個中'+list.checkSum+'個がチェック済</span><br>~'+mostYear+'年'+mostMonth+'月'+mostDate+'日</li>');
        }
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
  console.log(name.length);
  // /todoにPOSTアクセスする
  if(name.length < 31 && name.length > 0){
      $.post('/addList', {name: name}, function(res){
        $('#newAdd').text("新しいリストを追加しました。");
        console.log(res);
        getList();
      });
  }else{
    $('#newAdd').text("Listのタイトルは30文字以内で設定してください。");
  }

}

//エスケープ関数
function valueEscape(val){
    return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
}
