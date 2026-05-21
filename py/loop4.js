let codeLines = [];
let code_x;
let hoveredLine = -1;
let start_x = 80;
let exe_ln = -1;
let exe_lines = [];
let exe_tg = 0;
let x, a;
let block_if = false;
let finish_cnt;
let correct = 0;
let error = 0;
let ans = "";
// let user_input = "";
let user_input = [];
let info_timer = 0;
let info = "";
let click = false;

function showInfo() {
  push();
  // 正確資訊
  textSize(50);
  if (info.includes("錯")) {
    fill(200, 0, 0);
  } else {
    fill(255, 255, 0);
  }

  if (frameCount - info_timer < 100) text(info, 70, 500);
  pop();
}
function numBtn(num, rx, ry, rs) {
  push();
  let re;
  if (mouseX >= rx && mouseX <= rx + rs && mouseY >= ry && mouseY <= ry + rs) {
    stroke(180, 180, 0);
    if (click) {
      re = true;
      click = false;
    }
    fill(80, 30, 80);
  } else {
    re = false;

    if (user_input.indexOf(''+num) != -1) {
      fill(80, 80, 0);
    } else {
      stroke(80);
      noFill();
    }
  }

  rect(rx, ry, rs, rs);
  fill(255);
  textSize(20);
  text("" + num, rx + 4, ry + 24);
  pop();
  return re;
}
function iconBtn(sym, rx, ry, rs) {
  let re;
  if (mouseX >= rx && mouseX <= rx + rs && mouseY >= ry && mouseY <= ry + rs) {
    stroke(180, 180, 0);
    if (click) {
      re = true;
      click = false;
    }
  } else {
    re = false;
    stroke(80);
  }
  noFill();
  rect(rx, ry, rs, rs);
  text(sym, rx + 3, ry + 44);
  return re;
}

function restart() {
  setCode();
  exe_ln = -1;
  exe_lines = [];
  exe_tg = 0;
  // user_input = "";
  user_input = [];
  finish_cnt = 50;
}

function jumpEmptyLine(sk) {
  while (exe_ln + sk < codeLines.length && codeLines[exe_ln + sk].length == 0) {
    sk++;
  }
  return sk;
}
function jumpTo(sk, ch) {
  while (
    exe_ln + sk < codeLines.length &&
    codeLines[exe_ln + sk].trim() != ch
  ) {
    sk++;
  }
  return sk;
}
function jumpToNextBr(sk) {
  while (
    exe_ln + sk < codeLines.length &&
    codeLines[exe_ln + sk].indexOf("}") != 0
  ) {
    sk++;
  }
  return sk;
}

function rN(n) {
  return Math.floor(Math.random() * n);
}

function extractIfCondition(code) {
  let start = code.indexOf("(");
  let end = code.indexOf(")");
  if (start !== -1 && end !== -1 && end > start) {
    return code.substring(start + 1, end).trim();
  }
  return null;
}

function check_code(line) {
  //console.log("==>" + line);
  if (line <= exe_ln) {
    return;
  }

  if (line == exe_tg) {
    exe_ln = exe_tg;
    exe_lines.push(exe_ln);
    console.log("ok!!!");
  } else {
    console.log("wrong!!!");
    error++;
  }
}

function exe_code() {
  let code_str = "";
  for (let i = 0; i < codeLines.length; i++) {
    code_str += codeLines[i].replace("let", "");
  }
  console.log(` code ==> \n${code_str}\n`);

  eval(code_str);
  ans = s;

  console.log(` ans ==> ${ans}`);
}

function setCode_function(used, argsn) {
  var fnames = ["job", "work", "process", "task", "todo", "go", "run"];
  codeLines.push(``);
  let name = random(fnames);

  while (used.includes(name)) {
    name = random(fnames);
  }
  let args = rN(4);

  let argsStr = "";
  let argsNums = "";
  let alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < args; i++) {
    if (i > 0) {
      argsStr = argsStr + " , ";
      argsNums = argsNums + " , ";
    }
    argsStr += alphabet[i];
    argsNums += rN(5) + 1;
  }
  argsn.push(argsNums);
  codeLines.push(`function ${name}( ${argsStr} ){`);
  used.push(name);
  for (let i = 0; i < args; i++) {
    codeLines.push(
      `    ${alphabet[i]} = ${alphabet[i]} ${random(["+", "-", "*", "%"])} ${
        rN(7) + 1
      }    ;`
    );
  }
  if (args > 0) {
    codeLines.push(`    return ${alphabet[rN(args)]} ;`);
  } else {
    codeLines.push(`    return ${rN(10)} ;`);
  }

  codeLines.push(`}`);
}

function setCode() {
  codeLines = [];
  codeLines.push(`let s = [] ;`);
  codeLines.push(``);
  let s = rN(10);
  codeLines.push(`for( let i=${s} ; i<${rN(20) + s + 6} ; i=i+${1 + rN(5)} ){`);
  codeLines.push(`    s.push(i) ;`);
  codeLines.push(`}`);
  codeLines.push(``);
  s = 30 + rN(10);
  codeLines.push(
    `for( let i=${s} ; i>${s - 10 - rN(5)} ; i=i-${1 + rN(5)} ){`
  );
  codeLines.push(`    s.push(i) ;`);
  codeLines.push(`}`);
  codeLines.push(``);

  //   let nameList = [];
  //   let args = [];
  //   setCode_function(nameList, args);

  //   setCode_function(nameList, args);

  //   setCode_function(nameList, args);
  //   codeLines.push(``);

  //   let target = rN(nameList.length);
  //   codeLines.push(`let ans = ${nameList[target]}( ${args[target]} ) ;`);
  codeLines.push(``);
  codeLines.push(`// 輸入答案 ======================`);
  codeLines.push(`// s => `);
}

