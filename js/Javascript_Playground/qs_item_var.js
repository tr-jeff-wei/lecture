class QItem_var {
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
       }

       qs01() {
              var index = this.description.length;

              var veg = this.ran(50, 100);
              var pk = this.ran(150, 200);
              var ft = this.ran(50, 100);

              this.description[index] = [
                     '小智幫媽媽出門買菜，買了： ',
                     '  a. 蔬菜： ' + veg + ' 元     b. 豬肉：' + pk + ' 元 ',
                     '  c. 水果： ' + ft + ' 元',
                     '💡 請用程式計算出花費多少錢',
                     '  1. 變數 vegetable 放［蔬菜］的價錢',
                     '  2. 變數 pork 放［豬肉］的價錢',
                     '  3. 變數 fruit 放［水果］的價錢',
                     '  4. 變數 total 放全部加起來的價錢'
              ];

              this.answer_fun[index] =
                     function(para) {
                            if (typeof vegetable === 'undefined') return false;
                            if (typeof pork === 'undefined') return false;
                            if (typeof fruit === 'undefined') return false;
                            if (typeof total === 'undefined') return false;
                            if (pork !== para[1]) return false;
                            if (vegetable !== para[0]) return false;
                            if (fruit !== para[2]) return false;
                            if (total !== (para[0] + para[1] + para[2])) return false;
                            return true;
                     };

              this.answer_para[index] = [veg, pk, ft];
              //////////////////////////////////////////////////////////////////////

              index = this.description.length;
              var m = this.ran(1000, 2000);
              var ans = m - veg - pk - ft;
              this.description[index] = [
                     '小智錢包帶了 ' + m + ' 元，買了上題的東西，',
                     '剩下多少錢？',
                     '💡 請用程式計算出花費多少錢',
                     '  1. 變數 money 放［錢包］的錢',
                     '  2. 用減法扣掉買的東西',
                     '  3. 把最後的錢放進 money'
              ];

              this.answer_fun[index] = function(para) {
                     if (typeof money === 'undefined') return false;
                     if (money !== para[0]) return false;
                     return true;
              };

              this.answer_para[index] = [ans];
       }

       qs02() {
              var index = this.description.length;
              // this.answer_para[0]=[
              var t1 = this.ran(30, 100);
              var t2 = this.ran(30, 100);
              var t3 = this.ran(30, 100);

              this.description[index] = [
                     '小智到了商場，看到 3 個很喜歡的玩具模型，',
                     '媽媽獎勵小智可以挑選兩個加起來最便宜的。',
                     '  a. 寶可夢球： ' + t1 + ' 元     b. 機器戰士：' + t2 + ' 元 ',
                     '  c. 跑車模型： ' + t3 + ' 元',
                     '💡 請用程式計算出兩個兩個加起來的價錢',
                     '  1. 自己建立三個變數放三個玩具的價錢',
                     '  2. 變數 g1 放第一個組合',
                     '  3. 變數 g2 放第二個組合',
                     '  4. 變數 g3 放第三個組合',
                     '  5. 變數 min 放最少的組合價錢'
              ];
              var m = Math.min(t1 + t2, t2 + t3);
              m = Math.min(m, t3 + t1);
              this.answer_para[index] = [t1 + t2, t2 + t3, t3 + t1, m];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof g1 === 'undefined') return false;
                            if (typeof g2 === 'undefined') return false;
                            if (typeof g3 === 'undefined') return false;
                            if (typeof min === 'undefined') return false;
                            if (para[3] !== min) return false;
                            // 檢查完 min 把 min 的遮起來，去檢查剩下的 3 個，
                            // 因為 para[3] 會跟前面有重複，用 indexOf 會有機會取到 min
                            para[3] = -1;
                            // 0+1+2
                            if (para.indexOf(g1) + para.indexOf(g2) + para.indexOf(g3) !== 3) return false;
                            return true;
                     };

       }

       qs03() {

              var index = this.description.length;

              var n1 = this.ran(100000, 1000000);
              var n2 = this.ran(100, 1000);

              this.description[index] = [
                     '瘋狂老師出了一個超級難的乘法問題給小智',
                     '，老師問 ' + n1 + ' 的 ' + n2 + '倍是多少？',
                     '💡 請用程式幫小智計算出答案',
                     '  1. 變數 n1 放第一個數字',
                     '  2. 變數 n2 放幾倍',
                     '  3. 變數 ans 放答案'
              ];

              this.answer_para[index] = [n1, n2, n1 * n2];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof n1 === 'undefined') return false;
                            if (typeof n2 === 'undefined') return false;
                            if (typeof ans === 'undefined') return false;
                            if (para[0] !== n1) return false;
                            if (para[1] !== n2) return false;
                            if (para[2] !== ans) return false;

                            return true;
                     };

       }

       qs04() {

              var index = this.description.length;

              var pu = this.ran(3, 9);
              var pe = this.ran(100, 1000);

              this.description[index] = [
                     '學校的校長決定在校慶請全校吃泡芙 ',
                     '如果每個人給 ' + pu + ' 個，全校有 ' + pe + ' 人',
                     '請問校長要準備多少泡芙？',
                     '💡 請用程式幫校長計算出答案',
                     '  1. 變數 puff 放每個人的泡芙數量',
                     '  2. 變數 p 放有幾個人',
                     '  3. 變數 ans 放答案'
              ];

              this.answer_para[index] = [pu, pe, pu * pe];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof puff === 'undefined') return false;
                            if (typeof p === 'undefined') return false;
                            if (typeof ans === 'undefined') return false;
                            if (para[0] !== puff) return false;
                            if (para[1] !== p) return false;
                            if (para[2] !== ans) return false;

                            return true;
                     };

       }

       qs05() {

              var index = this.description.length;

              var i_trash = this.ran(20, 50);
              var i_clean = this.ran(100, 120);
              var i_poster = this.ran(200, 300);

              var time_trash = this.ran(1, 3);
              var time_clean = this.ran(1, 3);
              var time_poster = this.ran(1, 3);

              this.description[index] = [
                     '小智暑假想要靠自己的力氣賺取零用錢，於是跟爸爸',
                     '媽媽協議幫忙下列工作。列出每一個小時可以賺得零',
                     '用錢。與準備進行的時間。',
                     'a. 分類垃圾：$' + i_trash + ' (' + time_trash + '小時)  b. 打掃環境：$' + i_clean + ' (' + time_clean + '小時)',
                     'c. 設計海報：$' + i_poster + ' (' + time_poster + '小時)',
                     '💡 請用程式幫小智做以下紀錄',
                     '  1. 變數 trash 紀錄〔分類垃圾〕的錢',
                     '  2. 變數 clean 紀錄〔打掃環境〕的錢',
                     '  3. 變數 poster 紀錄〔設計海報〕的錢',
                     '  4. 變數 trash_hrs 紀錄〔分類垃圾〕的時間',
                     '  5. 變數 clean_hrs 紀錄〔打掃環境〕的時間',
                     '  6. 變數 poster_hrs 紀錄〔設計海報〕的時間',
              ];

              this.answer_para[index] = [ i_trash, i_clean, i_poster, time_trash, time_clean, time_poster];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof trash === 'undefined') return false;
                            if (typeof clean === 'undefined') return false;
                            if (typeof poster === 'undefined') return false;
                            if (typeof trash_hrs === 'undefined') return false;
                            if (typeof clean_hrs === 'undefined') return false;
                            if (typeof poster_hrs === 'undefined') return false;
                            if (para[0] !== trash) return false;
                            if (para[1] !== clean) return false;
                            if (para[2] !== poster) return false;
                            if (para[3] !== trash_hrs) return false;
                            if (para[4] !== clean_hrs) return false;
                            if (para[5] !== poster_hrs) return false;

                            return true;
                     };


              ////////////////////////////////////////////////////
              ////////////////////////////////////////////////////
              index = this.description.length;

              this.description[index] = [
                     '請問小智一天，可以賺取多少零用錢？',
                     '💡 請用程式幫小智做計算',
                     ' 1. 運用剛剛紀錄的資訊，算個別工作的金額',
                     '         trash x trash_hrs',
                     '         clean x clean_hrs',
                     '        poster x poster_hrs',
                     '    再全部加起來算出一天賺取的錢',
                     '    放在變數 a_day_money'
              ];
              var aDayTotalMoney = time_trash * i_trash +
                     time_clean * i_clean + time_poster * i_poster;

              this.answer_para[index] = [aDayTotalMoney];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof a_day_money === 'undefined') return false;
                            if (para[0] !== a_day_money) return false;

                            return true;
                     };

              ////////////////////////////////////////////////////
              ////////////////////////////////////////////////////
              index = this.description.length;

              var days = this.ran(1, 15);

              this.description[index] = [
                     '小智連續做 ' + days + ' 天，請問總共花了多少小時？',
                     '💡 請用程式幫小智做計算',
                     ' 1. 運用  trash_hrs , clean_hrs , poster_hrs',
                     '     全部加起來，先算出 1 天做多少小時',
                     '     放在變數 a_day',
                     ' 2. 將 a_day 乘以天數，放在變數 total_hrs'
              ];
              var a_day_total = time_trash + time_clean + time_poster;
              this.answer_para[index] = [a_day_total, a_day_total * days];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof a_day === 'undefined') return false;
                            if (typeof total_hrs === 'undefined') return false;
                            if (para[0] !== a_day) return false;
                            if (para[1] !== total_hrs) return false;

                            return true;
                     };


       }

       qs06() {

              var index = this.description.length;

              var p = this.ran(20, 50);
              var ori = this.ran(100, 200);

              this.description[index] = [
                     '小智錢包有 ' + ori + ' 元',
                     '每一科考試滿分可以獲得獎學金 ' + p + ' 元',
                     '這次月考有 3 科拿到滿分，請問小智錢包',
                     '最後有多少錢？',
                     '💡 請用程式計算錢包有多少錢？',
                     '  1. 先取變數 pocket 放入 ' + ori + ' 元',
                     '  2. 運用加起來再放回的技巧，操作三次',
                     '      得到最後的價錢：    pocket = pocket+' + p

              ];

              this.answer_para[index] = [ori + 3 * p];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof pocket === 'undefined') return false;
                            if (para[0] !== pocket) return false;
                            return true;
                     };

              ///////////////////////////////////////////////////////////////////
              ///////////////////////////////////////////////////////////////////


              index = this.description.length;

              var t = ori + 3 * p;
              var i1 = this.ran(10, 50);
              var i2 = this.ran(10, 50);
              var i3 = this.ran(10, 50);
              t = t - (i1 + i2 + i3);

              this.description[index] = [
                     '小智回家拿出他的錢包（pocket）去買文具',
                     '買筆花了 ' + i1 + ' 元，買筆記本用了 ' + i2 + ' 元',
                     '買圓規花了 ' + i3 + ' 元，最後有剩多少錢？',
                     '💡 請用程式計算錢包還有多少錢',
                     '  1. 取變數 pocket 運用扣掉再放回的技巧',
                     '      ex.   pocket = pocket - ??'

              ];

              this.answer_para[index] = [t];
              this.answer_fun[index] =
                     function(para) {
                            if (typeof pocket === 'undefined') return false;
                            if (para[0] !== pocket) return false;
                            return true;
                     };
       }

       ran(start, end) {
              var diff = end - start;
              return Math.floor(Math.random() * (diff + 1)) + start;
       }
}
