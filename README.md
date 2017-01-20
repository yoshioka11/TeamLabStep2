# TeamLaboStep2

課題:TodoListの作成
https://docs.google.com/spreadsheets/d/1_4966YxUYcZivq_Q9L5p18y0LSm3XKbgpGNojStsaCg/edit#gid=1156893897

仕様は仕様書の通り

ルーティングで各fileにアクセス。
固定でTopPageへのリンクと検索画面を表示するために
headerファイルで固定。
footerに関してはファイルを各viewに対応させたものを作りたかったので作ってはあるが特に使わず。

app.jsにapiを集約させ

ejs      js
index = list
search = search
show = todos
と対応させた。
