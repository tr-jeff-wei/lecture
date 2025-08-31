class QFOR {

       QFOR() {}

       gen_random_map(basic, use_space) {
              this.basic = basic ;
              this.target_goal = 0;
              this.use_space = use_space ;

              if (!use_space) {
                     this.itr_space = 0;
              } else {
                     this.itr_space = Tool.ran(1, 3);
              }
              if (this.itr_space < 2) {
                     this.itr_step = Tool.ran(4, 6);
              } else {
                     this.itr_step = Tool.ran(2, 4);
              }


              this.start_number = 1;
              if (basic == false) {
                     this.start_number = Tool.ran(0, 9);
              }

              let s = 'OP';
              for (var i = 0; i < this.itr_step; i++) {
                     s += 'D'; // diamond
                     this.target_goal++;
                     for (var m = 0; m < this.itr_space; m++) {
                            s += 'O';
                     }
              }
              s += 'D';
              this.target_goal++;

              while (s.length < 15) {
                     s += 'O';
              }

              this.matrix_info =
                     "OOOOOOOOOOOOOOO" +
                     "OOOOOOOOOOOOOOO" +
                     s +
                     "OOOOOOOOOOOOOOO" +
                     "OOOOOOOOOOOOOOO";

              //console.log('this.target_goal -> ' + this.target_goal);
              return this.matrix_info;
       }

       build_text_info() {
              this.text_info = true;
              this.block_matrix_text = [];
              for (var i = 0; i < block_num; i++) {
                     this.block_matrix_text[i] = [];
              }

              let di = this.matrix_info.indexOf('D');
              for (var i = di; i < di + (this.itr_space + 1) * this.itr_step + 1; i++) {
                     let x = i % block_num;
                     let y = Math.floor(i / block_num);
                     this.block_matrix_text[x][y - 1] = '' + i - di + this.start_number;
              }
       }

       draw_text_info() {
              for (var x = 0; x < this.block_matrix_text.length; x++) {
                     for (var y = 0; y < this.block_matrix_text[x].length; y++) {
                            textSize(32);
                            fill(39, 173, 232);
                            text(this.block_matrix_text[x][y], block_size * x + 20, block_size * y + 60);
                     }
              }
       }

       show_question() {
         let text = '' ;

         if( this.basic ){
           text = [
             '=============================================',
                 ' 🤔 請運用下面程式，取得所有鑽石' ,
                 '=============================================',
                  '    ready() ;\n' +
                  '    for ( var i=' + this.start_number + ' ; i ❓  ; i=i+1 ){ \n' +
                  '        goto( i ) ; \n' +
                  '    }\n' +
                  '    done() ;',
                  '============================================='
           ];

         }else if(!this.use_space){
           text = [
             '=============================================',
                 ' 🤔 請運用下面程式，取得所有鑽石' ,
                 '=============================================',
                  '    ready() ;\n' +
                  '    for ( var i ❓  ; i ❓  ; i=i+1 ){ \n' +
                  '        goto( i ) ; \n' +
                  '    }\n' +
                  '    done() ;',
                  '============================================='
           ];
         }else{
           text = [
             '=============================================',
                 ' 🤔 請運用下面程式，取得所有鑽石' ,
                 '=============================================',
                  '    ready() ;\n' +
                  '    for ( var i ❓  ; i ❓  ; i=i+❓ ){ \n' +
                  '        goto( i ) ; \n' +
                  '    }\n' +
                  '    done() ;',
                  '============================================='
           ];
         }




              for (let k of text) {
                     console.log(k);
              }
       }

}
