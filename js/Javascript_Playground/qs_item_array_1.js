class QItem_array_1 {
       constructor() {
              this.description = [];
              this.answer_fun = [];
              this.answer_para = [];

              for (var i = 0; i < 3; i++) {
                     this.qs01();
              }
              for (var i = 0; i < 3; i++) {
                     this.qs02();
              }
              for (var i = 0; i < 4; i++) {
                     this.qs03();
              }

       }

       qs01() {

              var index = this.description.length;
              let names_arr = [...Tool.NAMES];
              names_arr = Tool.ran_array(names_arr);
              let tn = 6;
              let si = Tool.ran(0, 2);
              let ei = Tool.ran(3, 5);

              let info0 = [

                     '----------------------------------------------------------------',
                     '  🤔 老師從下列陣列名字中，進行點名，點到',
                     '      的名字放進答案（ answer ）變數中。',
                     '      老師點到陣列的 ' + si + ' ～ ' + ei + ' 號。',
                     '      ➩  var answer =  ❓  ;',
                     '----------------------------------------------------------------'
              ];
              let info1 = [];
              let ans_target = '';
              let info_str = '    var arr = [ ] ; \n';
              for (let i = 0; i < tn; i++) {
                     info_str += '    arr[ ' + i + " ] = '" + names_arr[i] + "'  ;\n";
                     if (i >= si && i <= ei) {
                            ans_target = ans_target + names_arr[i] + '☆';
                     }
              }
              info_str += "\n    var answer = '' ; \n";
              info_str += '    for ( var i=❓  ;  ❓ ;  i=i+1  ){  \n';
              info_str += "         answer = answer + arr[i] + '☆' ; \n";
              info_str += "    }";

              this.description[index] =
                     info0.concat([info_str]).concat([
                            '', '', '', '', '', '', '', '', '', ''
                     ]);

              this.answer_fun[index] =
                     function(para) {
                            if (typeof answer === 'undefined') return false;
                            if (answer != para[0]) return false;
                            return true;
                     };

              this.answer_para[index] = [ans_target];

       }

       qs02() {

              var index = this.description.length;
              let names_arr = [...Tool.NAMES];
              names_arr = Tool.ran_array(names_arr);
              let tn = 6;
              let si = Tool.ran(0, 2);
              let ei = Tool.ran(3, 5);

              let info0 = [

                     '----------------------------------------------------------------',
                     '  🤔 老師從下列陣列名字中，進行點名，點到',
                     '      的名字放進答案（ answer ）變數中。',
                     '      老師點到陣列的 ' + si + ' ～ ' + ei + ' 號。',
                     '      運用 （arr.length 回答）',
                     '      ➩  var answer =  ❓  ;',
                     '----------------------------------------------------------------'
              ];
              let info1 = [];
              let ans_target = '';
              let info_str = '    var arr = [ ] ; \n';
              for (let i = 0; i < tn; i++) {
                     info_str += '    arr[ ' + i + " ] = '" + names_arr[i] + "'  ;\n";
                     if (i >= si && i <= ei) {
                            ans_target = ans_target + names_arr[i] + '☆';
                     }
              }
              info_str += "\n    var answer = '' ; \n";
              info_str += '    for ( var i=❓  ;  i <= arr.length - ❓ ;  i=i+1  ){  \n';
              info_str += "         answer = answer + arr[i] + '☆' ; \n";
              info_str += "    }";

              this.description[index] =
                     info0.concat([info_str]).concat([
                            '', '', '', '', '', '', '', '', '', ''
                     ]);

              this.answer_fun[index] =
                     function(para) {
                            if (typeof answer === 'undefined') return false;
                            if (answer != para[0]) return false;
                            return true;
                     };

              this.answer_para[index] = [ans_target];

       }


       qs03() {

              var index = this.description.length;
              let tn = 6;
              let num_arr = [];
              for( var i=0; i<tn ; i++){
                  num_arr.push( Tool.ran(70,100) );
              }

              let si = Tool.ran(0, 2);
              let ei = Tool.ran(3, 5);

              let info0 = [
                     '----------------------------------------------------------------',
                     '  🤔 老師從下列陣列分數中，進行總分計算',
                     '      要把總分加到答案（ answer ）變數中。',
                     '      老師要加陣列的 ' + si + ' ～ ' + ei + ' 號。',
                     '      運用 （arr.length 回答）',
                     '      ➩  var answer =  ❓  ;',
                     '----------------------------------------------------------------'
              ];
              let info1 = [];
              let ans_target = 0;
              let info_str = '    var arr = [ ] ; \n';
              for (let i = 0; i < tn; i++) {
                     info_str += '    arr[ ' + i + " ] = " + num_arr[i] + "  ;\n";
                     if (i >= si && i <= ei) {
                            ans_target = ans_target + num_arr[i] ;
                     }
              }
              info_str += "\n    var answer = 0 ; \n";
              info_str += '    for ( var i=❓  ;  i <= arr.length - ❓ ;  i=i+1  ){  \n';
              info_str += "         answer = answer + arr[i]  ; \n";
              info_str += "    }";

              this.description[index] =
                     info0.concat([info_str]).concat([
                            '', '', '', '', '', '', '', '', '', ''
                     ]);

              this.answer_fun[index] =
                     function(para) {
                            if (typeof answer === 'undefined') return false;
                            if (answer != para[0]) return false;
                            return true;
                     };

              this.answer_para[index] = [ans_target];

       }

}
