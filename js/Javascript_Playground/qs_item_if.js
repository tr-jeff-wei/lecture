class QItem_if {
       constructor() {
              this.description = [];
              this.answer_fun = [];
              this.answer_para = [];

              this.qs02();
              this.qs01();
              this.qs02();              
              this.qs03();
              this.qs04();
              this.qs05();
              this.qs06();
              this.qs05();
              this.qs06();

       }

       // == (number)
       qs01() {
              var index = this.description.length;

              var hh = this.ran(148, 160);
              var h = this.ran(130, 143);
              var h2 = this.ran(140, 150);

              let arr = [h,h2,hh] ;
              arr = this.ran_array( arr ) ;

              this.description[index] = [
                     '三個小朋友。到六福村想要玩大怒神，',
                     '規定身高要 ' + h2 + ' 公分以上才可以坐。（包含 ' + h2 + '） ',
                     '請改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     '      var A = ' + arr[0] + ' ; \n'+
                     '      var B = ' + arr[1] + ' ; \n'+
                     '      var C = ' + arr[2] + ' ; \n\n'+
                     '      var A_play = false ; \n' +
                     '      var B_play = false ; \n' +
                     '      var C_play = false ; \n\n' +
                     '      if( A ❓    ){  \n' +
                     '          A_play = true ;\n' +
                     '      } \n\n'+
                     '      if( B ❓    ){  \n' +
                     '          B_play = true ;\n' +
                     '      } \n\n'+
                     '      if( C ❓    ){  \n' +
                     '          C_play = true ;\n' +
                     '      } \n\n'
                     , '', '', '' , '', '', ''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof A_play === 'undefined') return false;
                            if (typeof B_play === 'undefined') return false;
                            if (typeof C_play === 'undefined') return false;
                            if (A_play !== para[0]) return false;
                            if (B_play !== para[1]) return false;
                            if (C_play !== para[2]) return false;
                            return true;
                     };

              this.answer_para[index] = [arr[0] >= h2 , arr[1] >=h2 , arr[2] >=h2 ];
              //////////////////////////////////////////////////////////////////////


              index = this.description.length;

              this.description[index] = [
                     '運用 A_play 、 B_play 、 C_play 保存的結果，',
                     '告訴每個小朋友可不可以玩。',
                     '請改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     "    var result = '' ; ",
                     '    if( A_play ==  ❓ ){\n' +
                     "         result = result + '歡迎 A ' ;\n" +
                     '    }\n\n' +
                     '    if( B_play ==  ❓ ){\n' +
                     "         result = result + '歡迎 B ' ;\n" +
                     '    }\n\n' +
                     '    if( C_play ==  ❓ ){\n' +
                     "         result = result + '歡迎 C ' ;\n" +
                     '    }\n\n' +
                     '', '', '', ''
              ];

              let rrr = '' ;
              if( arr[0] >= h2){
                rrr+='歡迎 A ';
              }
              if( arr[1] >= h2){
                rrr+='歡迎 B ';
              }
              if( arr[2] >= h2){
                rrr+='歡迎 C ';
              }

              this.answer_fun[index] =
                     function(para) {
                            if (typeof result === 'undefined') return false;
                            if (result.trim() !== para[0].trim()) return false;
                            return true;
                     };
              this.answer_para[index] = [rrr];



       }


       qs02() {

              let index = this.description.length;

              let names = ['Jeff', 'Mary', 'Peter', 'Annie'];
              names = this.ran_array(names) ;

              let ni = this.ran(0, names.length - 1);

              this.description[index] = [
                     names[ni] + ' 是今天的壽星，同學們想要給他一個驚喜。',
                     '如果進教室的人是壽星，大家會說［生日快樂］',
                     '否則說［歡迎光臨］。進教室的人依序是 p1、p2、',
                     'p3 ，找出大家依序說出的話。',
                     '改寫下列的程式碼，將 ? 換成適合的內容。 ',
                     '📄===================================📄',
                     "      var p1 = '" + names[0] + "'    ; // 進教室的人\n"+
                     "      var p2 = '" + names[1] + "'    ; // 進教室的人\n"+
                     "      var p3 = '" + names[2] + "'    ; // 進教室的人\n\n"+
                     "      var say = '' ;\n\n"+
                     '      if ( p1  ❓  ){  \n' +
                     "          say = say + '生日快樂,' ; \n" +
                     '      } else { \n' +
                     "          say = say + '歡迎光臨,' ;\n" +
                     '      }  \n\n'+
                     '      if ( p2  ❓  ){  \n' +
                     "          say = say + '生日快樂,' ; \n" +
                     '      } else { \n' +
                     "          say = say + '歡迎光臨,' ;\n" +
                     '      }  \n\n'+
                     '      if ( p3  ❓  ){  \n' +
                     "          say = say + '生日快樂,' ; \n" +
                     '      } else { \n' +
                     "          say = say + '歡迎光臨,' ;\n" +
                     '      }  \n\n','','',''
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof say === 'undefined') return false;
                            if (say.trim() !== para[0].trim()) return false;
                            return true;
                     };

              let word = '';
              if ( names[0] == names[ni] ){
                  word = word + '生日快樂,' ;
              } else {
                  word = word + '歡迎光臨,' ;
              }
              if ( names[1] == names[ni] ){
                  word = word + '生日快樂,' ;
              } else {
                  word = word + '歡迎光臨,' ;
              }
              if ( names[2] == names[ni] ){
                  word = word + '生日快樂,' ;
              } else {
                  word = word + '歡迎光臨,' ;
              }

              this.answer_para[index] = [word];
       }

       qs03() {
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
                     '      if( boss  ❓  John  ){  \n' +
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

       qs04() {


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
                     '      if( score ❓ ){ \n' +
                     "         gift = gift + g1 + ',' ;\n" +
                     '      }\n' +
                     '      if( score ❓ ){ \n' +
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

       qs05() {
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
                     '     if( joy  ❓  boss ){ \n'+
                     '          total = 50 ; \n'+
                     '          if( joy ❓  ){  \n'+
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


       qs06() {
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
                     '     if( mark  ❓  boss ){ \n'+
                     '          if( mark  ❓  ){  \n'+
                     '              total =   ❓   ; \n' +
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
