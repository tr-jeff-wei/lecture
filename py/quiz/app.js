"use strict";

const STORAGE_KEY = "python-practice-room-v1";

const topics = [
  { id: "functions", icon: "ƒ", label: "函式輸出", badge: "FUNCTIONS", title: "預測函式執行結果", tipTitle: "先讀定義，再看呼叫", tip: "函式被呼叫時，先把參數代入，再一步一步計算 return 的結果。" },
  { id: "trace", icon: "↳", label: "函式追蹤", badge: "TRACE", title: "追蹤函式之間的傳遞", tipTitle: "把每個變數寫下來", tip: "依序計算 d、e、f。每個函式回傳的值，會成為下一步的輸入。" },
  { id: "range", icon: "↗", label: "range() 練習", badge: "RANGE", title: "熟悉 range 的不同寫法", tipTitle: "留意參數代表的意義", tip: "range(stop) 從 0 開始；range(start, stop) 的 step 預設為 1。" },
  { id: "list", icon: "▤", label: "List 與 range", badge: "LIST · RANGE", title: "追蹤串列如何建立", tipTitle: "range 的 stop 不會被取到", tip: "range(start, stop, step) 從 start 開始，每次加上 step，直到小於 stop。" },
  { id: "list2", icon: "⌗", label: "List 索引與長度", badge: "LIST · INDEX", title: "讀取串列長度與索引", tipTitle: "索引從 0 開始", tip: "串列第一個元素在 mylist[0]。len(mylist) 則是元素的總數。" },
  { id: "list-calc", icon: "∑", label: "List 加總與極值", badge: "LIST · LOOP", title: "用 for 計算串列範圍", tipTitle: "先確定走訪的索引", tip: "隨機設定左、右界線，for 迴圈會走訪兩個索引之間的元素，包含左右界線；range 的 stop 要設為右界索引加 1。" },
  { id: "condition", icon: "◇", label: "List 與 if", badge: "LIST · IF", title: "依條件轉換串列元素", tipTitle: "逐一檢查每個元素", tip: "for 迴圈每次取出一個元素，再依 if 條件決定要放進哪個結果。" }
];

const defaults = { correct: 0, wrong: 0, streak: 0, attemptedToday: 0, date: "", mistakes: [] };
let stats = loadStats();
let activeTopic = "functions";
let currentQuestion = null;
let answered = false;
let questionCount = 0;
let currentView = "practice";

const $ = (selector) => document.querySelector(selector);
const nav = $("#topic-nav");

function emptyCategoryStats() {
  return Object.fromEntries(topics.map((topic) => [topic.id, { attempted: 0, wrong: 0 }]));
}

function todayDate() {
  return new Date().toLocaleDateString("en-CA");
}

function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const today = todayDate();
    const categoryStats = emptyCategoryStats();
    for (const topic of topics) {
      const savedCategory = saved.categoryStats?.[topic.id];
      if (savedCategory && Number.isInteger(savedCategory.attempted) && Number.isInteger(savedCategory.wrong)) {
        categoryStats[topic.id] = { attempted: savedCategory.attempted, wrong: savedCategory.wrong };
      }
    }
    return {
      ...defaults,
      ...saved,
      categoryStats,
      mistakes: Array.isArray(saved.mistakes) ? saved.mistakes : [],
      attemptedToday: saved.date === today ? (saved.attemptedToday || 0) : 0,
      date: today
    };
  } catch {
    return { ...defaults, categoryStats: emptyCategoryStats(), date: todayDate() };
  }
}

function saveStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(items) {
  return items[randomInt(0, items.length - 1)];
}

function pythonList(items) {
  return `[${items.map((item) => typeof item === "string" ? `'${item}'` : item).join(", ")}]`;
}

