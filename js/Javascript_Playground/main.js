var imgs = {};
var edge_boarder_size = 5;
var block_size = 60;
var block_matrix = [];
var block_num;
var question_index = 0;
var question_line = 0;
var qsObj;
var name = '';

function preload() {
       imgs['rocks'] = [];
       imgs.rocks.push(loadImage('imgs/2.png'));
       imgs.rocks.push(loadImage('imgs/3.png'));
       imgs['box'] = [];
       imgs.box.push(loadImage('imgs/w_box.png'));
       imgs['player'] = [];
       imgs.player.push(loadImage('imgs/bird2.png'));
       imgs['diamond'] = [];
       imgs.diamond.push(loadImage('imgs/diamond.png'));
       imgs['check'] = [];
       imgs.check.push(loadImage('imgs/OK.png'));
       imgs.check.push(loadImage('imgs/Wrong.png'));
}

function setup() {
       var cnv = createCanvas(600, 1000);
       cnv.parent('my_canvas');

       qsObj = new Question(imgs.check);

       block_num = width / block_size;
       setup_map();
}

function draw() {

       document.getElementById('u_name').textContent = name;

       background(218, 229, 224);
       draw_scene();
       qsObj.show();
}

function draw_scene() {

       question_index = qsObj.qs_index;

       // check question index
       for (var x = 0; x < block_num; x++) {
              if (x >= question_index) {
                     block_matrix[x][question_line] = imgs.box[0];
              } else {
                     block_matrix[x][question_line] = imgs.diamond[0];
              }
              block_matrix[x][question_line + 1] = null;
       }

       if (question_index >= block_num) {
              block_matrix[block_num - 1][question_line + 1] = imgs.player[0];
       } else {
              block_matrix[question_index][question_line + 1] = imgs.player[0];
       }


       for (var x = 0; x < block_num; x++) {
              for (var y = 0; y < block_num*2; y++) {
                     if (block_matrix[x][y] != null) {
                            paint_image(block_matrix[x][y], block_size, block_size * x, block_size * y);
                     }
              }
       }
}

function setup_map() {

       var road_map_str =

              "BBBBBBBBBB" +
              "PXXXXXXXXX" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO" +
              "OOOOOOOOOO";

       var line_num = 0;
       for (var i = 0; i < road_map_str.length; i++) {
              var w = road_map_str.charAt(i);
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

function check_answer() {
       if (qsObj) {
              qsObj.check_answer();
       }
}
