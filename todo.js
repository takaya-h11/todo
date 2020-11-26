//設定すること
//イベント　クリックファンクション　タスク追加　id=addをおした時
//

const button = document.getElementById('add');
button.addEventListener('click', function(){
  const input = document.getElementById('new');
  //<li>を作り出す
  const ul = document.getElementById('list');
 
  ul.insertAdjacentHTML
  ('afterbegin', '<li><input type="checkbox" id="check"><span id="input_text"></span><button id="btn">終了</button></li>');

  const text = document.getElementById('input_text');
  text.innerHTML = input.value;

  const donebutton = document.getElementById('btn'); 
  
   
  const check1 = document.getElementById('check').checked;
   //クリックイベント
  donebutton.addEventListener('click',function(){
  //class doneを追加する
  text.classList.add('done');
  });
});

  let today = new Date();
  let todayHtml = today.getFullYear() + '/' 
  + (today.getMonth() +1) + '/' + today.getDate();

  const todayspan = document.getElementById('day');
  todayspan.innerHTML = todayHtml;


//タイマー作成
  let start;
  let timer_id;

  document.getElementById('start').addEventListener
  ('click',function(){
    if(this.innerHTML === 'START'){
    start = new Date();

    timer_id = setInterval(goTimer, 10);

    //STOPボタン
    this.innerHTML = 'STOP';
    this.classList.remove('bl');
    this.classList.add('red');
    } else {
      clearInterval(timer_id);
      //STARTボタンに戻す
      this.innerHTML = 'START';
      this.classList.remove('red');
      this.classList.add('bl');
    }


  });

  let addZero = function(value){
    if(value < 10){
      value = '0' + value;//0秒〜９秒までは0+秒表示
    }
    return value;
  }

  let goTimer = function(){
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

    document.getElementById('timer').innerHTML = hours + ':' + minutes + ':' + seconds;

  }

  const bmbutton = document.getElementById('bmi_btn');
  bmbutton.addEventListener('click',function(){
      const height = document.getElementById('height').value;
      const weight = document.getElementById('weight').value;
    
      const BMI_value = ( parseFloat(weight) / ( (parseFloat(height) / 100) * (parseFloat(height) / 100)));
      const result = document.getElementById('bm_value');
      const BMI = Math.ceil(BMI_value * 10) / 10;
      result.innerHTML = BMI;
  });

  const calbutton = document.getElementById('cal_btn');
  calbutton.addEventListener('click', function(){
      const carbo = document.getElementById('carbo').value * 4;
      const protein = document.getElementById('protein').value * 4;
      const fat = document.getElementById('fat').value * 9; 
      const cal = parseFloat(carbo) + parseFloat(protein) + parseFloat(fat);
      const result_cal = document.getElementById('cal_value');

      result_cal.innerHTML = cal + 'kcal';

  });







/*   let addZero = function(value){
    if(value < 10){
      value = '0' + value;//0秒〜９秒までは0+秒表示
    }

    return value;

  }

  document.getElementById('start').addEventListener('click',function(){
    let today = new Date();
    let seconds = today.getSeconds();//現在の秒を取得
    seconds = addZero(seconds);
  
  
    let minutes = today.getMinutes();//分を取得
    minutes = addZero(minutes);
  
    let hours = today.getHours();
    hours = addZero(hours);
  
    document.getElementById('timer').innerHTML = 
    hours + ':' + minutes + ':' + seconds;

  });

 */
 


 

//取得した要素をなくせる
  //document.getElementById('timer').remove();


 