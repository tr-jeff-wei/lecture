import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    set,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmVDza9Tt3haQdA1aTgwgcSbe_Eiee7kU",
    authDomain: "studentlog-76b1d.firebaseapp.com",
    databaseURL:
        "https://studentlog-76b1d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studentlog-76b1d",
    storageBucket: "studentlog-76b1d.appspot.com",
    messagingSenderId: "309791375862",
    appId: "1:309791375862:web:c670c29108b35a0634c7d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

const dbRef = ref(getDatabase());


const fun_map = {
    cond_digit_1: "Condition:digit",
    fun_q_1: "Function:input type",
    var_q1: "Variable:type",
    q0a: "1DArray:array type",
    q0b: "1DArray:create array",
    q1_g_a: "1DArray:iterate for loop",
    qb0: "2DArray:create array",
    qb1: "2DArray:one spot (r,c)(3)",
    qb2: "2DArray:iter one row/col",
    qb7: "1DArray:max/min(10)",
    s1: "x.length()", // string
    s2: "x.indexOf(?)",
    s3: "x.substring(?,?)"
}

function getData() {
    get(child(dbRef, `practice_log`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                let my_data = snapshot.val();
                let finallist = [];
                for (let name in my_data) {
                    for (let md in my_data[name]) {
                        //console.log('md >> '+md) ;
                        for (let tstamp in my_data[name][md]) {
                            let dt = new Date();
                            dt.setTime(tstamp);
                            //console.log("==> "+tstamp) ;
                            let dd = my_data[name][md][tstamp];
                            let map_str = fun_map[dd.func];
                            if (map_str == undefined) {
                                map_str = dd.func;
                            }
                            let result = [dt.toLocaleDateString() + " " + dt.toLocaleTimeString(), dd.student, dd.lang, dd.lecture, map_str, dd.count];
                            finallist.push(result);
                        }
                    }
                }

                console.log(finallist);



                $(document).ready(function () {
                    $('#my_table').DataTable({
                        "order": [[0, "desc"]],
                        data: finallist,
                        columns: [
                            { title: "Time" },
                            { title: "Name" },
                            { title: "Lang." },
                            { title: "Lecture" },
                            { title: "Function" },
                            { title: "Count" }
                        ]
                    });
                });
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
function writeData(usr, lang, lecture, func, score) {
    let d = new Date();
    let st = d.getTime();
    let ymd =
        d.getFullYear() +
        "_" +
        (d.getMonth() + 1) +
        "_" +
        d.getDate();
    set(ref(database, `practice_log/${usr}/${ymd}/${st}`), {
        student: usr,
        lang: lang,
        lecture: lecture,
        func: func,
        count: score,
    });
}
// writeData();
// writeData('jeff2','cpp','variable','test_fun' , 17);

function uploadScore() {

    let language = 'java';

    let its = $('ul div div div button');
    if( its.length<1){
        its = $('button.btn-info');
    }
    let table = [];
    for (let i = 0; i < its.length; i++) {
        let k = its[i].dataset.qfunc;
        if (its[i].textContent.trim() == '✔️') {
            if (table[k] == undefined) {
                table[k] = 1;
            } else {
                table[k]++;
            }
        }
        console.log(its[i].dataset.qfunc+"  "+its[i].textContent.trim());
    }
    let lecture = $('h3.mb-5')[0].textContent.trim();
    //console.log( table ) ;
    let hasData = false;
    for (let tk in table) {
        hasData = true;
        // console.log('  >> '+tk+"   "+table[tk]);
        break;
    }

    if (hasData == true) {
        let d = new Date();
        let msg = '作業成績上傳，請輸入姓名。 ' + d.toLocaleDateString() + d.toLocaleTimeString()
        let uname = window.prompt(msg);
        let yes = window.confirm('您的姓名是「' + uname + '」，點「確定」上傳。若有錯誤，請重新操作。');
        if (yes) {
            for (let tk in table) {
                writeData(uname, language, lecture, tk, table[tk]);
                // console.log('  >> '+tk+"   "+table[tk]);

            }
            alert('上傳完成！');
        }
    } else {
        alert('並無完成內容上傳！');
    }
}

export default { uploadScore, getData };