var rs = [17, 19, 23, 7, 11, 31, 43, 47, 53];
var blockSize = 0;
const R = 0;
const D = 1;
const L = 2;
const U = 3;

// player position
var px = 0;
var py = 3;

var matrix = [];
var targetSet = [];
var targetStatus = [];

var G_SEED = 1;
var G_TD = R;
var G_TIMER = 0;
var GAME_SCORE = 0;

function setup() {
       var cnv = createCanvas(630, 630);
       cnv.parent('my_canvas');

       frameRate(1);
       reload_maze();

}


function draw() {
       drawMap();

       //posType => R:road , S:String , D:integer
       let posType = getType();
       let posNumber = -1;
       let posMarker = "";
       if (posType == 'D') {
              posNumber = parseInt(matrix[px][py]);
              go(posMarker, posNumber);
       } 
       if (posType == 'S'){
              posMarker = matrix[px][py];
              go(posMarker, posNumber);
       }

       

       // log info
       let tag2 = matrix[px][py];
       while (tag2.length < 5) {
              tag2 += " ";
       }
       while (posMarker.length < 5) {
              posMarker += " ";
       }
       //console.log("[" + px + "," + py + "] " + tag2 + "       markerTag->" + posMarker + "   markerNumber->" + posNumber);


       movePlayer();

       G_TIMER--;

}

function reload_maze() {

       matrix = [];
       targetSet = [];
       targetStatus = [];

       G_SEED = Math.floor(17 * Math.random());


       setTarget();
       setScore();

       blockSize = width / 7;
       var nAndSeed = [0, G_SEED * 17];
       for (let x = 0; x < 7; x++) {
              for (let y = 0; y < 7; y++) {

                     if (y == 0) {
                            matrix[x] = [];
                     }

                     if (x % 2 == 1) {
                            setRoadAndMarker(x, y, nAndSeed);
                     } else if (y % 2 == 1) {
                            setRoadAndMarker(x, y, nAndSeed);
                     } else {
                            matrix[x][y] = null;
                     }
              }
       }
}


function go(t, n) {

       // goUp();
       // goDown();
       // goLeft();
       // goRight

       if (t == "") {
              goUp();
       }
       if (n == 1) {
              goRight();
       }
}


function getType() {

       if (matrix[px][py] == 'road') {
              return "R";
       } else if (matrix[px][py].length == 1) {
              return "S";
       } else {
              return "D";
       }
}

function drawMap() {

       strokeWeight(1);
       background(0);
       drawMaze();
       strokeWeight(3);
       drawFlag();
       setPlayer();

       checkTouchFlag();
}

function checkTouchFlag() {
       for (let i = 0; i < targetSet.length; i++) {
              let x = targetSet[i][0];
              let y = targetSet[i][1];
              if (px == x && py == y) {
                     targetStatus[i] = true;
                     break;
              }
       }
       if (targetStatus[0] && targetStatus[1]) {
              if (G_TIMER < 0) {
                     GAME_SCORE++;

                     // reset
                     G_TIMER = 3;
                     console.log("恭喜過關！ 獲得獎章一枚");

              } else if (G_TIMER == 0) {
                     reload_maze();
              }
       }
}


function drawMaze() {

       for (let y = 0; y < 7; y++) {
              for (let x = 0; x < 7; x++) {
                     if (matrix[x][y] != null) {
                            fill(200);
                            rect(x * blockSize, y * blockSize, blockSize, blockSize);
                            if (matrix[x][y] != "road") {
                                   if (matrix[x][y].length == 2) {
                                          fill(0, 100, 0);
                                   } else {
                                          fill(175, 70, 5);
                                   }
                                   textSize(36);
                                   text(matrix[x][y], x * blockSize + blockSize / 4, y * blockSize + blockSize / 1.5);
                            }
                     }
              }
       }
}

function setRoadAndMarker(x, y, nAndSeed) {
       // set road
       matrix[x][y] = "road";
       // set marker
       if (x % 2 == 1 && y % 2 == 1) {
              if (nAndSeed[0] % 2 == 0) {
                     // 2 digits number
                     let n = (nAndSeed[1] * x + y) % 100;
                     if (n < 10) {
                            n = n * 10;
                     }
                     matrix[x][y] = "" + n;
              } else {
                     // A~Z
                     let t = String.fromCharCode((nAndSeed[1] % 26) + 'A'.charCodeAt(0));
                     matrix[x][y] = "" + t;
              }
              nAndSeed[1] += rs[nAndSeed[0]];
              nAndSeed[0]++;
       }
}

function setPlayer() {
       let x = px * blockSize + blockSize / 2;
       let y = py * blockSize + blockSize / 2;
       fill(255, 255, 0, 200);
       ellipse(x, y, blockSize * 0.6, blockSize * 0.6);
       switch (G_TD) {
              case 'R':
                     line(x, y, x + blockSize * 0.3, y);
                     break;
              case 'D':
                     line(x, y, x, y + blockSize * 0.3);
                     break;
              case 'L':
                     line(x, y, x - blockSize * 0.3, y);
                     break;
              case 'U':
                     line(x, y, x, y - blockSize * 0.3);
                     break;
       }
}

function setTarget() {

       let tx;
       let ty;

       for (let k = 0; k < 2; k++) {
              let s1 = (G_SEED + k * 3) % 7;
              if (s1 % 2 == 0) {
                     tx = s1;
                     ty = (s1 + 3) > 6 ? (s1 + 3 - 7 + 1) : (s1 + 3);
              } else {
                     tx = s1;
                     ty = (s1 + 3) > 6 ? (s1 + 3 - 7 + 1) : (s1 + 3);
              }
              targetSet[k] = [tx, ty];
       }
}

function drawFlag() {

       for (let i = 0; i < targetSet.length; i++) {
              let x = targetSet[i][0] * blockSize + blockSize / 2 - 15;
              let y = targetSet[i][1] * blockSize + blockSize / 2;
              let topY = y - blockSize / 3;
              if (targetStatus[i]) {
                     fill(0, 255, 0);
              } else {
                     fill(255, 0, 0);
              }

              triangle(x, y, x + blockSize / 3, y, x, topY);
              line(x, topY, x, y + blockSize / 3);
       }
}


function goUp() {
       G_TD = U;
}

function goDown() {
       G_TD = D;
}

function goLeft() {
       G_TD = L;
}

function goRight() {
       G_TD = R;
}

function movePlayer() {
       switch (G_TD) {
              case R:
                     px++;
                     break;
              case D:
                     py++;
                     break;
              case L:
                     px--;
                     break;
              case U:
                     py--;
                     break;
       }

       if (px == 7) {
              px = 0;
       }
       if (py == 7) {
              py = 0;
       }
       if (px == -1) {
              px = 6;
       }
       if (py == -1) {
              py = 6;
       }
}


function setScore() {
       let box = '🧰';
       let medal = '🏅';


       let result = '';
       for (let i = 0; i < 10; i++) {
              if (i < GAME_SCORE) {
                     result += medal;
              } else {
                     result += box;
              }
       }

       document.getElementById('score').textContent = result;
}