function renderCode(source) {
  const escaped = source.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]);
  return escaped
    .replace(/(#.*)$/gm, '<span class="comment">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>')
    .replace(/\b(def|return|for|in|if|else|range|print)\b/g, '<span class="kw">$1</span>')
    .replace(/\b(fa|fb|fc|append|len)\b/g, '<span class="fn">$1</span>')
    .replace(/\b\d+\b/g, '<span class="num">$&</span>');
}

function makeFunctionQuestion() {
  const first = randomInt(2, 8);
  const second = randomInt(1, 7);
  const third = randomInt(1, 6);
  const operation = pick(["+", "*", "-"]);
  const nextOperation = pick(["+", "*", "-"]);
  const expression = `${first} ${operation} x ${nextOperation} ${third}`;
  const x = randomInt(2, 7);
  const answer = calculate(first, operation, x, nextOperation, third);
  const source = `def double(x):\n    return x * 2\n\ndef calculate(x):\n    return ${expression}\n\nresult = calculate(${x})\nprint(result)\nprint(double(result))`;
  return {
    source,
    fields: [{ label: "第 1 行輸出", placeholder: "輸入整數" }, { label: "第 2 行輸出", placeholder: "輸入整數" }],
    answers: [String(answer), String(answer * 2)],
    explanation: `先代入 x = ${x}：calculate(${x}) = ${first} ${operation} ${x} ${nextOperation} ${third} = ${answer}，再計算 double(${answer}) = ${answer * 2}。`,
    hint: "先把呼叫時的引數代入 x，再依照運算子優先順序計算。"
  };
}

function calculate(first, operation, x, nextOperation, last) {
  if (nextOperation === "*" && operation !== "*") {
    const right = x * last;
    return operation === "+" ? first + right : first - right;
  }
  const left = operation === "+" ? first + x : operation === "*" ? first * x : first - x;
  return nextOperation === "+" ? left + last : nextOperation === "*" ? left * last : left - last;
}

function makeTraceQuestion() {
  const test = randomInt(1, 10);
  const d = test > 5 ? test - 5 : 2 * test;
  const e = d + 3;
  const f = e > 7 ? e : 7;
  return {
    source: `def fa(x):\n    if x > 5:\n        return x - 5\n    else:\n        return 2 * x\n\ndef fb(v):\n    for i in range(3):\n        v = v + 1\n    return v\n\ndef fc(a):\n    if a > 7:\n        return a\n    else:\n        return 7\n\ntest = ${test}\nd = fa(test)\ne = fb(d)\nf = fc(e)\nprint(d, e, f)`,
    fields: [{ label: "輸出 d、e、f（以空格分隔）", placeholder: "例如：6 9 9" }],
    answers: [`${d} ${e} ${f}`],
    explanation: `fa(${test}) 得到 d = ${d}；fb 迴圈加 1 三次，得到 e = ${e}；fc(${e}) 得到 f = ${f}。`,
    hint: "依序算 fa(test)、fb(d)、fc(e)。fb 會把輸入值加 1 三次。"
  };
}

function makeListQuestion(withExtras) {
  const a = randomInt(1, 10);
  const b = randomInt(1, 10);
  const c = randomInt(1, 10);
  const start = randomInt(1, 5);
  const stop = randomInt(6, 15);
  const step = randomInt(2, 4);
  const list = [c];
  for (let value = start; value < stop; value += step) list.push(value);
  list.push(b);
  let indexQuestion = null;
  if (withExtras) {
    indexQuestion = { qa: randomInt(0, list.length - 1), qb: randomInt(0, list.length - 1) };
  }
  const source = `a = ${a}\nb = ${b}\nc = ${c}\nmylist = []\nmylist.append(c)\nfor i in range(${start}, ${stop}, ${step}):\n    mylist.append(i)\nmylist.append(b)\n\nprint(mylist)${withExtras ? `\nprint(len(mylist))\nprint(mylist[${indexQuestion.qa}] + mylist[${indexQuestion.qb}])` : ""}`;
  const fields = [{ label: "mylist 的完整內容", placeholder: "例如：[5, 1, 4, 7, 3]", note: "請使用中括號，將串列元素依序列出。" }];
  const answers = [JSON.stringify(list)];
  let explanation = `先放入 c = ${c}，range(${start}, ${stop}, ${step}) 產生 ${list.slice(1, -1).join(", ") || "沒有數字"}，最後放入 b = ${b}。`;
  let hint = "先加入 c，再列出 range 產生的數字，最後加入 b。";
  if (withExtras) {
    const { qa, qb } = indexQuestion;
    fields.push({ label: "len(mylist)", placeholder: "輸入元素個數" });
    fields.push({ label: `mylist[${qa}] + mylist[${qb}]`, placeholder: "輸入加總" });
    answers.push(String(list.length), String(list[qa] + list[qb]));
    explanation += `串列共有 ${list.length} 個元素；索引 ${qa} 與 ${qb} 的值分別為 ${list[qa]} 和 ${list[qb]}，相加為 ${list[qa] + list[qb]}。`;
    hint = "先寫出完整串列。索引由 0 開始，len 是元素數量。";
  }
  return { source, fields, answers, explanation, hint };
}

function makeListCalculationQuestion() {
  const list = Array.from({ length: randomInt(5, 10) }, () => randomInt(1, 20));
  const operation = pick(["sum", "max", "min"]);
  const lBoundary = randomInt(0, Math.floor(list.length / 2) );
  const rBoundary = randomInt(lBoundary + 1, list.length - 1);      
  const values = list.slice(lBoundary, rBoundary + 1);
  const answer = operation === "sum"
    ? values.reduce((total, value) => total + value, 0)
    : operation === "max"
      ? Math.max(...values)
      : Math.min(...values);
  const operationDetails = {
    sum: {
      label: "加總",
      initialization: "total = 0",
      update: "        total += mylist[i]",
      output: "total",
      explanation: `${values.join(" + ")} = ${answer}`
    },
    max: {
      label: "最大值",
      initialization: `largest = 0`,
      update: "        if mylist[i] > largest:\n            largest = mylist[i]",
      output: "largest",
      explanation: `走訪的數值為 ${values.join(", ")}，最大值是 ${answer}`
    },
    min: {
      label: "最小值",
      initialization: `smallest = 99`,
      update: "        if mylist[i] < smallest:\n            smallest = mylist[i]",
      output: "smallest",
      explanation: `走訪的數值為 ${values.join(", ")}，最小值是 ${answer}`
    }
  }[operation];
  const loopStart =  lBoundary;
  const loopRange = `range(${loopStart}, ${rBoundary + 1})`;
  const source = `mylist = ${pythonList(list)}\n${operationDetails.initialization}\nfor i in ${loopRange}:\n${operationDetails.update}\nprint(${operationDetails.output})`;
  const boundaryDescription = `從左界索引 ${lBoundary} 走訪到右界索引 ${rBoundary}`;
  return {
    source,
    fields: [{ label: `走訪計算後的${operationDetails.label}`, placeholder: "輸入整數" }],
    answers: [String(answer)],
    explanation: `${boundaryDescription}，包含界線位置；走訪的數值為 ${values.join(", ")}。${operationDetails.explanation}。`,
    hint: `先確認 for 迴圈會走訪哪些索引，再依序${operationDetails.label}對應的串列元素。`
  };
}

function makeConditionQuestion() {
  const condition = pick([
    { operator: "==", description: "等於" },
    { operator: "!=", description: "不等於" },
    { operator: ">", description: "大於" },
    { operator: "<", description: "小於" }
  ]);
  const target = randomInt(2, 10);
  const values = Array.from({ length: 5 }, () => randomInt(1, 12));
  const matchingIndex = randomInt(0, values.length - 1);
  const otherIndex = (matchingIndex + 1) % values.length;
  if (condition.operator === "==") {
    values[matchingIndex] = target;
    values[otherIndex] = target + 1;
  } else if (condition.operator === "!=") {
    values[matchingIndex] = target;
    values[otherIndex] = target + 1;
  } else if (condition.operator === ">") {
    values[matchingIndex] = target + 1;
    values[otherIndex] = target;
  } else {
    values[matchingIndex] = target - 1;
    values[otherIndex] = target;
  }
  const matches = (value) => {
    if (condition.operator === "==") return value === target;
    if (condition.operator === "!=") return value !== target;
    if (condition.operator === ">") return value > target;
    return value < target;
  };
  const result = values.map((value) => matches(value) ? 1 : 0);
  return {
    source: `mylist = ${pythonList(values)}\npaper = []\nfor x in mylist:\n    if x ${condition.operator} ${target}:\n        paper.append(1)\n    else:\n        paper.append(0)\nprint(paper)`,
    fields: [{ label: "paper 的完整內容", placeholder: "例如：[0, 1, 0]", note: "請使用中括號，將元素依序列出。" }],
    answers: [JSON.stringify(result)],
    explanation: `逐一檢查 ${pythonList(values)}：${condition.description} ${target} 的位置放入 1，不符合的位置放入 0，所以 paper = ${pythonList(result)}。`,
    hint: `逐一查看 mylist，判斷每個數字是否${condition.description} ${target}。符合條件放入 1，不符合放入 0。`
  };
}

function makeRangeQuestion() {
  // const type = randomInt(1, 4);
  let type = 3;
  if (type === 1) {
    const stop = randomInt(2, 10);
    return {
      source: `# 將 range(${stop}) 改寫成 range(start, stop)\nfor i in range(?, ?):\n    print(i)`,
      fields: [{ label: "填入 start, stop", placeholder: "以逗號分隔，例如：0, 3" }],
      answers: [`0,${stop}`],
      explanation: `range(${stop}) 的 start 預設為 0，改寫為 range(0, ${stop})。`,
      hint: "range(stop) 的起點預設是 0。"
    };
  }
  if (type === 2) {
    const start = randomInt(0, 5);
    const stop = randomInt(start + 2, start + 10);
    return {
      source: `# 補上 range(${start}, ${stop}) 的預設 step\nfor i in range(?, ?, ?):\n    print(i)`,
      fields: [{ label: "填入 start, stop, step", placeholder: "以逗號分隔，例如：2, 5, 1" }],
      answers: [`${start},${stop},1`],
      explanation: `range(${start}, ${stop}) 的 step 預設為 1，完整寫法是 range(${start}, ${stop}, 1)。`,
      hint: "兩個參數的 range，step 預設為 1。"
    };
  }
  if (type === 3) {
    const start = randomInt(0, 5);
    const step = randomInt(2, 4);
    const stop = start + step * randomInt(2, 4) + randomInt(0, step - 1);
    const values = Array.from({ length: Math.ceil((stop - start) / step) }, (_, index) => start + index * step).filter((value) => value < stop);
    const askNumbers = Math.random() < 0.5;
    return {
      source: `for i in range(${start}, ${stop}, ${step}):\n    print(i)`,
      fields: [{ label: askNumbers ? "range 產生的數字" : "for 會重複幾次", placeholder: askNumbers ? "以逗號分隔，例如：2, 5, 8" : "輸入次數" }],
      answers: [askNumbers ? values.join(",") : String(values.length)],
      explanation: `從 ${start} 開始，每次加 ${step}，只取小於 ${stop} 的數字：${values.join(", ")}，共 ${values.length} 個。`,
      hint: "從 start 開始反覆加 step；stop 本身不會包含在結果中。"
    };
  }
  const start = randomInt(0, 5);
  const stop = randomInt(start + 1, start + 6);
  const word = pick(["hi", "hello", "python", "apple"]);
  return {
    source: `for i in range(${start}, ${stop}):\n    print('${word}')`,
    fields: [{ label: `會印出幾個 '${word}'？`, placeholder: "輸入次數" }],
    answers: [String(stop - start)],
    explanation: `range(${start}, ${stop}) 會經過 ${start} 到 ${stop - 1}，共 ${stop - start} 次。`,
    hint: "step 預設為 1；次數等於 stop - start。"
  };
}

function buildQuestion(topicId) {
  if (topicId === "functions") return makeFunctionQuestion();
  if (topicId === "trace") return makeTraceQuestion();
  if (topicId === "list") return makeListQuestion(false);
  if (topicId === "list2") return makeListQuestion(true);
  if (topicId === "list-calc") return makeListCalculationQuestion();
  if (topicId === "condition") return makeConditionQuestion();
  return makeRangeQuestion();
}

function renderTopics() {
  nav.innerHTML = topics.map((topic) => `
    <button class="topic-link${currentView === "practice" && topic.id === activeTopic ? " active" : ""}" type="button" data-topic="${topic.id}" aria-label="${topic.label}" title="${topic.label}" aria-current="${currentView === "practice" && topic.id === activeTopic ? "page" : "false"}">
      <span class="topic-icon" aria-hidden="true">${topic.icon}</span><span class="topic-name">${topic.label}</span><span class="nav-arrow" aria-hidden="true">›</span>
    </button>`).join("") + `
    <button class="topic-link statistics-nav${currentView === "statistics" ? " active" : ""}" type="button" data-view="statistics" aria-label="練習統計" title="練習統計" aria-current="${currentView === "statistics" ? "page" : "false"}">
      <span class="topic-icon" aria-hidden="true">▥</span><span class="topic-name">練習統計</span><span class="nav-arrow" aria-hidden="true">›</span>
    </button>`;
}

function renderStats() {
  const total = stats.correct + stats.wrong;
  $("#correct-total").textContent = stats.correct;
  $("#accuracy-rate").textContent = total ? `答題正確率 ${Math.round((stats.correct / total) * 100)}%` : "開始你的第一次練習";
  $("#streak-count").textContent = stats.streak;
  const daily = Math.min(stats.attemptedToday, 5);
  $("#daily-count").textContent = `${daily} / 5 題`;
  $("#daily-progress").style.width = `${daily * 20}%`;
  renderStatistics();
}

function renderStatistics() {
  const rows = topics.map((topic) => {
    const category = stats.categoryStats[topic.id] || { attempted: 0, wrong: 0 };
    const correct = category.attempted - category.wrong;
    const accuracy = category.attempted ? `${Math.round((correct / category.attempted) * 100)}%` : "—";
    return `<tr><th scope="row"><span class="category-dot dot-${topic.id}"></span>${escapeHtml(topic.label)}</th><td>${category.attempted}</td><td><span class="${category.wrong ? "wrong-count" : "zero-count"}">${category.wrong}</span></td><td>${correct}</td><td>${accuracy}</td></tr>`;
  });
  const categorizedAttempts = Object.values(stats.categoryStats).reduce((sum, category) => sum + category.attempted, 0);
  const categorizedWrong = Object.values(stats.categoryStats).reduce((sum, category) => sum + category.wrong, 0);
  const legacyAttempts = Math.max(0, stats.correct + stats.wrong - categorizedAttempts);
  const legacyWrong = Math.max(0, stats.wrong - categorizedWrong);
  if (legacyAttempts) {
    const legacyCorrect = legacyAttempts - legacyWrong;
    const accuracy = `${Math.round((legacyCorrect / legacyAttempts) * 100)}%`;
    rows.push(`<tr><th scope="row"><span class="category-dot dot-legacy"></span>舊版紀錄（未分類）</th><td>${legacyAttempts}</td><td><span class="${legacyWrong ? "wrong-count" : "zero-count"}">${legacyWrong}</span></td><td>${legacyCorrect}</td><td>${accuracy}</td></tr>`);
  }
  $("#category-statistics").innerHTML = rows.join("");
  $("#statistics-total").textContent = stats.correct + stats.wrong;
  $("#category-totals").innerHTML = `<tr><th scope="row">總計</th><td>${stats.correct + stats.wrong}</td><td><span class="${stats.wrong ? "wrong-count" : "zero-count"}">${stats.wrong}</span></td><td>${stats.correct}</td><td>${stats.correct + stats.wrong ? `${Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)}%` : "—"}</td></tr>`;

  const mistakes = [...stats.mistakes].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
  $("#mistakes-count").textContent = mistakes.length;
  $("#mistake-list").innerHTML = mistakes.length
    ? mistakes.map(renderMistake).join("")
    : '<div class="empty-mistakes"><span aria-hidden="true">✓</span><strong>目前沒有錯題紀錄</strong><p>答錯的題目會自動整理在這裡。</p></div>';
}

