var imgs = {};
var edge_boarder_size = 5;
var block_size = 60;
var block_matrix = [];
var block_num;
var question_index = 0;
var question_line = 0;
var name = '';
var steps = [];
var qsObj;
var start = false;
var evl_count = 0;


var GAME_SCORE = 0;

function preload() {
       imgs['rocks'] = [];
       imgs.rocks.push(loadImage('imgs/2.png'));
       imgs.rocks.push(loadImage('imgs/3.png'));
       imgs['box'] = [];
       imgs.box.push(loadImage('imgs/w_box.png'));
       imgs['player'] = [];
       imgs.player.push(loadImage('imgs/bird2.png'));
       imgs.player.push(loadImage('imgs/23.png'));
       imgs['diamond'] = [];
       imgs.diamond.push(loadImage('imgs/diamond.png'));
       imgs['check'] = [];
       imgs.check.push(loadImage('imgs/OK.png'));
       imgs.check.push(loadImage('imgs/Wrong.png'));
}

function setup() {
       var cnv = createCanvas(900, 300);
       cnv.parent('my_canvas');
       frameRate(1);

       block_num = width / block_size;

       qsObj = new QFOR();

       reset_question();

       setup_map();
       setScore();


}

function draw() {

       background(218, 229, 224);
       draw_scene();
       qsObj.draw_text_info();

       if (start) {
              if (steps.length < 1) {
                     start = false;
                     if (evl_count == qsObj.target_goal) {
                            console.log('🎉 完成，恭喜！！');
                            GAME_SCORE++;
                            reset_question();
                     } else {
                            console.log('⛔ 失敗，再接再厲！！');
                     }
                     setup_map();
                     setScore();

              } else {
                     let a = steps.splice(0, 1);
                     if( move_to(a[0]) == false ){
                       steps = [] ;
                     }
              }
       }
}

function reset_question() {

       if (GAME_SCORE < 4) {
              qsObj.gen_random_map(true, false);
              qsObj.build_text_info();
              qsObj.show_question();
       } else if (GAME_SCORE < 8) {
              qsObj.gen_random_map(false, false);
              qsObj.build_text_info();
              qsObj.show_question();
       } else {
              qsObj.gen_random_map(false, true);
              qsObj.build_text_info();
              qsObj.show_question();
       }


}



function move() {
       let pi = qsObj.matrix_info.indexOf('P');
       if (pi < 0) {
              return false;
       }

       let target = qsObj.matrix_info.charAt(pi + 1);
       let x = pi % block_num;
       let y = Math.floor(pi / block_num);
       if (target == 'D') {
              block_matrix[x + 1][y] = block_matrix[x][y];
              block_matrix[x][y] = null;
              qsObj.matrix_info = qsObj.matrix_info.replace('PD', 'XP');
              return true;
       } else {
              block_matrix[x + 1][y] = imgs.player[1];
              block_matrix[x][y] = null;

              return false;
       }
}

function move_to(i) {

       console.log('go to --> ' + i);
       evl_count++;

       let target_idx = i - qsObj.start_number + 1;

       let pi = qsObj.matrix_info.indexOf('P');
       if (pi < 0) {
              return false;
       }

       let target = qsObj.matrix_info.charAt(pi + target_idx);
       let x = pi % block_num;

       if (x + target_idx >= 0 && x + target_idx < block_matrix.length) {

              if (target == 'D') {
                     block_matrix[x + target_idx][player_pre_y] = block_matrix[player_pre_x][player_pre_y];
                     block_matrix[player_pre_x][player_pre_y] = null;
                     player_pre_x = x + target_idx;

                     return true;
              } else {
                     block_matrix[x + target_idx][player_pre_y] = imgs.player[1];
                     block_matrix[player_pre_x][player_pre_y] = null;
                     player_pre_x = x + target_idx;
                     return false;
              }
       } else {
              block_matrix[player_pre_x][player_pre_y] = imgs.player[1];;
              return false;
       }
}



function draw_scene() {
       for (var x = 0; x < block_num; x++) {
              for (var y = 0; y < block_num; y++) {
                     if (block_matrix[x][y] != null) {
                            paint_image(block_matrix[x][y], block_size, block_size * x, block_size * y);
                     }
              }
       }
}

function setup_map() {
       var line_num = 0;
       for (var i = 0; i < qsObj.matrix_info.length; i++) {
              var w = qsObj.matrix_info.charAt(i);
              var x = i % block_num;
              if (line_num == 0) {
                     block_matrix[x] = [];
              }
              // console.log(x + "," + line_num);

              switch (w) {
                     case 'O':
                            block_matrix[x][line_num] = get_random_one(imgs.rocks);
                            break;
                     case 'B':
                            block_matrix[x][line_num] = imgs.box[0];
                            break;
                     case 'P':
                            block_matrix[x][line_num] = imgs.player[0];
                            player_pre_x = x;
                            player_pre_y = line_num;
                            break;
                     case 'D':
                            block_matrix[x][line_num] = imgs.diamond[0];
                            break;
                     default:
                            block_matrix[x][line_num] = null;
              }
              if (x == block_num - 1) {
                     line_num++;
              }
       }
}

function paint_image(theOne, size, x, y) {

       // pick random one
       //var theOne = target[Math.floor(Math.random()*target.length)] ;
       //var theOn
       // find scale ratio


       var ratio;
       if (theOne.width > theOne.height) {
              ratio = (size - 2 * edge_boarder_size) / theOne.width;
       } else {
              ratio = (size - 2 * edge_boarder_size) / theOne.height;
       }

       image(theOne, x + edge_boarder_size, y + edge_boarder_size, theOne.width * ratio, theOne.height * ratio);

}

function get_random_one(target) {
       return target[Math.floor(Math.random() * target.length)];
}

function setScore() {
       let box = '🧰';
       let box2 = '📦';
       let box3 = '🧱';
       let medal = '🏅';


       let result = '';
       for (let i = 0; i < 15; i++) {
              if (i < GAME_SCORE) {
                     result += medal;
              } else {
                     if (i < 4) {
                            result += box;
                     } else if (i < 8) {
                            result += box2;
                     } else {
                            result += box3;
                     }

              }
       }

       document.getElementById('score').textContent = result;
}

function ready() {
       steps = [];
       evl_count = 0;
}

function goto(i) {
       steps.push(i);
}

function done() {
       start = true;
}
