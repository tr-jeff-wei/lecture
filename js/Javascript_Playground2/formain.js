var floorArray = [];
var startChange = 0;
var changeSpeed = 8;


var py = [];
var px = [];
var pxTarget = [];
var pface = [];
var pAction = null;
var pActionItem = [];
var pTree = [];
var pApple = [];


var pStatus = 0;
var pIndex = 1;
function setup() {
    createCanvas(600, 800);
    rectMode(CENTER);
    let idn = floor(random(0, 80));
    for (let h = 10; h < height; h += 50) {
        floorArray.push(new Floor(idn, h));
        idn++;
        //console.log(idn);
    }
    pxTarget[0] = width / 2 - 100;
    pxTarget[1] = width / 2 + 100;

    px[0] = pxTarget[0];
    px[1] = pxTarget[1];

    py[0] = height / 2;
    py[1] = height / 2;

    pface[0] = '🤠';
    pface[1] = '😎';

    pApple[0] = 0;
    pApple[1] = 0;
    pTree[0] = 0;
    pTree[1] = 0;
}

function draw() {
    background(100);

    ladder();

    for (var item of floorArray) {
        item.show();
    }


    if (pAction == null && pActionItem.length > 0) {
        pAction = pActionItem.splice(0, 1)[0];
    }
    if (pAction != null) {
        pAction.move();
    }
    drawPlayer(0);
    drawPlayer(1);


    changePos();

}


function drawPlayer(p12) {

    textSize(30);
    text(pface[p12], px[p12] - 20, py[p12]);
    let dx;
    if (p12 == 0) {
        dx = -100;
    } else {
        dx = 50;
    }

    textSize(16);
    for (let i = 0; i < pTree[p12]; i++) {
        text("🌵", px[p12] + dx + 25, py[p12] - i * 20);
    }
    for (let i = 0; i < pApple[p12]; i++) {
        text("🍎", px[p12] + dx, py[p12] - i * 20);
    }

}

function ladder() {

    for (let h = 0; h < height + 20; h += 10) {
        noFill();
        stroke(20);
        rect(pxTarget[0], h, 30, 10);
        rect(pxTarget[1], h, 30, 10);
    }
}

function changePos() {
    if (startChange > 0) {
        if (startChange % 50 == 0 && changeSpeed >= 3) {
            changeSpeed--;
        }

        for (var item of floorArray) {
            item.move(changeSpeed);
        }
        startChange--;
    }
}

function goChangePos() {
    startChange = 500;
    changeSpeed = 8;
    let idn = floor(random(0, 80));
    for (var item of floorArray) {
        item.reset(idn++);
    }
}

function goTo(player, targetNumber) {

    let targetIndex = -1;
    for (let i = 0; i < floorArray.length; i++) {
        if (floorArray[i].idNum == targetNumber) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex != -1) {
        if (player == 'p1') {
            pActionItem.push(new MoveAction(targetIndex, 0));
        } else if (player == 'p2') {
            pActionItem.push(new MoveAction(targetIndex, 1));
        }
    }
}

function example() {

    let text = ' // p1(left) eat : 5 , 6 , 7 , 8\n\n' + ' for(var i=5 ; i<=8 ; i++){\n' +
        "       goTo( 'p1' , i ); \n" +
        " } ";
    console.log(text);
}


class Floor {
    constructor(newId, y) {
        this.idNum = newId;
        this.py = y;
        this.reset(newId);
    }

    show() {
        stroke(0);
        fill(150);
        let px = width / 2;
        rect(px, this.py + 15, 54, 50);
        fill(10);
        rect(px, this.py, 30, 20);
        let s = "";
        if (this.apple > 0) {
            for (let i = 0; i < this.apple; i++) {
                s += "🍎";
            }

        } else if (this.tree > 0) {
            for (let i = 0; i < this.tree; i++) {
                s += "🌵";
            }
        }
        // fruit
        textSize(10);
        text(s, px - 22, this.py + 32);

        // id
        //console.log('--'+this.id);
        noStroke();
        fill(255);
        textSize(16);
        text('' + this.idNum, px - 7, this.py + 5);
    }

    move(speed) {
        this.py -= speed;
        if (this.py < 0) {
            this.py += height;
        }
    }

    reset(newId) {
        this.idNum = newId;
        if (Math.random() > 0.4) {
            this.apple = floor(random(1, 3));
            this.tree = 0;
        } else {
            this.apple = 0;
            this.tree = floor(random(1, 3));
        }

    }

}

class MoveAction {
    constructor(ti, player) {
        this.targetIdx = ti;
        this.ty = floorArray[ti].py + 30;
        this.pi = player;
        this.moveStatus = -1;
    }

    move() {
        switch (this.moveStatus) {
            case -1:
                this.step = (this.ty - py[this.pi]) / 30;
                this.moveStatus++;
                break;
            case 0:
                py[this.pi] += this.step;
                if (abs(this.ty - py[this.pi]) < 1) {
                    py[this.pi] = this.ty;
                    this.moveStatus++;
                }
                break;
            case 1:
                // 移動到中間
                if (px[this.pi] < width / 2) {
                    px[this.pi]++;
                    if (px[this.pi] == width / 2) {
                        this.moveStatus++;
                    }
                } else if (px[this.pi] > width / 2) {
                    px[this.pi]--;
                    if (px[this.pi] == width / 2) {
                        this.moveStatus++;
                    }
                }
                break;
            case 2:

                // eat fruit
                // console.log('[eat fruit] before => apple:'+ pApple[this.pi]);
                // console.log('[eat fruit] before => tree :'+ pTree[this.pi]);

                pApple[this.pi] += floorArray[this.targetIdx].apple;
                pTree[this.pi] += floorArray[this.targetIdx].tree;
                floorArray[this.targetIdx].apple = 0;
                floorArray[this.targetIdx].tree = 0;
                this.moveStatus++ ;

                // console.log('[eat fruit] after => apple:'+ pApple[this.pi]);
                // console.log('[eat fruit] after => tree :'+ pTree[this.pi]);
                // console.log('=====');
                // console.log('=====');
                // console.log('=====');
                break ;

            case 3:
                // 移動回原處
                if (px[this.pi] > pxTarget[this.pi]) {
                    px[this.pi]--;
                    if (px[this.pi] == pxTarget[this.pi]) {
                        this.moveStatus++;
                    }
                } else if (px[this.pi] < pxTarget[this.pi]) {
                    px[this.pi]++;
                    if (px[this.pi] == pxTarget[this.pi]) {
                        this.moveStatus++;
                    }
                }
                break;
            case 4:
                pApple[this.pi] -= pTree[this.pi];
                pTree[this.pi] = 0;
                if (pApple[this.pi] < 0) {
                    pApple[this.pi] = 0
                }

                // win
                if( pApple[this.pi] >=20 ){
                    textSize(30);
                    if( this.pi == 0 ){
                        text('🎉 WINNER 🎉', px[this.pi]-200, py[this.pi]+70);
                    }else{
                        text('🎉 WINNER 🎉', px[this.pi]-50, py[this.pi]+70);
                    }
                    
                    return;
                }

                // done ;
                pAction = null;
                if (pActionItem.length == 0) {
                    goChangePos();
                }
                return;
        }

    }
}