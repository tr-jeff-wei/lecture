class QItem_if {
       constructor() {
              this.description = [];
              this.answer_fun = [];
              this.answer_para = [];

              this.qs01();
              this.qs02();
              this.qs03();
              this.qs04();
              this.qs05();
              this.qs06();
              this.qs07();
              this.qs08();
       }

       // == (number)
       qs01() {
              var index = this.description.length;

              var h = this.ran(120, 160);
              var h2 = this.ran(140, 160);

              this.description[index] = [
                     '小英身高 ' + h + ' 公分。到六福村想要玩大怒神，',
                     '規定身高要 ' + h2 + ' 公分以上才可以坐。（包含 ' + h2 + '） ',
                     '請改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     '      var my_height = ' + h + ' ;',
                     '      var can_play = false ;',
                     '      if( my_height ???   ){  \n' +
                     '          can_play = true ;\n' +
                     '      }', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof my_height === 'undefined') return false;
                            if (typeof can_play === 'undefined') return false;
                            if (my_height !== para[0]) return false;
                            if (can_play !== para[1]) return false;
                            return true;
                     };

              this.answer_para[index] = [h, h >= h2];
              //////////////////////////////////////////////////////////////////////


              index = this.description.length;

              this.description[index] = [
                     '運用 can_play 保存的結果，告訴小英可不可以玩。',
                     '請改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     "    var result = '' ; ",
                     '    if( can_play == ? ){\n' +
                     "         result = '歡迎來玩' ;\n" +
                     '    }\n' +
                     '    if( can_play == ? ){\n' +
                     "         result = '身高不足' ;\n" +
                     '    }', '', '', '', ''
              ];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof result === 'undefined') return false;
                            if (result.trim() !== para[0]) return false;
                            return true;
                     };
              this.answer_para[index] = [(h >= h2) ? '歡迎來玩' : '身高不足'];



       }

       qs02() {
              var index = this.description.length;

              var n1 = this.ran(1, 5);
              var n2 = this.ran(3, 4);

              this.description[index] = [
                     'Emily 走到抽抽樂的攤子，抽中數字 ' + n1,
                     '攤子上貼著今天的幸運數字是『' + n2 + '』',
                     '請用程式判斷 Emily 是否中獎',
                     '改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     '      var emily_n = ' + n1 + ' ;',
                     '      var win = false ;',
                     '      if( emily_n ???   ){  \n' +
                     '          win = true ; \n' +
                     '      }  ', '', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof emily_n === 'undefined') return false;
                            if (typeof win === 'undefined') return false;
                            if (emily_n !== para[0]) return false;
                            if (win !== para[1]) return false;
                            return true;
                     };

              this.answer_para[index] = [n1, n1 == n2];
              //////////////////////////////////////////////////////////////////////


              index = this.description.length;

              this.description[index] = [
                     '運用 win 紀錄的結果，告訴 Emily 是否中獎',
                     '改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     "    var toEmily = '' ; ",
                     '    if( win == ? ){\n' +
                     "         toEmily = '下次再來' ;\n" +
                     '    }\n' +
                     '    if( win == ? ){\n' +
                     "         toEmily = '恭喜幸運兒' ;\n" +
                     '    }', '', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof toEmily === 'undefined') return false;
                            if (toEmily !== para[0]) return false;
                            return true;
                     };

              this.answer_para[index] = [(n1 == n2) ? '恭喜幸運兒' : '下次再來'];

       }

       qs03() {

              var names = ['Jeff', 'Mary', 'Peter', 'Annie'];
              var ni = this.ran(0, names.length - 1);
              var ni2 = this.ran(0, names.length - 1);
              var index = this.description.length;

              this.description[index] = [
                     names[ni] + ' 是今天的壽星，同學們想要給他一個驚喜。',
                     '如果進教室的人是壽星，大家會說［生日快樂］',
                     '否則說［歡迎光臨］。結果下一位進教室的人是',
                     '『' + names[ni2] + '』',
                     '改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     "      var coming = '" + names[ni2] + "' ; // 進教室的人",
                     "      var say = '' ;",
                     '      if( coming ???   ){  \n' +
                     "          say = '生日快樂' ; \n" +
                     '      } else { \n' +
                     "          say = '歡迎光臨' ;\n" +
                     '      }  ', '', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof coming === 'undefined') return false;
                            if (typeof say === 'undefined') return false;
                            if (coming !== para[0]) return false;
                            if (say !== para[1]) return false;
                            return true;
                     };

              var word = (names[ni2] == names[ni]) ? '生日快樂' : '歡迎光臨';

              this.answer_para[index] = [names[ni2], word];
       }

       qs04() {
              var index = this.description.length;

              var r1 = this.ran(0, 1);
              var n1 = this.ran(1, 9);
              var n2 = this.ran(1, 9);

              this.description[index] = [
                     'John 走到夜市玩比大小遊戲的攤位，老闆說：',
                     '「今天抽中的號碼比他『' + ((r1 == 0) ? '大' : '小') + '』就把禮物帶回家。」',
                     '老闆的號碼是『' + n1 + '』，John 抽中的號碼是『' + n2 + '』',
                     '請改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     '      var boss = ' + n1 + ' ;',
                     '      var John = ' + n2 + ' ;',
                     '      var result = "" ;',
                     '      if( boss ??? John  ){  \n' +
                     '          result = "禮物帶回家！" ;\n' +
                     '      }else{\n' +
                     '          result = "銘謝惠顧！" ;\n' +
                     '      }', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof boss === 'undefined') return false;
                            if (typeof John === 'undefined') return false;
                            if (typeof result === 'undefined') return false;
                            if (boss !== para[0]) return false;
                            if (John !== para[1]) return false;
                            if (result !== para[2]) return false;
                            return true;
                     };

              var rr = '';
              if (r1 == 0) {
                     if (n2 > n1) {
                            rr = '禮物帶回家！';
                     } else {
                            rr = '銘謝惠顧！';
                     }
              } else {
                     if (n2 < n1) {
                            rr = '禮物帶回家！';
                     } else {
                            rr = '銘謝惠顧！';
                     }
              }
              this.answer_para[index] = [n1, n2, rr];
       }

       qs05() {


              var index = this.description.length;

              var s = this.ran(1, 8);
              var top = this.ran(1, 4);

              this.description[index] = [
                     '趣味競賽頒獎，前五名可獲得筆記本，前' + top + '名可獲得',
                     '皮卡丘背包。 Annie 得到第 ' + s + ' 名，可獲得那些獎品。',
                     '改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     "      var g1 = '筆記本' ;",
                     "      var g2 = '皮卡丘背包'  ;",
                     "      var gift = '' ;",
                     '      var score = ' + s + ' ; // Annie 名次',
                     '      if( score ?? ){ \n' +
                     "         gift = gift + g1 + ',' ;\n" +
                     '      }\n' +
                     '      if( score ?? ){ \n' +
                     "         gift = gift + g2 + ',' ;\n" +
                     '      }\n', '', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof score === 'undefined') return false;
                            if (typeof gift === 'undefined') return false;
                            if (score !== para[0]) return false;
                            if (gift !== para[1]) return false;
                            return true;
                     };

              var gg = '';
              if (s <= 5) {
                     gg = gg + '筆記本,';
              }
              if (s <= top) {
                     gg = gg + '皮卡丘背包,';
              }

              this.answer_para[index] = [s, gg];
       }

       qs06() {
              var index = this.description.length;

              var ci = this.ran(1, 9);
              var bi = this.ran(1, 9);
              var li = this.ran(1, 9);

              this.description[index] = [
                     'Joy 在園遊會玩樂透抽球遊戲，只要抽出比莊家大',
                     '的牌，可以獲得 50 獎勵點。在比莊家大的情況下，',
                     '如果又是今天的幸運號「'+li+'」，可以獲得額外 30 點',
                     '獎勵。改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     '     var joy   = ' + ci + ' ; // Joy 的號碼 \n' +
                     '     var boss  = ' + bi + ' ; // 莊家的號碼 \n' +
                     '     var total = 0 ; // 獎勵點數 \n'+
                     '     if( joy ??? boss ){ \n'+
                     '          total = 50 ; \n'+
                     '          if( joy ??? ){  \n'+
                     '              total = total + 30 ; \n' +
                     '          } \n'+
                     '     }', '', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof joy === 'undefined') return false;
                            if (typeof boss === 'undefined') return false;
                            if (typeof total === 'undefined') return false;
                            if (joy !== para[0]) return false;
                            if (boss !== para[1]) return false;
                            if (total !== para[2]) return false;
                            return true;
                     };

              var t = 0;
              if (ci > bi) {
                     t = 50;
                     if (ci == li) {
                            t = t + 30;
                     }
              }

              this.answer_para[index] = [ci, bi, t];
       }

       qs07() {


              var index = this.description.length;

              var s = this.ran(1, 8);
              var top = this.ran(2, 5);

              this.description[index] = [
                     '趣味競賽頒獎，前 ' + top + ' 名可獲得「戰鬥陀螺」，若沒有',
                     '進名次，有參加獎「鉛筆」。 Jeff 得到第 ' + s + ' 名，',
                     '可獲得什麼獎品。（將獲得禮物放在 gift ）' ,
                     '改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     "      var a1 = '鉛筆'      ;",
                     "      var a2 = '戰鬥陀螺'  ;",
                     "      var gift = '' ;",
                     '      var jeff = ' + s + ' ; // 名次',
                     '      // 使用 if else', '', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof jeff === 'undefined') return false;
                            if (typeof gift === 'undefined') return false;
                            if (jeff !== para[0]) return false;
                            if (gift !== para[1]) return false;
                            return true;
                     };

              var gg = '';
              if (s >= top) {
                    gg =  '戰鬥陀螺';
              }else{
                    gg =  '鉛筆';
              }

              this.answer_para[index] = [s, gg];
       }

       qs08() {
              var index = this.description.length;

              var ci = this.ran(1, 15);
              var bi = this.ran(1, 12);

              this.description[index] = [
                     'Mark 在園遊會玩超級抽球，要抽出比莊家大而且要',
                     '超過 10 點的牌，才可以獲得 100 獎勵點。',
                     '改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     '     var mark  = ' + ci + ' ; // Mark 的號碼 \n' +
                     '     var boss  = ' + bi + ' ; // 莊家的號碼 \n' +
                     '     var total = 0 ; // 獎勵點數 \n'+
                     '     if( mark  ???  boss ){ \n'+
                     '          if( mark ??? ){  \n'+
                     '              total =  ???  ; \n' +
                     '          } \n'+
                     '     }', '', '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof mark === 'undefined') return false;
                            if (typeof boss === 'undefined') return false;
                            if (typeof total === 'undefined') return false;
                            if (mark !== para[0]) return false;
                            if (boss !== para[1]) return false;
                            if (total !== para[2]) return false;
                            return true;
                     };

              var t = 0;
              if (ci > bi) {
                     if ( ci>10) {
                            t =100;
                     }
              }

              this.answer_para[index] = [ci, bi, t];
       }


       ran(start, end) {
              var diff = end - start;
              return Math.floor(Math.random() * (diff + 1)) + start;
       }

       ran_array(arr_in) {
              var result = [];
              while (arr_in.length > 0) {
                     let r = this.ran(0, arr_in.length - 1);
                     let a = arr_in.splice(r, 1);
                     result.push(a[0]);
              }
              return result;
       }
}
