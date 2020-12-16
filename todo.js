//設定すること
//イベント　クリックファンクション　タスク追加　id=addをおした時
//

const button = document.getElementById("add");
button.addEventListener("click", function () {
  const input = document.getElementById("new");
  //<li>を作り出す
  const ul = document.getElementById("list");

  ul.insertAdjacentHTML(
    "afterbegin",
    '<li><input type="checkbox" id="check"><span id="input_text"></span><button id="btn">終了</button><button id="delete">削除</button></li>'
  );

  const text = document.getElementById("input_text");
  text.innerHTML = input.value;
  input.value = "";

  const donebutton = document.getElementById("btn");

  //削除ボタン
  const Deletebutton = document.getElementById("delete");
  Deletebutton.addEventListener("click", function () {
    const target = Deletebutton.parentNode;
    target.remove();
  });

  const check1 = document.getElementById("check");
  check1.addEventListener("change", function () {
    if (this.checked) {
      donebutton.classList.add("b-done");
    } else {
      donebutton.classList.remove("b-done");
    }
  });

  //クリックイベント
  donebutton.addEventListener("click", function () {
    if (check1.checked) {
      //class doneを追加する
      text.classList.add("done");
    }
  });
});

let today = new Date();
let todayHtml =
  today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

const todayspan = document.getElementById("day");
todayspan.innerHTML = todayHtml;

//タイマー作成
let start;
let timer_id;

document.getElementById("start").addEventListener("click", function () {
  if (this.innerHTML === "START") {
    start = new Date();

    timer_id = setInterval(goTimer, 10);

    //STOPボタン
    this.innerHTML = "STOP";
    this.classList.remove("bl");
    this.classList.add("red");
  } else {
    clearInterval(timer_id);
    //STARTボタンに戻す
    this.innerHTML = "START";
    this.classList.remove("red");
    this.classList.add("bl");
  }
});

let addZero = function (value) {
  if (value < 10) {
    value = "0" + value; //0秒〜９秒までは0+秒表示
  }
  return value;
};

let goTimer = function () {
  let now = new Date();

  //今の時間からスタートボタンを押した時間を引く
  let milli = now.getTime() - start.getTime();
  //小数点以下切り捨て
  let seconds = Math.floor(milli / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;

  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);

  document.getElementById("timer").innerHTML =
    hours + ":" + minutes + ":" + seconds;
};

const bmbutton = document.getElementById("bmi_btn");
bmbutton.addEventListener("click", function () {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  const BMI_value =
    parseFloat(weight) /
    ((parseFloat(height) / 100) * (parseFloat(height) / 100));
  const result = document.getElementById("bm_value");
  const BMI = Math.ceil(BMI_value * 10) / 10;
  result.innerHTML = BMI;
});

const calbutton = document.getElementById("cal_btn");
calbutton.addEventListener("click", function () {
  const carbo = document.getElementById("carbo").value * 4;
  const protein = document.getElementById("protein").value * 4;
  const fat = document.getElementById("fat").value * 9;
  const cal = parseFloat(carbo) + parseFloat(protein) + parseFloat(fat);
  const result_cal = document.getElementById("cal_value");

  result_cal.innerHTML = cal + "kcal";
});


'use strict';
console.clear();

