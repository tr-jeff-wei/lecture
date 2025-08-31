const java_data_type = ['int', 'double', 'boolean', 'String', 'char'];
const DT = Object.freeze({ "int": 0, "double": 1, "boolean": 2, "String": 3, "char": 4 });
const WORDS = ['hotel', 'tale', 'soup', 'video', 'event', 'desk', 'hat', 'ad', 'lab',
    'girl', 'paper', 'lake', 'hair', 'two', 'chest', 'dad', 'depth', 'meal', 'drama', 'blood',
    'mom', 'child', 'owner', 'oven', 'music', 'shirt', 'unit', 'role', 'mud', 'cell', 'virus',
    'pie', 'woman', 'death', 'debt', 'error', 'movie', 'photo', 'mall',
    'dirt', 'math', 'phone', 'honey', 'city', 'wood', 'salad', 'town', 'art', 'meat', 'wife'
];
const WORDS_GOODORNOT=['nice','ok','happy','fine','best','smart','bad','no','wrong','correct','right','not','yes'];
const ARR_NAME = ['items', 'arr', 'array', 'data', 'scores', 'nums', 'products', 'names'];
const VAR_NAME = ['title', 'note', 's', 'x', 'level', 'ans', 't', 'message', 'name', 'id', 'header', 'data'];
const STR_NAME = ['str', 'text', 'word', 'txt', 't', 'keyword'];
const INT_NAME = ['x', 'y', 'n', 'age', 'weight', 'height', 'size', 'h', 'w', 'no', 'num', 'len', 'count', 'qty', 'cost'];
const VERB_NAME = ['check', 'exam', 'apply', 'find', 'cal', 'look', 'move', 'step', 'go', 'start', 'run', 'scan', 'compute']

const CMP_OP_WORD = ['大於', '大於等於', '小於', '小於等於', '不等於', '等於'];
const CMP_OP_SYM = ['>', '>=', '<', '<=', '!=', '=='];
/**
 * retrive function name
 * @returns caller function name
 */
function getFuncName() {
    return getFuncName.caller.caller.caller.name
}

function transEscapeChar(str) {
    let s = '' + str;
    s = s.replaceAll('"', '@%');
    return s.replaceAll("'", '$#');
}

function get_value(jtype) {
    let val = null;
    switch (jtype) {
        case DT.int:
            val = ranInt(500);
            break;
        case DT.double:
            val = 1 / 100;
            val = ranInt(100) + val;
            break;
        case DT.boolean:
            if (Math.random() > 0.5) {
                val = 'true';
            } else {
                val = 'false';
            }
            break;
        case DT.String:
            val = '"' + ranWord() + '"';
            break;
        case DT.char:
            val = "'" + ranChar() + "'";
            break;
    }
    return val;
}

function generate_norepeat_array(size) {
    let list = [];
    let nlist = [];
    for (let i = 0; i < size; i++) {
        list.push(i);
    }
    for (let i = 0; i < size; i++) {
        let r = ranInt(list.length);
        nlist.push(list.splice(r, 1)[0]);
    }
    return nlist;
}

function generate_norepeat_array2(size) {
    let list = [];
    let nlist = [];
    let n = ranInt(9) + 1;
    for (let i = 0; i < size; i++) {
        list.push(n);
        n = n + ranInt(8) + 1;
    }
    for (let i = 0; i < size; i++) {
        let r = ranInt(list.length);
        nlist.push(list.splice(r, 1)[0]);
    }
    return nlist;
}

function generate_array(size, max_n) {
    list = [];
    for (let i = 0; i < size; i++) {
        list.push(ranInt(max_n) + 1);
    }
    return list;
}

function array_to_javacode(data_type, arr, var_name) {
    let str = `${data_type}[] ${var_name} = { `;
    for (let index = 0; index < arr.length; index++) {
        if (index == 0) {
            str += arr[index];
        } else {
            str += ' , ' + arr[index];
        }
    }
    str += ' };'
    return str;
}

/**
 * 
 * @param {*} var_name 變數名稱
 * @param {*} data_type 產生陣列型別（型別使用型別索引，見 DT）
 * @param {*} size 預計產生的陣列大小
 * @param {*} hide 
 * @param {*} returnList 回傳產生的隨機陣列內容
 * @returns 
 */
function q_array_to_javacode(var_name, data_type, size, hide, returnList) {

    let vs = [];
    for (let i = 0; i < size; i++) {
        let v = get_value(data_type);
        vs.push(v);
        if (returnList != null) {
            returnList.push(v);
        }
    }

    let mark = '?';
    if (hide == false) {
        mark = java_data_type[data_type];
    }

    return array_to_javacode(mark, vs, var_name);
}

function ranInt(k) {
    return Math.floor(Math.random() * k);
}

function ranWord() {
    return WORDS[ranInt(WORDS.length)];
}

