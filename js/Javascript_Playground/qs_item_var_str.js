class QItem_var_str {
       constructor() {
              this.description = [];
              this.answer_fun = [];
              this.answer_para = [];
              this.qs01();
              this.qs02();
              this.qs03();
              this.qs04();
       }

       qs01() {
              var index = this.description.length;
              var ori_arr = ['John', 'Mary', 'Jay', 'May', 'Maria'];
              var hint = ['a , i', 'o , n', 'r , y', 'j , y'];
              var select = ['Maria', 'John', 'Mary', 'Jay'];
              var hint_i = this.ran(0, 3);
              ori_arr = this.ran_array(ori_arr);
              this.description[index] = [
                     '新學期老師為了可以記住所有學生的名字',
                     '在點名時用程式變數記下了每位同學的名字',
                     '💡 請用程式記下名字',
                     '  1. 變數 s1 放 ' + ori_arr[0],
                     '  2. 變數 s2 放 ' + ori_arr[1],
                     '  3. 變數 s3 放 ' + ori_arr[2],
                     '  4. 變數 s4 放 ' + ori_arr[3],
                     '  5. 變數 s5 放 ' + ori_arr[4]
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof s1 === 'undefined') return false;
                            if (typeof s2 === 'undefined') return false;
                            if (typeof s3 === 'undefined') return false;
                            if (typeof s4 === 'undefined') return false;
                            if (typeof s5 === 'undefined') return false;
                            if (s1 !== para[0]) return false;
                            if (s2 !== para[1]) return false;
                            if (s3 !== para[2]) return false;
                            if (s4 !== para[3]) return false;
                            if (s5 !== para[4]) return false;
                            return true;
                     };
              this.answer_para[index] = [ori_arr[0], ori_arr[1], ori_arr[2], ori_arr[3], ori_arr[4]];
              //////////////////////////////////////////////////////////////////////
              index = this.description.length;
              this.description[index] = [
                     '老師要依照剛剛的順序，排出座位表',
                     '💡 請用程式列出座位表',
                     '  1. 把變數 s1 , s2 , .. , s5 用 + 串聯起來',
                     '     倆倆之間用逗點串起來如下所示 ',
                     "     s1 + ',' + s2 + ',' + s3 + ...",
                     '  2. 把上面的結果放到一個新的變數 list 中'
              ];
              this.answer_fun[index] = function(para) {
                     if (typeof list === 'undefined') return false;
                     if (list !== para[0]) return false;
                     return true;
              };
              var ans = ori_arr[0] + ',' + ori_arr[1] + ',' + ori_arr[2] + ',' + ori_arr[3] + ',' + ori_arr[4];
              this.answer_para[index] = [ans];

              //////////////////////////////////////////////////////////////////////
              index = this.description.length;
              this.description[index] = [
                     '老師抽字母籤，選出運動會代表班上的選手',
                     '老師抽出 ' + hint[hint_i] + ' 兩個字母，是哪一位被選中',
                     '💡 請用程式協助找出是哪位同學被抽中',
                     '  1. 輸入變數 s1 , s2 , .. , s5 看誰的',
                     "     名字裡包含 "+hint[hint_i]+" 兩個字母",
                     '  2. 找到這位被選中的同學，將他的名字放入',
                     '     變數 who 當中'
              ];
              this.answer_fun[index] = function(para) {
                     if (typeof who === 'undefined') return false;
                     if (who !== para[0]) return false;
                     return true;
              };
              this.answer_para[index] = [select[hint_i]];

       }

       qs02() {

              var n = this.ran(10000, 99999);
              var c = '';
              while (n > 0) {
                     let u = n % 10;
                     switch (u % 3) {
                            case 0:
                                   c += 'A';
                                   break;
                            case 1:
                                   c += 'B';
                                   break;
                            case 2:
                                   c += 'C';
                                   break;
                     }
                     n = Math.floor(n / 10);
              }

              var index = this.description.length;
              this.description[index] = [
                     '老師指定一串特別的代號，代表是班級暗語',
                     '運動會時，只有說出這個暗語的同學，才能',
                     '獲得老師請大家的運動飲料',
                     '💡 請用程式記下代號',
                     '  1. 老師說的代號是  ' + c,
                     "  2. 變數 c1 放 'A' ",
                     "  3. 變數 c2 放 'B' ",
                     "  4. 變數 c3 放 'C' ",
                     '  5. 運用 c1 , c2 , c3 三個變數組合出',
                     '     代碼',
                     '  6. 將上一步驟的代碼，放入變數 code '
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof c1 === 'undefined') return false;
                            if (typeof c2 === 'undefined') return false;
                            if (typeof c3 === 'undefined') return false;
                            if (typeof code === 'undefined') return false;
                            if (c1 !== para[0]) return false;
                            if (c2 !== para[1]) return false;
                            if (c3 !== para[2]) return false;
                            if (code !== para[3]) return false;
                            return true;
                     };
              this.answer_para[index] = ['A', 'B', 'C', c];

              //////////////////////////////////////////////////////////////////////
              index = this.description.length;
              var tr = ['Peter', 'Emily', 'Jack'];
              var ri = this.ran(0, 2);
              this.description[index] = [
                     '同學拿到暗語後，前往跟 ' + tr[ri] + ' 老師',
                     '領取飲料，說出：',
                     '『' + tr[ri] + '老師好！我的暗號是' + c + '』',
                     '💡 請用程式組合出暗語內容',
                     '  1. 變數 teacher 放入老師的名子',
                     '  2. 利用 code、teacher 兩個變數組合出',
                     '     最後的暗語',
                     '  3. 把暗語放到變數 secret 中'
              ];
              this.answer_fun[index] = function(para) {
                     if (typeof teacher === 'undefined') return false;
                     if (typeof code === 'undefined') return false;
                     if (typeof secret === 'undefined') return false;
                     if (teacher !== para[0]) return false;
                     if (code !== para[1]) return false;
                     if (secret !== para[2]) return false;
                     return true;
              };
              this.answer_para[index] = [tr[ri], c,
                     tr[ri] + '老師好！我的暗號是' + c
              ];


       }

       qs03() {

              var w = ['你', '我', '他'];
              var evt = ['跳舞', '發呆', '打滾'];
              var tm = ['半夜', '黃昏', '凌晨'];
              var loc = ['游泳池', '吊橋', '屋頂'];
              var obj = ['馬桶刷', '衛生紙', '安全帽'];
              var w1 = this.ran(0, 2);
              var e1 = this.ran(0, 2);
              var t1 = this.ran(0, 2);
              var l1 = this.ran(0, 2);
              var o1 = this.ran(0, 2);

              var index = this.description.length;
              this.description[index] = [
                     '運動會故事接龍大賽，同學要記住抽出的籤，最後',
                     '把籤的內容組合成故事說出來',
                     '💡 請用程式幫助同學紀錄抽出的內容',
                     '  1. 變數 who 放「' + w[w1] + '」',
                     '  2. 變數 act 放「' + evt[e1] + '」',
                     '  3. 變數 when 放「' + tm[t1] + '」',
                     '  4. 變數 where 放「' + loc[l1] + '」',
                     '  5. 變數 thing 放「' + obj[o1] + '」'
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof who === 'undefined') return false;
                            if (typeof act === 'undefined') return false;
                            if (typeof when === 'undefined') return false;
                            if (typeof where === 'undefined') return false;
                            if (typeof thing === 'undefined') return false;
                            if (who !== para[0]) return false;
                            if (act !== para[1]) return false;
                            if (when !== para[2]) return false;
                            if (where !== para[3]) return false;
                            if (thing !== para[4]) return false;
                            return true;
                     };
              this.answer_para[index] = [w[w1], evt[e1], tm[t1], loc[l1], obj[o1]];
              //////////////////////////////////////////////////////////////////////

              index = this.description.length;
              this.description[index] = [
                     '運用前面記下的變數，組合出下列的故事，',
                     '變數有：who、act、when、where、thing',
                     '💡 請用程式組合故事內容',
                     '  1. 故事：',
                     '「' + tm[t1] + '的時候' + w[w1] + '在' + loc[l1] + '用' + obj[o1] + evt[e1] + '」',
                     '  2. 變數 story 放完整的故事',
                     '     var story = when ;',
                     "         story = story + '的時候' ;",
                     '         story = story + who ;',
                     "         story = story + '在' ;",
                     '         ...'
              ];
              this.answer_fun[index] = function(para) {
                     if (typeof story === 'undefined') return false;
                     if (story !== para[0]) return false;
                     return true;
              };
              this.answer_para[index] = [tm[t1] + '的時候' + w[w1] + '在' + loc[l1] + '用' + obj[o1] + evt[e1]];

              //////////////////////////////////////////////////////////////////////

              index = this.description.length;
              this.description[index] = [
                     '運用前面記下的動作（act）、物品（thing）',
                     '兩個變數，自己組合創作句子',
                     '💡 請用程式組合句子',
                     '  1. 組合變數 act、thing 編成一個完整句子',
                     '  2. 將句子放在變數 my_story 變數中'
              ];
              this.answer_fun[index] = function(para) {
                     if (typeof my_story === 'undefined') return false;
                     if (my_story.indexOf(para[0]) == -1) return false;
                     if (my_story.indexOf(para[1]) == -1) return false;
                     return true;
              };
              this.answer_para[index] = [evt[e1], obj[o1]];

       }

       qs04() {

              var na = this.ran(1000, 9999);
              var nb = this.ran(100, 999);
              var index = this.description.length;
              this.description[index] = [
                     '運動會的計算機挑戰大賽，將以下數學問題',
                     '求得結果寫出算式就可以獲勝',
                     '💡 請用程式協助計算，並寫出算式',
                     '  1. 變數 n1 放 ' + na,
                     '  2. 變數 n2 放 ' + nb,
                     '  3. 計算 n1 + n2 的結果',
                     '  4. 寫出算式放入變數 eq 中',
                     '     算式如右 ->  ' + na + '+' + nb + "=???"
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof n1 === 'undefined') return false;
                            if (typeof n2 === 'undefined') return false;
                            if (typeof eq === 'undefined') return false;
                            if (n1 !== para[0]) return false;
                            if (n2 !== para[1]) return false;
                            if (eq !== para[2]) return false;
                            return true;
                     };
              this.answer_para[index] = [na, nb, na + '+' + nb + '=' + (na + nb)];

              //////////////////
              var ma = this.ran(10, 99);
              var mb = this.ran(100, 999);
              index = this.description.length;
              this.description[index] = [
                     '運動會的計算機挑戰大賽，將以下數學問題',
                     '求得結果寫出算式就可以獲勝',
                     '💡 請用程式協助計算，並寫出算式',
                     '  1. 變數 m1 放 ' + ma,
                     '  2. 變數 m2 放 ' + mb,
                     '  3. 計算 m1 * m2 的結果',
                     '  4. 寫出算式放入變數 eq2 中',
                     '     算式如右 ->  ' + ma + '*' + mb + "=???"
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof m1 === 'undefined') return false;
                            if (typeof m2 === 'undefined') return false;
                            if (typeof eq2 === 'undefined') return false;
                            if (m1 !== para[0]) return false;
                            if (m2 !== para[1]) return false;
                            if (eq2 !== para[2]) return false;
                            return true;
                     };
              this.answer_para[index] = [ma, mb, ma + '*' + mb + '=' + (ma * mb)];

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
