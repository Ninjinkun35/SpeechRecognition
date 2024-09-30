SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const sr = new SpeechRecognition();//音声認識インタフェースを取得しsrに格納
const btn = document.getElementById("startButton");//button（開始ボタン）のエレメント取得
const btn2 = document.getElementById("stopButton")//button（停止ボタン）のエレメント取得
const che = document.getElementById("check");//div（「認識中…」表示領域）のエレメント取得
const log = document.getElementById("textLog");//div（ログ表示領域）のエレメント取得
sr.interimResults = true;//認識途中の文の表示
sr.continuous = true;//連続的に認識するための設定
btn2.disabled = true;//停止ボタンの無効化

sr.addEventListener("result", function(e) {
  //console.log(e);
  console.log(e.results); // 音声認識を終えたら、音声認識インタフェースがresultイベントを返す
  let tmp = ""; //変数tmpの定義
  for (let i = 0; i < e.results.length; i++) {
    tmp = tmp + "<div>" + e.results[i][0].transcript + "</div>"; //文を連続で認識した結果をtmpへの代入
    //log.innerHTML = "<div>" + log.innerHTML + "</div>" + "";
  }
  log.innerHTML = tmp;
});

// continuousがtrueになっている場合，認識結果が配列にずっと溜まっていきます．
// つまり，こちらでログを管理する必要はなく，配列の[0]番目から， results.length の長さ分だけの文字列をそのまま表示すれば良いです．
// 例えば最終的に画面に表示したい文字列を
// let tmp="";
// のように定義して，繰り返し文の中で，
// tmp += "<div>" + ここで添字iに格納された文字列を… + "</div>";
// な感じでtmpに表示する文字列を溜めていきます．
// そして，繰り返しが終わった後に log.innerHTML に tmp を代入したら完成ですね．

sr.addEventListener("start", function() {
  che.innerHTML = "<div>認識中… </div>" //認識開始時、「認識中…」の表示
  btn.disabled = true;//開始ボタンの無効化
  btn2.disabled = false;//停止ボタンの無効化キャンセル
});

sr.addEventListener("end", function() {
  che.innerHTML = "";//認識終了時、「認識中…」の取消し
  btn.disabled = false;//開始ボタンの無効化キャンセル
  btn2.disabled = true;//停止ボタンの無効化
});

btn.addEventListener("click", function() {
  sr.start(); //ボタンのclickイベントハンドラ（音声認識を開始する）
});

btn2.addEventListener("click", function() {
  sr.stop(); //ボタンのclickイベントハンドラ（音声認識を停止する）
});