function renderMistake(mistake) {
  const topic = topics.find((item) => item.id === mistake.topicId);
  const label = topic ? topic.label : "未知類別";
  const date = new Date(mistake.timestamp);
  const time = Number.isNaN(date.getTime()) ? "時間不明" : date.toLocaleString("zh-TW", { dateStyle: "medium", timeStyle: "short" });
  const answers = Array.isArray(mistake.answers) ? mistake.answers : [];
  const submitted = Array.isArray(mistake.submittedAnswers) ? mistake.submittedAnswers : [];
  return `<article class="mistake-item">
    <div class="mistake-item-top"><span class="mistake-category">${escapeHtml(label)}</span><time datetime="${escapeHtml(mistake.timestamp)}">${escapeHtml(time)}</time></div>
    <h3>${escapeHtml(mistake.title || "練習題")}</h3>
    <pre class="mistake-code">${escapeHtml(mistake.source || "")}</pre>
    <div class="mistake-answers"><span>你的答案</span><strong>${submitted.map(escapeHtml).join("　·　")}</strong><span>正確答案</span><strong>${answers.map(escapeHtml).join("　·　")}</strong></div>
    ${mistake.explanation ? `<p class="mistake-explanation">${escapeHtml(mistake.explanation)}</p>` : ""}
  </article>`;
}

