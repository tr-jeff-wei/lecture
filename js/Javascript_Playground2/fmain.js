
const STEP = 20;

var p = [];
var pHp = [];
var pDp = [];
var pImg = [];
var pSize = [];
var leafImg;
var leafNum = 5;
var leafLoc = [];
var fTarget = '';
var fAction = [];
var fPara = [];
var fPara2 = [];
var fParam = [];
var fActionIdx = 0;

function setup() {

    createCanvas(500, 500);

    p[0] = createVector(50, 50);
    p[1] = createVector(450, 450);
    pHp[0] = 100;
    pHp[1] = 100;
    pDp[0] = 0;
    pDp[1] = 0;
    pImg[0] = loadImage("p1.png");
    pImg[1] = loadImage("p2.png");
    pSize[0] = 70;
    pSize[1] = 70;

    leafImg = loadImage("leaf.png");
    for (let index = 0; index < leafNum; index++) {
        leafLoc[index] = createVector(width * (index + 1) / (leafNum + 1), random(50, 350));
    }

    frameRate(2);
    noStroke();
}

function draw() {
    background(50);
    imageMode(CENTER);
    for (var i = 0; i < p.length; i++) {
        image(pImg[i], p[i].x, p[i].y, pSize[i], pSize[i]);

        if (pHp[i] > 0) {
            fill(255);
            text(pHp[i], p[i].x + 20, p[i].y - 30);
        } else {
            fill(255, 0, 0);
            text('-', p[i].x + 20, p[i].y - 30);
            fill(50, 50, 50, 200);
            circle(p[i].x, p[i].y, pSize[i]);
        }

        if (pDp[i] > 0) {
            fill(0, 255, 0);
            text(pDp[i], p[i].x + 20, p[i].y - 20);
        }
    }

    for (let index = 0; index < leafNum; index++) {
        if (leafLoc[index] != null) {
            image(leafImg, leafLoc[index].x, leafLoc[index].y, 20, 20);
        }
    }
    run();
}

function setPlayer(p) {
    fTarget = p;
}

function defense(n) {
    let pi = getTargetPlayer();

    if (n > 10) {
        n = 10;
    }
    pHp[pi] -= n;
    pDp[pi] += n;
}

// direction : 'U' , 'D' , 'L' , 'R'
// steps <= 5
function move(direction, steps) {
    if (steps > 5) {
        return;
    }
    switch (direction) {
        case 'U':
        case 'D':
        case 'L':
        case 'R':
            fAction.push('M' + direction);
            fPara.push(steps);
            fPara2.push(0);
            break;
        default:
            console.log("direction : 'U' , 'D' , 'L' , 'R'");
            console.log(" steps <= 5 ");
    }
}

function fire(direction, power) {
    if (power > 10) {
        return;
    }

    var myIdx = getTargetPlayer();
    pHp[myIdx] -= floor(power / 3);

    switch (direction) {
        case 'U':
        case 'D':
        case 'L':
        case 'R':
            fAction.push('F' + direction);
            fPara.push(power);
            fPara2.push(power);
            break;
        default:
            console.log("direction : 'U' , 'D' , 'L' , 'R'");
            console.log(" power <= 5 ");
    }
}


function run() {
    var targetPlayer = getTargetPlayer();
    if (targetPlayer == -1) {
        return;
    }
    if (fActionIdx < fAction.length) {
        pGo(targetPlayer);
        pFire(targetPlayer);
    }


}

function getTargetPlayer() {

    if (fTarget == 'p1') {
        return 0;
    } else if (fTarget == 'p2') {
        return 1;
    } else {
        return -1;
    }
}

function pGo(playerIdx) {
    if (fPara[fActionIdx] > 0) {
        switch (fAction[fActionIdx]) {
            case 'MU':
                fPara[fActionIdx]--;
                p[playerIdx].y -= STEP;
                break;
            case 'MD':
                fPara[fActionIdx]--;
                p[playerIdx].y += STEP;
                break;
            case 'ML':
                fPara[fActionIdx]--;
                p[playerIdx].x -= STEP;
                break;
            case 'MR':
                fPara[fActionIdx]--;
                p[playerIdx].x += STEP;
                break;
        }

        // check leaf
        for (let index = 0; index < leafNum; index++) {
            if (leafLoc[index] != null) {
                //image( leafImg , leafLoc[index].x , leafLoc[index].y , 20 , 20 ) ; 
                var d = dist(leafLoc[index].x, leafLoc[index].y
                    , p[playerIdx].x, p[playerIdx].y);
                // hit
                if (d < 10 + pSize[playerIdx] / 2) {
                    leafLoc[index] = null;
                    pHp[playerIdx] += 20;
                }
            }
        }


        if (fPara[fActionIdx] <= 0) {
            fPara[fActionIdx] = 0;
            fActionIdx++;
        }
    }
}

function pFire(playerIdx) {

    var targetIdx = getOther(playerIdx);

    if (fPara[fActionIdx] > 0) {

        switch (fAction[fActionIdx]) {
            case 'FU':
                fPara[fActionIdx]--;
                drawFireBall(targetIdx, p[playerIdx].x, p[playerIdx].y - (STEP * (fPara2[fActionIdx] - fPara[fActionIdx])));
                break;
            case 'FD':
                fPara[fActionIdx]--;
                drawFireBall(targetIdx, p[playerIdx].x, p[playerIdx].y + (STEP * (fPara2[fActionIdx] - fPara[fActionIdx])));
                break;
            case 'FL':
                fPara[fActionIdx]--;
                drawFireBall(targetIdx, p[playerIdx].x - (STEP * (fPara2[fActionIdx] - fPara[fActionIdx])), p[playerIdx].y);
                break;
            case 'FR':
                fPara[fActionIdx]--;
                drawFireBall(targetIdx, p[playerIdx].x + (STEP * (fPara2[fActionIdx] - fPara[fActionIdx])), p[playerIdx].y);
                break;
        }

        if (fPara[fActionIdx] <= 0) {
            fPara[fActionIdx] = 0;
            fActionIdx++;
        }
    }
}

function drawFireBall(target, x, y) {

    if (target == 0) {
        fill(200, 0, 0);
    } else {
        fill(0, 200, 0);
    }


    circle(x, y, 10, 10);

    var d = dist(x, y, p[target].x, p[target].y);

    // hit
    if (d < pSize[target] / 2) {
        if (pDp[target] > 0) {
            pDp[target]--;
        } else {
            pHp[target] -= 10;
            pHp[getOther(target)] += 10;
        }
        if (target == 0) {
            fill(200, 0, 0, 100);
        } else {
            fill(0, 200, 0, 100);
        }

        circle(p[target].x, p[target].y, pSize[target]);
    }
}

function getOther(playerIdx) {
    if (playerIdx == 0) {
        return 1;
    } else {
        return 0;
    }
}


//==========================

function JMove(d){
    move(d , 5 ) ;
    move(d , 5 ) ;
    move(d , 5 ) ;
    move(d , 5 ) ;
    move(d , 5 ) ; 
 }
 function JMove1(){
     move('D',5);
     move('R',5);
     move('D',5);
     move('R',5);
     move('D',5);     
}
function JAttack(){
    fire('U',10);
    fire('U',10);
    fire('D',10);
    fire('D',10);
    fire('L',10);
}