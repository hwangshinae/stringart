function setup() {
  createCanvas(windowWidth, windowHeight);
  size = 20;
  degree = 0;

  let p = createP('시작점');
  p.position(1030, 360);

  //점의 개수 입력
  let w = createP('점의 개수 :');
  w.position(100, 80);
  InputNumber = createInput('72');
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
}

function degreeToRad(degree) {
  return -(degree * Math.PI) / 180;
}

function draw() {
  background(255, 255, 255);
  translate(width / 2, height / 2);

  let radi = 250; //원의 반지름
  circle(0, 0, radi * 2);

  stroke('blue');
  strokeWeight(15);
  point(radi, 0); //시작점

  //원 위에 점찍기기
  stroke('red');
  strokeWeight(2);

  let n = InputNumber.value(); // 점의 개수
  let m = 360 / n; // 점 사이 간격 각도
  let a = InputA.value(); // y=ax+b에서 a
  let b = InputB.value(); // y=ax+b에서 b

  let startx = 0; //시작점점
  let starty = 0;
  let endx = 0; //끝점점
  let endy = 0;
  let count = 0;

  for (let i = 0; i < 400; i += m) {
    point(radi * Math.cos(degreeToRad(i)), radi * Math.sin(degreeToRad(i)));

    startx = radi * Math.cos(degreeToRad(m * count));
    starty = radi * Math.sin(degreeToRad(m * count));
    endx = radi * Math.cos(degreeToRad(m * (a * count + 1) + m * b));
    endy = radi * Math.sin(degreeToRad(m * (a * count + 1) + m * b));

    line(startx, starty, endx, endy); //선 긋기기
    count++;
  }

  stroke('black');
  strokeWeight(5);
}
