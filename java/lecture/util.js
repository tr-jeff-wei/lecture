const java_data_type = ['int', 'double', 'boolean', 'String', 'char'];
const DT = Object.freeze({ "int": 0, "double": 1, "boolean": 2, "String": 3, "char": 4 });

function get_value(jtype) {
    let val = null;
    switch (jtype) {
        case DT.int:
            val = ranInt(500);
            break;
        case DT.double:
            val = ranInt(5000) / 100;
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

function generate_array(size, max_n) {
    list = [];
    for (let i = 0; i < size; i++) {
        list.push(ranInt(max_n) + 1);
    }
    return list;
}

function array_to_javacode(arr, var_name) {
    str = 'int[] ' + var_name + ' = { ';
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

function ranInt(k) {
    return Math.floor(Math.random() * k);
}

function ranWord() {
    let words = ['hotel', 'tale', 'soup', 'video', 'event', 'desk', 'hat', 'ad', 'lab',
        'girl', 'paper', 'lake', 'hair', 'two', 'chest', 'dad', 'depth', 'meal', 'drama', 'blood',
        'mom', 'child', 'owner', 'oven', 'music', 'shirt', 'unit', 'role', 'mud', 'cell', 'virus',
        'pie', 'woman', 'death', 'debt', 'error', 'movie', 'photo', 'mall',
        'dirt', 'math', 'phone', 'honey', 'city', 'wood', 'salad', 'town', 'art', 'meat', 'wife'
    ];
    return words[ranInt(words.length)];
}

function ranChar() {
    let words = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return words[ranInt(words.length)];
}

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

function check_ans_split_space(elt, ans) {
    //alert(ans);
    let inputElt = elt.parentElement.parentElement.getElementsByTagName('input')[0];
    let v = inputElt.value;
    //alert(v);


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
function build_multi_ans_fields(rootElt, qAnswerArr, exDescArr) {
    let chkElt = document.createElement('div');
    for (let idx = 0; idx < qAnswerArr.length; idx++) {

        let ex = '1,2,3';
        if (exDescArr[idx]) {
            ex = exDescArr[idx];
        }

        chkElt.innerHTML += `
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="ex : ${ex} ">
        <div class="input-group-append">
            <button class="btn btn-info" type="button" onclick="check_ans_split_space(this,'${qAnswerArr[idx]}')" >CHECK</button>
        </div>
        </div>`;
    }
    rootElt.appendChild(chkElt);
}


function build_question(qId, qAnswer, qTitle, qCode, exDesc) {
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

    let codeElt = document.createElement('pre');
    codeElt.setAttribute('class', 'prettyprint lang-java');
    codeElt.textContent = qCode;
    rootElt.appendChild(codeElt);

    let chkElt = document.createElement('div');

    let ex = '1,2,3';
    if (exDesc) {
        ex = exDesc;
    }

    chkElt.innerHTML = `
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="ex : ${ex} ">
      <div class="input-group-append">
<button class="btn btn-info" type="button" onclick="check_ans_split_space(this,'${qAnswer}')" >CHECK</button>
      </div>
    </div>`;
    rootElt.appendChild(chkElt);
}

function build_question_with_table(qId, qAnswer, qTitle, qCode, exDesc, table_arr) {
    let rootElt = document.getElementById(qId);
    let style = document.createElement('style');
    style.innerHTML = `table, th, td {
      border: 1px solid black; border-collapse: collapse;
      text-align: center;
    }
    td{height:20px;}`;
    rootElt.appendChild(style);


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


    let codeElt = document.createElement('pre');
    codeElt.setAttribute('class', 'prettyprint lang-java');
    codeElt.textContent = qCode;
    rootElt.appendChild(codeElt);

    let chkElt = document.createElement('div');

    let ex = '1,2,3';
    if (exDesc) {
        ex = exDesc;
    }

    chkElt.innerHTML = `
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="ex : ${ex} ">
      <div class="input-group-append">
<button class="btn btn-info" type="button" onclick="check_ans_split_space(this,'${qAnswer}')" >CHECK</button>
      </div>
    </div>`;
    rootElt.appendChild(chkElt);
}

function build_question_with_table_tableIdx(qId, qAnswer, qTitle, qCode, exDesc, table_arr) {
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

    let asideItem = document.createElement('aside');
    let hTitle = document.createElement('h2');
    hTitle.textContent = "table[0].length";
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


    let codeElt = document.createElement('pre');
    codeElt.setAttribute('class', 'prettyprint lang-java');
    codeElt.textContent = qCode;
    rootElt.appendChild(codeElt);

    let chkElt = document.createElement('div');

    let ex = '1,2,3';
    if (exDesc) {
        ex = exDesc;
    }

    chkElt.innerHTML = `
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="ex : ${ex} ">
      <div class="input-group-append">
<button class="btn btn-info" type="button" onclick="check_ans_split_space(this,'${qAnswer}')" >CHECK</button>
      </div>
    </div>`;
    rootElt.appendChild(chkElt);
}