function ranArrVarName() {
    return ARR_NAME[ranInt(ARR_NAME.length)];
}

function ranVarName() {
    return VAR_NAME[ranInt(VAR_NAME.length)];
}

function ranStringVarName() {
    return STR_NAME[ranInt(STR_NAME.length)];
}

function ranIntVarName() {
    return INT_NAME[ranInt(INT_NAME.length)];
}

function ranChar() {
    let words = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return words[ranInt(words.length)];
}
/* 
function check_ans(elt, ans) {
    //alert(ans);
    let inputElt = elt.parentElement.parentElement.getElementsByTagName('input')[0];
    let v = inputElt.value;
    //alert(v);

    // var re = /\d+/g; // 只判斷數字
    // var re = /\w+/g; // 判斷文字
    var re = /[\w[\]]+/g; // 判斷文字+[]
    var usr_ans = v.match(re);
    ans = ans.match(re);
    let correct = true;

    if (usr_ans == null) {
        correct = false;
    } else {
        for (let i = 0; i < ans.length; i++) {
            if (ans[i] != usr_ans[i]) {
                correct = false;
                break;
            }
        }
    }
    //alert(correct);
    if (correct) {
        elt.setAttribute('class', 'btn btn-success');
        elt.textContent = ' ✔️ ';
        inputElt.disabled = true;
    } else {
        elt.setAttribute('class', 'btn btn-danger');
        elt.textContent = ' ❌ ';
    }
}
*/

function check_ans_split_space(elt, ans) {
    //alert(ans);
    let inputElt = elt.parentElement.parentElement.getElementsByTagName('input')[0];
    let v = inputElt.value;
    //alert(v);
    v = transEscapeChar(v);

    let correct;
    if (v == null) {
        correct = false;
    } else {
        let tokens = v.split(' ');
        let usr = '';
        let answer = '';
        for (let i = 0; i < tokens.length; i++) {
            usr += tokens[i];
        }
        ans = ans.split(' ');
        for (let i = 0; i < ans.length; i++) {
            answer += ans[i];
        }
        if (usr == answer) {
            correct = true;
        } else {
            correct = false;
        }
    }

    //alert(correct);
    if (correct) {
        elt.setAttribute('class', 'btn btn-success');
        elt.textContent = ' ✔️ ';
        inputElt.disabled = true;
    } else {
        elt.setAttribute('class', 'btn btn-danger');
        elt.textContent = ' ❌ ';
    }

}



/*
rootElt:id 所在元素
qAnswerArr、exDescArr : 必須要是陣列，兩個數量需要一樣
*/
function block_multi_answers(qId, qAnswerArr, exDescArr) {
    let chkElt = document.createElement('div');
    for (let idx = 0; idx < qAnswerArr.length; idx++) {

        let ex = '1,2,3';
        if (exDescArr[idx]) {
            ex = exDescArr[idx];
        }
        let a = transEscapeChar(qAnswerArr[idx]);

        chkElt.innerHTML += `
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder=" ${ex} ">
        <div class="input-group-append">
            <button class="btn btn-info" type="button" data-qfunc="${getFuncName()}" onclick="check_ans_split_space(this,'${a}')" >CHECK</button>
        </div>
        </div>`;
    }
    let rootElt = document.getElementById(qId);
    rootElt.appendChild(chkElt);
}

function block_info(qId, qTitle) {
    let rootElt = document.getElementById(qId);
    let desElt = document.createElement('li');
    desElt.setAttribute('class', 'mb-2');

    let qNo = document.createElement('span');
    qNo.setAttribute('class', 'font-weight-bold text-primary');
    qNo.setAttribute('style', 'margin-right:15px;');
    qNo.textContent = qId;
    desElt.appendChild(qNo);

    let qtitle = document.createElement('span');
    qtitle.textContent = qTitle;
    desElt.appendChild(qtitle);
    rootElt.appendChild(desElt);
}

function block_code(qId, qCode) {
    let codeElt = document.createElement('pre');
    codeElt.setAttribute('class', 'prettyprint lang-java');
    codeElt.textContent = qCode;
    let rootElt = document.getElementById(qId);
    rootElt.appendChild(codeElt);
}


function build_question(qId, qAnswer, qTitle, qCode, exDesc) {
    // basic info
    block_info(qId, qTitle);

    // code
    block_code(qId, qCode);

    // answer
    block_multi_answers(qId, qAnswer, exDesc);
}