{ 
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();　//5月

  //カレンダーの頭の日付けを取得　前月の残り部分
  function getCalendarHead(){
    const dates = [];
    const d = new Date(year, month, 0).getDate();　//今月の0日目→前月の最終日を取得 例30,
    const n = new Date(year, month, 1).getDay();　//今月の１日の曜日（day）の数字を取得　日曜なら０　木曜なら４

    //ループを回す
    for(let i=0; i < n; i++){
      //30
      //29, 30
      //28,29,30
      dates.unshift({　//datesは連想配列 unshift配列の先頭に持ってくる
        date: d - i,　　// 30からi(つまりnを引く)30日からn(例：木曜日の4)
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;

  }

 //今月の日付けを取得
  function getCalendarBody(){
    const dates = []; //date:日付, day:曜日　空の配列 この配列に１〜３１をいれる
     
    //Date(2020,5月,0)0でその月の最後の日を取得する
    //getDate();指定された日付の「日」を返す。
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    for (let i = 1; i <= lastDate; i++){
   　//dates空の配列にiを追加push
    //単純な配列ではなく、オブジェクト配列
      dates.push({
       date: i,
       isToday: false,//クラスをつけるかどうかをfalseで保持
       isDisabled: false, 
        
      });
  }

  //年も月も同じだったら
  if (year === today.getFullYear() && month === today.getMonth()){
  //該当日を太字にisTodayをtrueで上書き
  dates[today.getDate() - 1].isToday = true;
  }
  return dates;
  }
      //カレンダー翌月の日付けを取得
      function getCalendarTail(){
        const dates = [];//空の配列

        //末日の曜日を取得して　7-4(木曜日の場合)
        const lastDay = new Date(year, month + 1, 0).getDay();
  
        for(let i = 1; i < 7 - lastDay; i++){ //1〜7までの範囲でok
          dates.push({
            date: i,
            isToday: false,
            isDisabled: true,
          });
        }
        return dates;
      }

      function clearCalendar(){
        const tbody = document.querySelector('tbody');
        //カレンダーfunctionが機能するたびをリセットする処理
        while (tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }
      }
      function renderTitle(){
      //String(month + 1).padStart(2, '0') stringで文字列に　padStartで２桁表示
      //カレンダーの月２桁表示
      const title = `${year}/${String(month + 1).padStart(2, '0')}`;
      document.getElementById('title').textContent = title;
      }

      function renderWeeks(){
        const dates = [
          ...getCalendarHead(),
          ...getCalendarBody(),
          ...getCalendarTail(),
          ]; 
    
          //週ごとに描画するので、７日分に分ける
          const weeks = [];
          const weeksCount = dates.length / 7;　//何周あるかはdatesの個数を７でわる
          //iはループを回す回数を指定
          for (let i = 0; i < weeksCount; i++){
          //先頭から７個分を削除しつつ取り出す
          //spliceは削除したあとに、その削除した要素を取得することができます。それをpushしています。
            weeks.push(dates.splice(0,7));
          }
    
    
          //HTMLの描画　取り出した配列をweekとしつつ処理を回していく
          weeks.forEach(week => {
            const tr = document.createElement('tr');
            
            //取り出した要素をdateにしてtdを作る
            week.forEach(date => {
            const td = document.createElement('td');
      
              td.textContent = date.date;
              //isTodayプロパティがtrueだとtodayつける
              if (date.isToday) {
                td.classList.add('today');
              }
              //isDisabledプロパティがtrueならdisabledをつける
              if (date.isDisabled) {
                td.classList.add('disabled');
              }
              
              tr.appendChild(td);
            });
            //tbodyを取得して後ろにtrをつける
            document.querySelector('tbody').appendChild(tr);
          });

      }
    
      //一つにまとめる
    function createCalendar(){
      clearCalendar();
      renderTitle();
      renderWeeks();
    }
    //クリックすると前月分を表示
    document.getElementById('prev').addEventListener('click', () =>{
      month--;//月を-1
      if(month < 0){ //月が0より小さい
        year--;　//年を1引いて
        month = 11; //12月に戻す
      }
      createCalendar();

    });

    //todayクリックすると今月に戻る
    document.getElementById('today').addEventListener('click', () =>{
      year = today.getFullYear();
      month = today.getMonth();
      createCalendar();

    });
    //クリックすると次月分を表示
    document.getElementById('next').addEventListener('click', () =>{
      month++;
      if(month > 11){ //12月を超えたら
        year++;　//年を1たす
        month = 0;　//1月にする
      }
      createCalendar();

    });
    createCalendar();


}