function setup() {
  createCanvas(650, 800);
  textFont("monospace");
  textSize(16);
  restart();
  exe_code();
}

function draw() {
  background(30);
  fill(0);
  rect((width * 2) / 3, 0, width / 3, height);

  hoveredLine = -1;
  let last_y = 0;
  for (let i = 0; i < codeLines.length; i++) {
    let y = 30 + i * 24;
    last_y = y;
    // 檢查滑鼠是否在該行，並且有 code
    if (
      exe_lines.includes(i) ||
      (mouseY > y - 16 && mouseY < y && codeLines[i].length > 0)
    ) {
      hoveredLine = i;
    }

    // 背景色
    if (i === hoveredLine && mouseX < (width * 2) / 3) {
      fill(50, 50, 100); // 深藍背景
      noStroke();
      rect(0, y - 16, (width * 2) / 3, 20);
    }

    // 行號
    fill(hoveredLine === i ? 180 : 100);
    textAlign(RIGHT);
    text(i, start_x, y);

    // 程式碼文字
    if (hoveredLine === i) {
      fill(100, 200, 255);
    } else {
      fill(200);
    }

    // 程式碼文字：syntax highlight
    drawHighlightedLine(codeLines[i], start_x + 20, y);

    // 分數
    push();
    textSize(28);
    fill(0, 255, 0);
    text(`correct : ${correct}`, 450, 30);
    fill(255, 0, 0);
    text(`  error : ${error}`, 450, 60);
    pop();
  }

  push();
  // 輸入答案
  let us = 0;
  let ue = 10;
  let tline = 0;
  let uii = 0;
  let spos = start_x + 85;
  while (true) {
    if (user_input[uii] != null && user_input[uii].length > 0) {
      text(user_input[uii] + ",", spos, last_y + tline * 25);
      spos += textWidth(user_input[uii] + ",");
    }

    uii++;
    if (uii >= user_input.length) {
      break;
    } else if (uii % 5 == 0) {
      tline++;
      spos = start_x + 85;
    }

    // if( user_input.length>=ue){
    //   text(user_input.substring(us,ue), start_x + 85, last_y+tline*30);
    //   tline++;
    //   us+=10;
    //   ue+=10;
    // }else{
    //   ue = user_input.length;
    //   text(user_input.substring(us,ue), start_x + 85, last_y+tline*30);
    //   break;
    // }
  }
  //console.log(user_input+" "+user_input.length);

  let nx = 455;
  let ny = 105;
  let ns = 30;
  for (let i = 0; i < 50; i++) {
    if (numBtn(i, nx, ny, ns)) {
      user_input.push("" + i);
    }
    nx += 35;
    if (nx > 600) {
      nx = 455;
      ny += 35;
    }
  }

  // 選擇符號 =>
  textSize(40);
  let rx = 455;
  let ry = 480;
  let rs = 60;

  if (iconBtn("❌", rx, ry, rs)) {
    user_input = [];
  }
  if (iconBtn("✅", rx + 80, ry, rs)) {
    check_ans();
  }
  pop();

  showInfo();
}
function drawHighlightedLine(line, x, y) {
  line = line.replace('let ','')
    .replace(';','')
    .replace('for( i=','for i in range( ')
    .replace('  i<',',')
  .replace('  i>',',')
    .replace(' ; i=i+',',')
  .replace(' ; i=i',',')
    .replace('{',' :')
    .replace('}','#')
    .replace('push','append')
  let tokens = line.split(/(\s+|\b)/); // 斷詞，保留空格和界線
  //console.log( tokens) ;
  let cursorX = x;
  for (let token of tokens) {
    let c = getTokenColor(token);
    fill(c);
    textAlign(LEFT);
    text(token, cursorX, y);
    cursorX += textWidth(token);
  }
}

function getTokenColor(token) {
  const keywords = [
    "function",
    "let",
    "var",
    "const",
    "return",
    "if",
    "else",
    "for","in",
    "while","range","append"
  ];
  if (keywords.includes(token)) return color(255, 120, 80); // 橘紅色 - 關鍵字
  if (!isNaN(Number(token))) return color(80, 200, 120); // 數字 - 綠色
  if (token.match(/[\(\)\{\};,]/)) return color(200); // 符號 - 灰色
  if (token.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) return color(255, 255, 180); // 變數名 - 淡黃
  return color(160); // 其他（空格等）
}

function check_ans() {
  let pass = true;
  if (user_input.length != ans.length) {
    pass = false;
  }
  for (let i = 0; i < ans.length; i++) {
    if (ans[i] != user_input[i]) {
      pass = false;
      break;
    }
  }
  if (pass) {
    correct++;
    info = "正確!! 下一題...";
    info_timer = frameCount;
    restart();
    exe_code();
  } else {
    info = "錯誤!!";
    info_timer = frameCount;
    error++;
  }
}

function mouseClicked() {
  click = true;
}
