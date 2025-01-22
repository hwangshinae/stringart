function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  translate(width / 2, height / 2);
  size = 20;
  degree = 0;

  //원의 반지름
  let rr = createP('원의 지름 :');
  rr.position(50, 600);
  InputR = createInput('300');
  InputR.position(130, 610);
  InputR.size(50);

  //점의 개수 입력
  let w = createP('점의 개수 :');
  w.position(50, 630);
  InputNumber = createInput('36');
  InputNumber.position(130, 640);
  InputNumber.size(50);

  //y=ax+b 입력
  let s = createP('y=ax+b');
  s.position(40, 670);
  let sa = createP('a :');
  sa.position(98, 660);
  let sb = createP('b :');
  sb.position(98, 690);
  InputA = createInput('2');
  InputA.position(130, 670);
  InputA.size(50);
  InputB = createInput('0');
  InputB.position(130, 700);
  InputB.size(50);
  let t = createP('천천히 그리기');
  t.position(width / 2 - 20, height / 2 + 50);

  //체크박스
  checkbox = createCheckbox('숫자표시');
  checkbox.position(width / 2 - 80, 540);

  checkboxLine = createCheckbox('한 번에 그리기');
  checkboxLine.position(width / 2 + 30, 540);

  //슬라이드
  lineSlider = createSlider(0, 360, 0, 10);
  lineSlider.position(windowWidth / 2 - 90, windowHeight / 2 + 40);
  lineSlider.size(220);
}

function degreeToRad(degree) {
  return -(degree * Math.PI) / 180;
}

function draw() {
  background(255, 255, 255);
  translate(width / 2, height / 2);

  radi = 150; //원의 반지름
  r = InputR.value();
  radi = r / 2; //원의 반지름 값 받아오기기
  n = InputNumber.value(); // 점의 개수
  m = 360 / n; // 점 사이 간격 각도
  let a = InputA.value(); // y=ax+b에서 a
  let b = InputB.value(); // y=ax+b에서 b

  let startx = 0; //시작점
  let starty = 0;
  let endx = 0; //끝점
  let endy = 0;
  let count = 0;

  strokeWeight(1);
  circle(0, -200, radi * 2); //원 그리기

  //y=ax+b 값 원 위에 식 보이기
  textSize(25);
  text('y = ', -30, -390);
  if (a != 1) {
    text(a, 10, -390);
  }
  text('x ', 25, -390);
  if (b != 0) {
    text('+ ', 35, -390);
    text(b, 50, -390);
  }

  stroke('blue');
  strokeWeight(8);
  point(radi, -200); //시작점

  for (let p = 0; p < 360; p += m) {
    stroke('blue');
    strokeWeight(3);
    point(
      radi * Math.cos(degreeToRad(p)),
      radi * Math.sin(degreeToRad(p)) - 200
    );
  }

  //숫자표시 체크박스
  for (let k = 0; k < 360; k += m) {
    if (checkbox.checked()) {
      if (n < 111) {
        textSize(8);
        stroke('black');
        strokeWeight(1);
        j = Math.floor(k / m + 1);
        text(
          j,
          (radi + 12) * Math.cos(degreeToRad(m * count)) - 7,
          (radi + 12) * Math.sin(degreeToRad(m * count)) + 3 - 200
        );
      }
    }
    count++;
  }

  //선 그리기
  for (let i = 0; i < 360; i += m) {
    //스크롤바
    if (lineSlider.value() >= i + m) {
      stroke('red');
      strokeWeight(1);
      startx = radi * Math.cos(degreeToRad(m * count));
      starty = radi * Math.sin(degreeToRad(m * count));
      endx =
        radi * Math.cos(degreeToRad(m * (a * count + 1) + m * b + m * (a - 2)));
      endy =
        radi * Math.sin(degreeToRad(m * (a * count + 1) + m * b + m * (a - 2)));

      if (int(a) == a) {
        line(startx, starty - 200, endx, endy - 200); //정수일때
      } else if (int(a) != a) {
        line(startx, starty - 200, -endx, -endy - 200); //정수가 아닌 소수일때
      }
      count++;
    }
    //한 번에 그리기
    else if (checkboxLine.checked()) {
      stroke('red');
      strokeWeight(1);
      startx = radi * Math.cos(degreeToRad(m * count));
      starty = radi * Math.sin(degreeToRad(m * count));
      endx =
        radi * Math.cos(degreeToRad(m * (a * count + 1) + m * b + m * (a - 2)));
      endy =
        radi * Math.sin(degreeToRad(m * (a * count + 1) + m * b + m * (a - 2)));

      if (int(a) == a) {
        line(startx, starty - 200, endx, endy - 200); //정수일때
      } else if (int(a) != a) {
        line(startx, starty - 200, -endx, -endy - 200); //정수가 아닌 소수일때
      }
      count++;
    }
  }
  stroke('black');
  strokeWeight(5);
}