function renderQuestion() {
  const topic = topics.find((item) => item.id === activeTopic);
  currentQuestion = buildQuestion(activeTopic);
  answered = false;
  questionCount += 1;
  $("#breadcrumb-current").textContent = topic.label;
  $("#topic-badge").textContent = topic.badge;
  $("#question-title").textContent = topic.title;
  $("#question-instruction").textContent = activeTopic === "range"
    ? "閱讀題目，依照 range 的規則輸入答案。"
    : activeTopic === "list-calc"
      ? "依照 for 迴圈的走訪範圍，回答加總、最大值或最小值。"
      : "仔細閱讀程式，輸入正確的結果。";
  $("#question-number").textContent = `第 ${questionCount} 題`;
  $("#code-content").innerHTML = renderCode(currentQuestion.source);
  $("#tip-title").textContent = topic.tipTitle;
  $("#tip-copy").textContent = topic.tip;
  $("#hint-box").hidden = true;
  $("#hint-box").textContent = `提示：${currentQuestion.hint}`;
  $("#feedback").hidden = true;
  $("#feedback").className = "feedback";
  $("#submit-button").hidden = false;
  $("#next-button").hidden = true;
  $("#answer-area").innerHTML = currentQuestion.fields.map((field, index) => `
    <div class="answer-field">
      <label class="answer-label" for="answer-${index}">${field.label}</label>
      <input id="answer-${index}" type="text" autocomplete="off" spellcheck="false" placeholder="${field.placeholder}" aria-label="${field.label}">
      ${field.note ? `<span class="field-hint">${field.note}</span>` : ""}
    </div>`).join("");
  $("#answer-area").classList.toggle("answer-grid", currentQuestion.fields.length > 1);
  $("#answer-area").classList.toggle("two-columns", currentQuestion.fields.length > 1);
  const firstInput = $("#answer-0");
  if (firstInput) firstInput.focus({ preventScroll: true });
}

