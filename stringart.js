function setup() {
  createCanvas(windowWidth, windowHeight);
  size = 20;
  degree = 0;

  //원의 반지름
  let rr = createP('원의 지름 :');
  rr.position(100, 50);
  InputR = createInput('300');
  InputR.position(200, 70);

  //점의 개수 입력
  let w = createP('점의 개수 :');
  w.position(100, 80);
  InputNumber = createInput('36');
  InputNumber.position(200, 100);

  //y=ax+b 입력
  let s = createP('y=ax+b');
  s.position(100, 130);
  let sa = createP('a :');
  sa.position(170, 110);
  let sb = createP('b :');
  sb.position(170, 140);
  InputA = createInput('2');
  InputA.position(200, 130);
  InputB = createInput('0');
  InputB.position(200, 160);

  //체크박스
  checkbox = createCheckbox('숫자표시');
  checkbox.position(200, 190);
}

function degreeToRad(degree) {
  return -(degree * Math.PI) / 180;
}

function draw() {
  background(255, 255, 255);
  translate(width / 2, height / 2);

  let radi = 150; //원의 반지름
  let r = InputR.value();  
  radi = r/2;                     //원의 반지름
  let n = InputNumber.value();    // 점의 개수
  let m = 360 / n;                // 점 사이 간격 각도
  let a = InputA.value();         // y=ax+b에서 a
  let b = InputB.value();         // y=ax+b에서 b

  let startx = 0; //시작점점
  let starty = 0;
  let endx = 0; //끝점점
  let endy = 0;
  let count = 0;
  
  strokeWeight(1);
  circle(0, 0, radi * 2);

  stroke('blue');
  strokeWeight(8);
  point(radi, 0); //시작점
  stroke('white');

 

  //숫자표시 체크박스
  for (let i = 0; i < 360; i += m) {
    if (checkbox.checked()) {
      if (n < 100) {
        textSize(8);
        stroke('black');
        strokeWeight(1);
        j = Math.floor(i / m + 1);
        text(
          j,
          (radi + 12) * Math.cos(degreeToRad(m * count)) - 7,
          (radi + 12) * Math.sin(degreeToRad(m * count)) + 3
        );
      }
    }

    stroke('blue');
    strokeWeight(3);
    point(radi * Math.cos(degreeToRad(i)), radi * Math.sin(degreeToRad(i)));
    stroke('red');
    strokeWeight(1);
    startx = radi * Math.cos(degreeToRad(m * count));
    starty = radi * Math.sin(degreeToRad(m * count));
    endx = radi * Math.cos(degreeToRad(m * (a * count + 1) + m * b));
    endy = radi * Math.sin(degreeToRad(m * (a * count + 1) + m * b));

    line(startx, starty, endx, endy); //선 긋기
    count++;
  }

  stroke('black');
  strokeWeight(5);
}
