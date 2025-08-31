

const canvas_w = 800;
var ground_map = [];
var show_hit_ground = false;

// ========================================================================================================================
// ========== map =============
// ========================================================================================================================


const bg1_w = 32;
const block_num = canvas_w / bg1_w;
//=============== add wall
var mouse_add_wall_btn = false;
//=============== wall
const brick_x = 7 * bg1_w;
const brick_y = [];
brick_y[0] = 6 * bg1_w;
brick_y[1] = 7 * bg1_w;
brick_y[2] = 8 * bg1_w;
brick_y[3] = 9 * bg1_w;
//=============== start / end
var img_bg1;
var img_hole;
var img_diamond;
var ground;
var mouse_state = '';

function mouse_block() {
    let mbx = parseInt(mouseX / bg1_w);
    if (mbx >= block_num) {
        mbx = block_num - 1;
    }
    let mby = parseInt(mouseY / bg1_w);
    if (mby >= block_num) {
        mby = block_num - 1;
    }
    //console.log(mbx + " , " + mby + "  " + key);

    switch (mouse_state) {
        case 'b':
            ground[mbx][mby] = 'b' + arr_random_num(brick_y);
            break;
        case 'c':
            ground[mbx][mby] = 'x';
            break;
        case 's':
            ground[mbx][mby] = 's';
            break;
        case 'd':
            ground[mbx][mby] = 'd';
            break;
        default:
            break;
    }

}

function draw_brick(dx, dy, t) {
    //imageMode(CORNERS) ;
    image(img_bg1, dx * bg1_w, dy * bg1_w, bg1_w, bg1_w,
        brick_x, brick_y[t], bg1_w, bg1_w);
}

function draw_hole(dx, dy) {
    //imageMode(CORNERS) ;

    if( hole_x == -1 ){
        hole_x = dx * bg1_w+bg1_w/2 ;
    }
    if( hole_y == -1 ){
        hole_y = dy * bg1_w+bg1_w/2 ;
    }

    image(img_hole, hole_x-bg1_w/2 , hole_y-bg1_w/2 , bg1_w, bg1_w,
        0, 0, bg1_w, bg1_w);

    if (game_full_text && game_timer>0) {
        textSize(14);
        fill(25);
        text('hole', hole_x-bg1_w/2 + 30, hole_y-bg1_w/2);
    }
}

function draw_diamond(dx, dy) {

    if( rock_x == -1 ){
        rock_x = dx * bg1_w+bg1_w/2 ;
    }
    if( rock_y == -1 ){
        rock_y = dy * bg1_w+bg1_w/2 ;
    }

    image(img_diamond, rock_x-bg1_w/2 , rock_y-bg1_w/2, bg1_w, bg1_w,
        0, 0, bg1_w, bg1_w);

    if (game_full_text&& game_timer>0) {
        textSize(14);
        fill(250, 0, 0);
        text('enery rock', rock_x-bg1_w/2 + 30, rock_y-bg1_w/2);
    }

}

function arr_random_num(array) {
    return parseInt(random(0, array.length));
}

function arr_random_item(array) {
    return array[arr_random_num(array)];
}

function keyPressed() {
    mouse_state = key;
}

function export_array() {
    let s = "";
    for (let x = 0; x < block_num; x++) {
        for (let y = 0; y < block_num; y++) {
            s = s + ground[x][y] + ',';
        }
    }
    return s.substring(0, s.length - 1);
    //console.log(s) ;
}

function import_map(s) {
    let arr = s.split(',');
    let ai = 0;
    for (let x = 0; x < block_num; x++) {
        for (let y = 0; y < block_num; y++) {
            ground[x][y] = arr[ai++];
        }
    }

}

// ========================================================================================================================
// ========== map =============
// ========================================================================================================================

var hole_x=-1 , hole_y=-1 ;
var rock_x=-1 , rock_y=-1 ;

var enemy_list = [];
var enemy_list_max_size = 10;
var enemy_random=false ;
var img_virus;
var img_virus2;

var bomb_list = [];
var img_bomb;
var img_bomb2;
var start_point = null;

var game_timer = 0;
var game_map;
var game_is_over = false;
var game_win = false;
var game_full_text = false;
var game_auto_start= false;
var img_over;
var img_winner;


var song_exp;
var song_over;
var song_win;