function build_question_with_table(qId, qAnswer, qTitle, qCode, exDesc, table_arr) {
    // basic info
    block_info(qId, qTitle);


    let rootElt = document.getElementById(qId);
    let style = document.createElement('style');
    style.innerHTML = `table, th, td {
      border: 1px solid black; border-collapse: collapse;
      text-align: center;
    }
    td{height:20px;}`;
    rootElt.appendChild(style);

    let tableElt = document.createElement('table');
    tableElt.setAttribute('style', 'margin-bottom:12px;');
    let tcontent = '';
    for (let row = 0; row < table_arr.length; row++) {
        tcontent += '<tr>';
        for (let col = 0; col < table_arr[row].length; col++) {
            tcontent += '<td>' + table_arr[row][col] + '</td>';
        }
        tcontent += '</tr>';
    }
    tableElt.innerHTML = tcontent;
    rootElt.appendChild(tableElt);

    // code
    block_code(qId, qCode);

    // answer
    block_multi_answers(qId, qAnswer, exDesc);
}

function build_question_with_table_tableIdx(qId, qAnswer, qTitle, qCode, exDesc, table_arr) {

    // basic info
    block_info(qId, qTitle);


    let rootElt = document.getElementById(qId);
    let style = document.createElement('style');
    style.innerHTML = `table, th, td {
      border: 1px solid black; border-collapse: collapse;
      text-align: center;
    }
    td{height:20px;}
    .tIdxU{
        border-top: hidden;
        border-left: hidden;
        border-right: hidden;
    }
    .tIdxL{
        border-top: hidden;
        border-left: hidden;
        border-bottom: hidden;
    }
    aside {
        display: block;
        position: relative;
        margin: 30px 0;
    }
      
    aside h3 {
        font: bold 16px Sans-Serif;
        letter-spacing: 2px;
        /*background: #369;*/
        color: #3471eb;
        padding: 5px 10px;
        margin: 0 0 10px 0;
        line-height: 24px;
        position: absolute;
        top: 0;
        left: 0;
/* Rotate from top left corner (not default) */
        transform-origin: 0 0;
        transform: rotate(90deg);
      }
      aside h2 {
        font: bold 16px Sans-Serif;
        letter-spacing: 2px;
        /*background: #369;*/
        color: #3471eb;
        padding: 5px 10px;
        margin: 0 0 10px 0;
        line-height: 24px;
        position: absolute;
        top: -25px;
        left: 0;
/* Rotate from top left corner (not default) */
        transform-origin: 0 0;        
      }
      
      /* Class name via Modernizr */
      .csstransforms aside {
        border-left: 34px solid #369;
        padding-left: 10px;
      }
      .csstransforms aside h3 {
        /* Abs positioning makes it not take up vert space */
        position: absolute;
        top: 0;
        left: 0;
      
        /* Border is the new background */
        background: none;
      
        /* Rotate from top left corner (not default) */
        transform-origin: 0 0;
        transform: rotate(90deg);
      }
    `;
    rootElt.appendChild(style);




    let asideItem = document.createElement('aside');
    let hTitle = document.createElement('h2');
    hTitle.textContent = "table[i].length";
    let vTitle = document.createElement('h3');
    vTitle.textContent = "table.length";
    let tableElt = document.createElement('table');
    tableElt.setAttribute('style', 'margin-bottom:12px;');
    let tcontent = '';
    for (let row = 0; row <= table_arr.length; row++) {
        tcontent += '<tr>';
        for (let col = 0; col <= table_arr[0].length; col++) {
            if (row == 0) {
                if (col == 0) {
                    tcontent += '<td class="tIdxU"></td>';
                } else {
                    tcontent += '<td class="tIdxU"> ' + (col - 1) + ' </td>';
                }
                continue;
            }
            if (col == 0) {
                tcontent += '<td class="tIdxL"> ' + (row - 1) + ' </td>';
                continue;
            }
            tcontent += '<td>' + table_arr[row - 1][col - 1] + '</td>';
        }
        tcontent += '</tr>';
    }
    tableElt.innerHTML = tcontent;
    asideItem.appendChild(vTitle);
    asideItem.appendChild(hTitle);
    asideItem.appendChild(tableElt);
    rootElt.appendChild(asideItem);

    // code
    block_code(qId, qCode);

    // answer
    block_multi_answers(qId, qAnswer, exDesc);
}




////////////////////////////////////////////////
//////////// Test function and codes
////////////////////////////////////////////////

/**
 * test function name
 */
function test_qfunc() {
    console.log('============ test button function name===========================')
    let its = $('ul div div div button');
    let table = [];
    for (let i = 0; i < its.length; i++) {
        let k = its[i].dataset.qfunc;
        let c = 0;
        if (its[i].textContent.trim() == '✔️') {
            c++;
            if (table[k] == undefined) {
                table[k] = 1;
            } else {
                table[k]++;
            }
        }
        // console.log(its[i].dataset.qfunc+"  "+its[i].textContent.trim());
    }
    let lecture = $('h3.mb-5')[0].textContent.trim();
    console.log(lecture);
    //console.log( table ) ;


    console.log('============ test button function name===========================')
}