function normalizeAnswer(input, expected) {
  const value = input.trim();
  if (expected.startsWith("[") && expected.endsWith("]")) {
    try {
      let parsed;
      try {
        parsed = JSON.parse(value);
      } catch {
        parsed = JSON.parse(value.replace(/'/g, '"').replace(/,\s*\]/g, "]"));
      }
      return JSON.stringify(parsed) === expected;
    } catch {
      return false;
    }
  }
  if (expected.includes(",")) {
    return value.replace(/\s+/g, "") === expected.replace(/\s+/g, "");
  }
  return value === expected;
}

function checkAnswer() {
  if (answered) return;
  const inputs = currentQuestion.fields.map((_, index) => $(`#answer-${index}`));
  if (inputs.some((input) => !input.value.trim())) {
    const emptyInput = inputs.find((input) => !input.value.trim());
    emptyInput.focus();
    showFeedback(false, "先填完所有答案，再來檢查喔。");
    return;
  }
  const correct = inputs.every((input, index) => normalizeAnswer(input.value, currentQuestion.answers[index]));
  answered = true;
  stats.attemptedToday += 1;
  const category = stats.categoryStats[activeTopic];
  category.attempted += 1;
  if (correct) {
    stats.correct += 1;
    stats.streak += 1;
  } else {
    stats.wrong += 1;
    stats.streak = 0;
    category.wrong += 1;
    stats.mistakes.push({
      id: makeRecordId(),
      topicId: activeTopic,
      timestamp: new Date().toISOString(),
      title: topics.find((topic) => topic.id === activeTopic).title,
      source: currentQuestion.source,
      submittedAnswers: inputs.map((input) => input.value.trim()),
      answers: [...currentQuestion.answers],
      explanation: currentQuestion.explanation
    });
  }
  saveStats();
  renderStats();
  showFeedback(correct, correct ? "答對了！觀察得很仔細。" : "再看一次每一步，這題的答案是：", currentQuestion);
  $("#submit-button").hidden = true;
  $("#next-button").hidden = false;
  inputs.forEach((input) => { input.disabled = true; });
}

function makeRecordId() {
  return globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function showFeedback(correct, message, question = null) {
  const feedback = $("#feedback");
  feedback.className = `feedback ${correct ? "success" : "error"}`;
  feedback.innerHTML = `${message}${question ? `<span class="feedback-answer">${question.answers.map((answer) => escapeHtml(answer)).join("　·　")}</span><span>${escapeHtml(question.explanation)}</span>` : ""}`;
  feedback.hidden = false;
}

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function setView(view) {
  currentView = view;
  const isStatistics = view === "statistics";
  $("#welcome-row").hidden = isStatistics;
  $("#practice-layout").hidden = isStatistics;
  $("#statistics-page").hidden = !isStatistics;
  $("#breadcrumb-current").textContent = isStatistics ? "練習統計" : topics.find((topic) => topic.id === activeTopic).label;
  renderTopics();
  if (isStatistics) renderStatistics();
}

function showRecordStatus(message, isError = false) {
  const status = $("#record-status");
  status.textContent = message;
  status.classList.toggle("record-status-error", isError);
  status.hidden = false;
}

function exportRecords() {
  const backup = {
    format: "python-practice-room",
    version: 1,
    exportedAt: new Date().toISOString(),
    data: stats
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `python-practice-records-${todayDate()}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showRecordStatus("練習紀錄已匯出為 JSON 檔案。");
}

function validateImportedBackup(backup) {
  if (!backup || backup.format !== "python-practice-room" || backup.version !== 1 || !backup.data || typeof backup.data !== "object") {
    throw new Error("檔案格式不符，請選擇由 Python 練習室匯出的 JSON 紀錄。");
  }
  const data = backup.data;
  const isCount = (value) => Number.isSafeInteger(value) && value >= 0;
  if (![data.correct, data.wrong, data.streak, data.attemptedToday].every(isCount)) {
    throw new Error("紀錄中的答題統計格式不正確。");
  }
  if (!data.categoryStats || typeof data.categoryStats !== "object" || !Array.isArray(data.mistakes)) {
    throw new Error("紀錄缺少類別統計或錯題清單。");
  }
  const categoryStats = emptyCategoryStats();
  for (const topic of topics) {
    const category = data.categoryStats[topic.id];
    if (!category && topic.id === "list-calc") continue;
    if (!category || !isCount(category.attempted) || !isCount(category.wrong) || category.wrong > category.attempted) {
      throw new Error(`「${topic.label}」的統計資料格式不正確。`);
    }
    categoryStats[topic.id] = { attempted: category.attempted, wrong: category.wrong };
  }
  const mistakeIds = new Set();
  const mistakes = data.mistakes.map((mistake) => {
    if (!mistake || typeof mistake.id !== "string" || typeof mistake.timestamp !== "string" ||
        Number.isNaN(Date.parse(mistake.timestamp)) || !topics.some((topic) => topic.id === mistake.topicId) ||
        typeof mistake.title !== "string" || typeof mistake.source !== "string" ||
        !Array.isArray(mistake.answers) || !mistake.answers.every((answer) => typeof answer === "string") ||
        !Array.isArray(mistake.submittedAnswers) || !mistake.submittedAnswers.every((answer) => typeof answer === "string") ||
        typeof mistake.explanation !== "string") {
      throw new Error("錯題清單中有無法辨識的題目資料，未匯入任何內容。");
    }
    if (mistakeIds.has(mistake.id)) throw new Error("錯題清單中有重複的紀錄編號，未匯入任何內容。");
    mistakeIds.add(mistake.id);
    return {
      id: mistake.id,
      topicId: mistake.topicId,
      timestamp: mistake.timestamp,
      title: mistake.title,
      source: mistake.source,
      answers: [...mistake.answers],
      submittedAnswers: [...mistake.submittedAnswers],
      explanation: mistake.explanation
    };
  });
  const categorizedAttempts = Object.values(categoryStats).reduce((sum, category) => sum + category.attempted, 0);
  const categorizedWrong = Object.values(categoryStats).reduce((sum, category) => sum + category.wrong, 0);
  if (categorizedAttempts > data.correct + data.wrong || categorizedWrong > data.wrong) {
    throw new Error("類別統計大於整體統計，檔案資料不一致。");
  }
  if (mistakes.length > data.wrong || data.attemptedToday > data.correct + data.wrong) {
    throw new Error("錯題數或今日答題數大於整體統計，檔案資料不一致。");
  }
  return {
    ...defaults,
    correct: data.correct,
    wrong: data.wrong,
    streak: data.streak,
    attemptedToday: data.date === todayDate() ? data.attemptedToday : 0,
    date: todayDate(),
    categoryStats,
    mistakes
  };
}

async function importRecords(file) {
  try {
    const backup = JSON.parse(await file.text());
    const imported = validateImportedBackup(backup);
    const currentCount = stats.correct + stats.wrong;
    const importedCount = imported.correct + imported.wrong;
    if (currentCount && !window.confirm(`匯入會以檔案中的 ${importedCount} 題紀錄取代目前的 ${currentCount} 題紀錄，並可繼續累積。確定匯入嗎？`)) {
      showRecordStatus("已取消匯入，現有練習紀錄保持不變。");
      return;
    }
    stats = imported;
    saveStats();
    renderStats();
    showRecordStatus(`已匯入 ${importedCount} 題紀錄，可以繼續練習累積統計。`);
  } catch (error) {
    showRecordStatus(error instanceof SyntaxError ? "JSON 檔案無法解析，請確認檔案內容完整。" : error.message, true);
  }
}

function clearAllRecords() {
  if (!window.confirm("確定清除所有練習統計與錯題紀錄嗎？此操作無法復原。")) return;
  stats = { ...defaults, categoryStats: emptyCategoryStats(), date: todayDate() };
  saveStats();
  renderStats();
  showRecordStatus("所有練習統計與錯題紀錄已清除。");
}

function clearMistakes() {
  if (!stats.mistakes.length) {
    showRecordStatus("目前沒有錯題紀錄可清除。");
    return;
  }
  if (!window.confirm(`確定清除 ${stats.mistakes.length} 題錯題紀錄嗎？類別統計不會改變。`)) return;
  stats.mistakes = [];
  saveStats();
  renderStats();
  showRecordStatus("錯題清單已清除，類別練習統計仍保留。");
}

function keepRecentMistakes() {
  stats.mistakes.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
  const previousCount = stats.mistakes.length;
  stats.mistakes = stats.mistakes.slice(0, 10);
  saveStats();
  renderStats();
  showRecordStatus(previousCount > 10 ? `已保留最近 10 題錯題，移除較早的 ${previousCount - 10} 題。` : `目前共 ${previousCount} 題錯題，已保留全部紀錄。`);
}

nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-topic]");
  if (button) {
    activeTopic = button.dataset.topic;
    if (currentView !== "practice") setView("practice");
    else renderTopics();
    renderQuestion();
    return;
  }
  if (event.target.closest('[data-view="statistics"]')) setView("statistics");
});

$("#submit-button").addEventListener("click", checkAnswer);
$("#next-button").addEventListener("click", renderQuestion);
$("#skip-button").addEventListener("click", renderQuestion);
$("#hint-button").addEventListener("click", () => { $("#hint-box").hidden = !$("#hint-box").hidden; });
$("#answer-area").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!$("#submit-button").hidden) checkAnswer();
    else renderQuestion();
  }
});
$("#statistics-page").addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "export") exportRecords();
  if (action === "import") $("#import-file").click();
  if (action === "clear-all") clearAllRecords();
  if (action === "clear-mistakes") clearMistakes();
  if (action === "keep-recent") keepRecentMistakes();
});

$("#import-file").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) importRecords(file);
  event.target.value = "";
});

renderTopics();
renderStats();
renderQuestion();