var bomb_counter = 0;
var bomb_counter_max = 10;




function setup() {


    //=========================================
    // initial player setting
    //========================================= 
    if (Player.map != null) {
        game_map = Player.map;
    } else {
        game_map = 'test';
    }
    if (Player.draw_map != null) {
        mouse_add_wall_btn = Player.draw_map;
    } else {
        mouse_add_wall_btn = false;
    }
    if (Player.game_full_text != null) {
        game_full_text = Player.game_full_text;
    } else {
        game_full_text = false;
    }
    if(Player.auto_start!=null){
        game_auto_start = Player.auto_start ;
    }else{
        game_auto_start = false ;
    }
    if(Player.enemy_random!=null){
        enemy_random = Player.enemy_random ;
    }else{
        enemy_random = false ;
    }
    //========================================= 
    // initial player setting
    //========================================= 


    let cvs = createCanvas(920, 800);
    cvs.parent('game_area');

    // ===================================== map
    reset_ground();
    img_bg1 = loadImage("assets/bg1.png");
    img_hole = loadImage("assets/hole.png");
    img_diamond = loadImage("assets/diamond.png");
    // ===================================== map


    img_virus = loadImage("assets/vs1.png");
    img_virus2 = loadImage("assets/vs2.png");

    img_bomb = loadImage("assets/bomb.png");
    img_bomb2 = loadImage("assets/bomb2.png");
    img_over = loadImage("assets/gover.png");
    img_winner = loadImage("assets/winner.png");

    song_exp = loadSound('assets/exp.wav');
    song_over = loadSound('assets/gameover.wav');
    song_win = loadSound('assets/winner_music.mp3');

    userStartAudio().then(function () {
        console.log('start audio');
    });


    if( !game_auto_start ){
        noLoop();
    }

}


function draw() {

    // background
    background(230);
    // info panel
    draw_info();

    // ===============  map
    draw_map();

    // player action
    if (frameCount % 50 == 0 && game_timer > 0) {
        Player.action();
    }


    // bomb
    bomb_list.forEach(element => {
        element.show();
        if (game_full_text) {
            textSize(14);
            fill(255, 0, 0);
            text('bomb', element.sx + 20, element.sy);
        }
    });

    // enemy_list    
    release_enemy();
    enemy_list.forEach(element => {
        if (element != null) {
            let r = element.move_show();
            if (r == 'hit') {
                game_is_over = true;
            }

            if (game_full_text) {
                textSize(14);
                fill(0, 200, 0);
                text('virus', element.sx + 20, element.sy);
            }
        }
    });

    // check : bomb v.s enemy
    check_enemy_and_bomb();


    // information
    show_mouse_location();

    // win
    if (game_win) {
        imageMode(CENTER);
        image(img_winner, 400, 300);
        imageMode(CORNER);
        fill(252, 186, 3);
        textSize(72);
        let winner = 'WINNER !!';
        let wd = textWidth(winner) / 2;
        text(winner, 400 - wd, 450);
        if (song_win != null) {
            song_win.play();
            song_win = null;
        }
    }

    // game over
    if (game_win == false && game_is_over) {
        imageMode(CENTER);
        image(img_over, 400, 400);
        imageMode(CORNER);
        if (song_over != null) {
            song_over.play();
            song_over = null;
        }
    }



    // debug
    show_ground_map();

}

function draw_info() {

    fill(30);
    rect(800, 0, 120, 800);

    // virus
    let sx = 820, sy = 20;
    enemy_list.forEach(element => {
        if (element == null) {
            image(img_virus2, sx, sy, 32, 32);
        } else {
            image(img_virus, sx, sy, 32, 32);
        }
        sy += 40;
    });

    sx += 50; sy = 20;
    for (let i = 0; i < bomb_counter_max; i++) {
        if (i < bomb_counter) {
            image(img_bomb, sx, sy, 32, 32);
        } else {
            image(img_bomb2, sx, sy, 32, 32);
        }
        sy += 40;
    }

    // timer
    fill(255);
    textSize(12);
    text('game_timer', 820, 680);
    textSize(48);
    let tx = 860 - textWidth(game_timer + '') / 2;
    text(game_timer, tx, 750);
    if (frameCount % 50 == 0 && mouse_add_wall_btn == false) {
        game_timer++;
    }


}

