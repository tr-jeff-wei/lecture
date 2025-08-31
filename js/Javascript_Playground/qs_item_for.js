class QItem_for {
       constructor() {
              this.description = [];
              this.answer_fun = [];
              this.answer_para = [];

              for (var i = 0; i < 4; i++) {
                     this.qs01();
              }
              for (var i = 0; i < 3; i++) {
                     this.qs02();
              }
              for (var i = 0; i < 3; i++) {
                     this.qs03();
              }

       }

       qs01() {

              let sym = ['🌞', '☘️', '🌈'];
              sym = Tool.ran_array(sym);

              var index = this.description.length;

              let ran_seeds = [
                Tool.ran(0, 2), Tool.ran(0, 2), Tool.ran(0, 2)
              ];
              let template = '';
              for (var n = 0; n < 3; n++) {
                     for (var i = 0; i < ran_seeds[n]; i++) {
                            template += sym[n];
                     }
              }
              let iter_n = Tool.ran(2,
                  Math.floor( 16/ template.length )
              ) ;


              let result_str = '' ;
              for (var i = 0; i < iter_n; i++) {
                     result_str += template;
              }

              this.description[index] = [
                     '------------------------------------------------',
                     '  🤔 完成下方程式產生結果',
                     ' 『' + result_str + '』',
                     '------------------------------------------------',
                     "    var ans = '' ; \n"+
                     "    var b = '"+template+"' ; \n\n"+
                     "    for ( var i  ❓   ;  i  ❓    ;  i=i+1  ) {\n\n"+
                     "         ans = ans + b ; \n\n"+
                     "    } \n"+
                     '    console.log( ans ) ;\n\n' +
                     '------------------------------------------------',
                     '','','','','','','','',''
              ];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof ans === 'undefined') return false;
                            if (ans.trim() !== para[0].trim()) return false;
                            return true;
                     };

              this.answer_para[index] = [result_str];
              //////////////////////////////////////////////////////////////////////

       }

       qs02() {

              var index = this.description.length;

              let ran_seeds = Tool.ran(100, 199) ;
              let ran_iter_n= Tool.ran(3, 9) ;

              this.description[index] = [
                     '------------------------------------------------',
                     '  🤔 請用程式計算，把『'+ran_iter_n+'』 個 '+ran_seeds+' ',
                     '      加起來的結果是多少？',
                     '------------------------------------------------',
                     "    var ans = 0 ; \n"+
                     "    var   b = "+ran_seeds+" ; \n\n"+
                     "    for ( var i  ❓   ;  i  ❓    ;  i=i+1  ) {\n\n"+
                     "         ans = ans + b ; \n\n"+
                     "    } \n"+
                     '    console.log( ans ) ;\n\n' +
                     '------------------------------------------------',
                     '','','','','','','','',''
              ];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof ans === 'undefined') return false;
                            if (ans !== para[0] ) return false;
                            return true;
                     };

              this.answer_para[index] = [ran_seeds*ran_iter_n];
              //////////////////////////////////////////////////////////////////////

       }

       qs03() {

              var index = this.description.length;

              let sn = Tool.ran(1, 9) ;
              let en= Tool.ran(10,30 ) ;

              this.description[index] = [
                     '------------------------------------------------',
                     '  🤔 請用程式計算數字 '+sn+' ～ '+en ,
                     '      全部加起來的結果是多少？',
                     '------------------------------------------------',
                     "    var ans = 0 ; \n"+
                     "    for ( var i  ❓   ;  i  ❓    ;  i=i+1  ) {\n\n"+
                     "         ans = ans + i ; \n\n"+
                     "    } \n"+
                     '    console.log( ans ) ;\n\n' +
                     '------------------------------------------------',
                     '','','','','','','','',''
              ];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof ans === 'undefined') return false;
                            if (ans !== para[0] ) return false;
                            return true;
                     };

              this.answer_para[index] = [(sn+en)*(en-sn+1)/2];
              //////////////////////////////////////////////////////////////////////

       }

}
