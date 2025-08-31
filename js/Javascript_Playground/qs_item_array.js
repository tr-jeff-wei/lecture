class QItem_array {
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

              let tnames = [...Tool.NAMES];
              tnames = Tool.ran_array(tnames);
              let tn = Tool.ran(3, 5);

              let nlist = '';
              let nlist_arr = [];
              for (let i = 0; i < tn; i++) {
                     if (nlist.length > 0) {
                            nlist = nlist + '、' + tnames[i];
                     } else {
                            nlist = tnames[i];
                     }
                     nlist_arr.push(tnames[i]);
              }

              this.description[index] = [

                     '----------------------------------------------------------------',
                     '  🤔 應用陣列 push( ❓ ) 方式，把下列名字，',
                     '       依序放進陣列中。',
                     '       [名字] ' + nlist,
                     '----------------------------------------------------------------',
                     "    var arr = [ ] ; ",
                     "    arr.push( '" + nlist_arr[0] + "' ) ; ",
                     '    ❓ ',
                     '    ❓ ',
                     '',
                     '    console.log( arr ) ;',
                     '', '', '', '', '', '', '', '', ''
              ];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof arr === 'undefined') return false;
                            if (arr.length != para[0].length) return false;

                            for (let k = 0; k < arr.length; k++) {
                                   if (arr[k] != para[0][k]) {
                                          return false;
                                   }
                            }
                            return true;
                     };

              this.answer_para[index] = [nlist_arr];
              //////////////////////////////////////////////////////////////////////

       }

       qs02() {

              var index = this.description.length;

              let tnames = [...Tool.NAMES];
              tnames = Tool.ran_array(tnames);
              let tn = Tool.ran(3, 5);
              let tns = [];
              for (let ni = 0; ni < tn; ni++) {
                     tns.push(ni);
              }
              tns = Tool.ran_array(tns);


              let nlist_arr = [];
              for (let i = 0; i < tn; i++) {
                     nlist_arr[tns[i]] = tnames[i];
              }

              // 串接文字字串
              let nlist0 = [
                     '----------------------------------------------------------------',
                     "  🤔 應用陣列 arr[ ❓ ] = 'ABC' 方式，把下列名字，",
                     '       放進陣列指定位置中。'
              ];
              let nlist = [];
              for (let i = 0; i < tn; i++) {
                     let tag = '      >>  ' + tns[i] + '： ' + nlist_arr[tns[i]];
                     nlist.push(tag);
              }

              this.description[index] =
                     nlist0.concat(nlist).concat([
                            '----------------------------------------------------------------',
                            "    var arr = [ ] ; ",
                            "    arr[ " + tns[0] + " ] = '" + nlist_arr[tns[0]] + "'  ; ",
                            '    ❓ ',
                            '    ❓ ',
                            '',
                            '    console.log( arr ) ;',
                            '', '', '', '', '', '', '', '', ''
                     ]);
              this.answer_fun[index] =
                     function(para) {
                            if (typeof arr === 'undefined') return false;
                            if (arr.length != para[0].length) return false;

                            for (let k = 0; k < arr.length; k++) {
                                   if (arr[k] != para[0][k]) {
                                          return false;
                                   }
                            }
                            return true;
                     };

              this.answer_para[index] = [nlist_arr];
              //////////////////////////////////////////////////////////////////////

       }

       qs03() {

              var index = this.description.length;
              let names_arr = [...Tool.NAMES_LEN];
              names_arr = Tool.ran_array(names_arr);
              let tn = Tool.ran(3, 5);
              let isLongest = (Math.random() > 0.5) ? true : false;

              let info0 = [

                     '----------------------------------------------------------------',
                     '  🤔 從下列陣列名字中，挑選出長度最「' + (isLongest ? '長' : '短') + '」',
                     '      的名字放進答案（ answer ）變數中。',
                     '      ➩  var answer = arr [ ❓ ] ;',
                     '----------------------------------------------------------------',
                     "    var arr = [ ] ; "
              ];
              let info1 = [];
              let ans_target = names_arr[0];
              for (let i = 0; i < tn; i++) {
                     info1.push('    arr[ ' + i + " ] = '" + names_arr[i] + "'  ;");
                     if (isLongest) {
                            if (ans_target.length < names_arr[i].length) {
                                   ans_target = names_arr[i];
                            }
                     } else {
                            if (ans_target.length > names_arr[i].length) {
                                   ans_target = names_arr[i];
                            }
                     }
              }

              this.description[index] =
                     info0.concat(info1).concat([
                            '     ',
                            '    var answer = arr [ ❓ ] ;',
                            '', '', '', '', '', '', '', '', '', ''
                     ]);

              this.answer_fun[index] =
                     function(para) {
                            if (typeof answer === 'undefined') return false;
                            if (answer.length != para[0].length) return false;
                            return true;
                     };

              this.answer_para[index] = [ans_target];



       }

}