function check_enemy_and_bomb() {
    let newbs = [];

    for (let bi = 0; bi < bomb_list.length; bi++) {
        if (bomb_list[bi].bomb_timer <= Bomb.EXPLODE_DURATION) {
            continue;
        } else {
            newbs.push(bomb_list[bi]);
            if (bomb_list[bi].bomb_timer >= 0) {
                continue;
            }
        }
        for (let ei = 0; ei < enemy_list.length; ei++) {
            if (enemy_list[ei] == null) {
                continue;
            }
            // hit bombs
            let distance = dist(bomb_list[bi].sx, bomb_list[bi].sy, enemy_list[ei].sx, enemy_list[ei].sy);
            if (distance < (bomb_list[bi].r / 2 + 16)) {
                enemy_list[ei] = null;
            }
        }
    }

    //
    let killed = 0;
    for (let ei = 0; ei < enemy_list.length; ei++) {
        if (enemy_list[ei] == null) {
            killed++;
        }
    }
    if (killed == enemy_list_max_size) {
        game_win = true;
    }

    bomb_list = newbs;
}

function add_bomb(x, y, t) {
    if (bomb_counter < bomb_counter_max) {
        let b = new Bomb(x, y, img_bomb, t, song_exp);
        bomb_list.push(b);
        bomb_counter++;
    }
}

function reset_ground() {
    ground = [];
    for (let i = 0; i < block_num; i++) {
        ground[i] = [];
        for (let j = 0; j < block_num; j++) {
            ground[i][j] = 'x';
        }
    }

    // set map
    if (mouse_add_wall_btn) {
        console.log("=================================");
        console.log('Button : b => 磚塊');
        console.log('Button : s => 起始洞');
        console.log('Button : d => 能量石');
        console.log('Button : c => 清除');
        console.log('Button : 其他 => 不作用');
        console.log('結束後執行 export_array();');
        console.log("=================================");
    } else {
        import_map(MyMap.map(game_map));
    }

    // set hit_map
    set_ground_hit_map();
}

function set_ground_hit_map() {
    ground_map = [];
    for (let i = 0; i < canvas_w; i++) {
        ground_map[i] = [];
        for (let j = 0; j < canvas_w; j++) {
            let x = floor(i / bg1_w);
            let y = floor(j / bg1_w);
            ground_map[i][j] = ground[x][y];
            if (start_point == null && ground[x][y] == 's') {
                start_point = [x * bg1_w + 16, y * bg1_w + 16];
            }
        }
    }
}

function show_ground_map() {
    if (show_hit_ground) {
        for (let i = 0; i < canvas_w; i++) {
            for (let j = 0; j < canvas_w; j++) {
                if (ground_map[i][j] != 'x') {
                    point(i, j);
                }
            }
        }
    }
}

function show_mouse_location() {

    if (mouseX > 800 || mouseY > 800) {
        return;
    }

    stroke(100);
    fill(0);
    line(mouseX, 0, mouseX, canvas_w);
    line(0, mouseY, canvas_w, mouseY);

    noStroke();
    textSize(22);
    let t = 'x:' + floor(mouseX) + ' , y:' +floor(mouseY) ;
    text(t, mouseX + 5, mouseY - 5);
}

function draw_map() {
    for (let x = 0; x < block_num; x++) {
        for (let y = 0; y < block_num; y++) {
            switch (ground[x][y]) {
                case 'x':
                    break;
                case 'b0':
                    draw_brick(x, y, 0);
                    break;
                case 'b1':
                    draw_brick(x, y, 1);
                    break;
                case 'b2':
                    draw_brick(x, y, 2);
                    break;
                case 'b3':
                    draw_brick(x, y, 3);
                    break;
                case 's':
                    draw_hole(x, y);
                    break;
                case 'd':
                    draw_diamond(x, y);
                    break;
            }
        }
    }

    if (mouse_add_wall_btn) {
        mouse_block();
    }
}


function release_enemy() {
    if (mouse_add_wall_btn) {
        return;
    }
    var r = 200 ;
    if(enemy_random){
        r+=int(random(-100,300));
        //console.log('r --> '+r) ;
    }
    if (frameCount % r == 0 && enemy_list.length < enemy_list_max_size) {
        let vi = new Virus(start_point[0], start_point[1], img_virus, ground_map);
        enemy_list.push(vi);
    }
}
