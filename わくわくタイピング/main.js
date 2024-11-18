
// テキスト配列
const textLists = [
  `konnnyakubatake`,
  `wassyoi`,
  `pasokonn`,
  `sennbei`,
  `akaharaimori`,
  `niigatanokomehaumai`,
  `saikinnhasugukurakunaru`,
  `gohannpakupaku`,
  `pizahatto`,
  `hottomotto`, //10
  `gannbaruzo!`,
  `masukottonoki-bou`,
  `ohosisamakirakira`,
  `kataagepoteto`,
  `orennji`,
  `no-to`,
  `kaijuu`,
  `mokomokose-ta-`,
  `seityoutuu`,
  `sekainisatiare`,
];

const nihongoLists = [
  `こんにゃく畑`,
  `わっしょい`,
  `パソコン`,
  `せんべい`,
  `アカハライモリ`,
  `新潟の米はうまい`,
  `最近はすぐ暗くなる`,
  `ごはんパクパク`,
  `ピザハット`,
  `ほっともっと`, //10
  `がんばるぞ！`,
  `マスコットのキー坊`,
  `お星さまキラキラ`,
  `堅あげポテト`,
  `オレンジ`,
  `ノート`,
  `怪獣`,
  `もこもこセーター`,
  `成長痛`,
  `世界に幸あれ`, //20
];

// なんもない文字列を作ってるってことか？
let untyped = ``;
let typed = ``;
let score = 0;
let nihongo = ``;

// 定義
const untypefield = document.getElementById(`untyped`);
const typedfield = document.getElementById(`typed`);
const wrap = document.getElementById(`wrap`);
const start = document.getElementById(`start`);
const count = document.getElementById(`count`);
const correct = document.getElementById(`correct`);
const keybo = document.getElementById(`keybo`);
const nihongofield = document.getElementById(`nihongo`);

// スタートボタンの処理
start.addEventListener(`click`, ()=>{

  timer();
  createText();
  // 画面でキーを押すと関数が呼び出される
  document.addEventListener(`keypress`, keyPress);
  // ボタンの非表示
  start.style.display = `none`;
  untypefield.style.display = `inline`;
});

// 文字列をランダムで表示
const createText = () =>{

  // 画像の変更
  keybo.src = `images/keybo2.jpg`;

  // typed の部分を空にする
  typed = ``;
  typedfield.textContent = typed;

// ランダムな整数　ランダムな少数に4（配列の長さ）を掛けて切り捨てをして整数を得ている
  let random = Math.floor(Math.random()*textLists.length);
  untyped = textLists[random];
  untypefield.textContent = untyped;

  nihongo = nihongoLists[random];
  nihongofield.textContent = nihongo;
};

// キー入力の判定 ここのeについて　(イベントオブジェクト)
const keyPress = e =>{

  // 誤タイプの場合終了（return）
  if (e.key !== untyped.substring(0,1)) {
    wrap.classList.add(`mistyped`);
    keybo.src = `images/keyboNaki.jpg`;

    setTimeout(() => {
      wrap.classList.remove(`mistyped`);
      keybo.src = `images/keybo2.jpg`;
    }, 300);
    return;
  }

  // typed に　untyped　の一文字目を付け加えている(正タイプ時の処理)
  score++;
  // 現在の正タイプ数を表示
  correct.textContent = score;
  typed += untyped.substring(0,1);
  typedfield.textContent = typed;
  // 選ばれた文字列の２文字目以降全部
  untyped = untyped.substring(1);
  untypefield.textContent = untyped;

  // 文字列が空になったら起動
  if (untyped === ``) {
    createText();
  }
};

// タイマー 1秒ずつ数字を減らす
const timer =()=>{
  const id = setInterval(() => {
    count.textContent--;
    if (count.textContent <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ランクを判定
const rankCheck = score =>{
  let text =``;
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100-score}文字です。`;
  }else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200-score}文字です。`;
  }else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300-score}文字です。`;
  }else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます！`;
  }

  return `${score}文字打てました！\n${text}\n【OK】リトライ【キャンセル】終了`;

};

// ゲームを終了
const gameOver = id =>{
  clearInterval(id);
  // タイムアップを表示
  typedfield.textContent = ``;
  untypefield.textContent = ``;
  nihongofield.textContent = `タイムアップ！`;
  keybo.src = `images/keyboClear.jpg`;
  setTimeout(() => {
    const result = confirm(rankCheck(score));
    // OKの場合リロード
    if (result == true) {
      window.location.reload();
    }
  }, 10);
};