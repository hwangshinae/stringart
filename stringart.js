function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  translate(width / 2, height / 2);
  size = 20;
  degree = 0;
  r = 300;
  radi = 150; //원의 반지름
  n = 36;
  a = 2;
  b = 0;

  //점의 개수 입력
  let w = createP('점의 개수 :');
  w.position(width / 2 - 70, height / 2 + 210);

  //y=ax+b 입력
  let s = createP('y=ax+b');
  s.position(width / 2 - 90, height / 2 + 250);
  let sa = createP('a :');
  sa.position(width / 2 - 20, height / 2 + 240);
  let sb = createP('b :');
  sb.position(width / 2 - 20, height / 2 + 270);
  let t = createP('천천히 그리기');
  t.position(width / 2 - 20, height / 2 + 50);

  //체크박스
  checkbox = createCheckbox('숫자표시');
  checkbox.position(width / 2 - 80, height / 2 + 120);

  checkboxLine = createCheckbox('한 번에 그리기');
  checkboxLine.position(width / 2 + 30, height / 2 + 120);

  //슬라이드
  lineSlider = createSlider(0, 360, 0, 10);
  lineSlider.position(windowWidth / 2 - 90, windowHeight / 2 + 40);
  lineSlider.size(220);

  //점의 개수 버튼
  btnNM = createButton('-');
  btnNM.mousePressed(minusNumberN);
  btnNM.position(width / 2, height / 2 + 220);
  btnNP = createButton('+');
  btnNP.mousePressed(plusNumberN);
  btnNP.position(width / 2 + 95, height / 2 + 220);

  //a의 개수 버튼
  btnAM = createButton('-');
  btnAM.mousePressed(minusNumberA);
  btnAM.position(width / 2, height / 2 + 250);
  btnAP = createButton('+');
  btnAP.mousePressed(plusNumberA);
  btnAP.position(width / 2 + 95, height / 2 + 250);

  //a의 개수 버튼
  btnBM = createButton('-');
  btnBM.mousePressed(minusNumberB);
  btnBM.position(width / 2, height / 2 + 280);
  btnBP = createButton('+');
  btnBP.mousePressed(plusNumberB);
  btnBP.position(width / 2 + 95, height / 2 + 280);
}

function plusNumberB() {
  b++;
}

function minusNumberB() {
  b--;
}

function plusNumberA() {
  a++;
}

function minusNumberA() {
  a--;
}

function plusNumberN() {
  n++;
}

function minusNumberN() {
  if (n > 0) {
    n--;
  }
}

function degreeToRad(degree) {
  return -(degree * Math.PI) / 180;
}

function draw() {
  background(255, 255, 255);
  translate(width / 2, height / 2);

  radi = r / 2; //원의 반지름 값 받아오기기

  let startx = 0; //시작점
  let starty = 0;
  let endx = 0; //끝점
  let endy = 0;
  let count = 0;

  strokeWeight(1);
  circle(0, -200, radi * 2); //원 그리기

  if (btnNM.mouseIsPressed == true) {
    if (n > 0) {
      n--;
    }
  }
  if (btnNP.mouseIsPressed == true) {
    n++;
  }

  if (btnAM.mouseIsPressed == true) {
    a--;
  }
  if (btnAP.mouseIsPressed == true) {
    a++;
  }
  if (btnBM.mouseIsPressed == true) {
    b--;
  }
  if (btnBP.mouseIsPressed == true) {
    b++;
  }

  m = 360 / n; // 점 사이 간격 각도

  //y=ax+b 값 원 위에 식 보이기
  textSize(25);
  text('y =', -50, 0);
  if (a != 1) {
    text(a, -10, 0);
  }

  text('x ', 20, 0);
  if (b != 0) {
    text('+ ', 40, 0);
    text(b, 60, 0);
  }

  textSize(15);
  text(n, 35, 230);
  text(a, 35, 260);
  text(b, 35, 290);

  stroke('blue');
  strokeWeight(8);
  point(radi, -200); //시작점
  //점 찍기기
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
      if (0 <= n < 111) {
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
    //슬라이드
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
  strokeWeight(1);
}
