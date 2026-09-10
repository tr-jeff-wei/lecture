const QUESTION_COUNT = 10;
const functionNames = ["a", "b", "c", "d", "e"];
let questions = [];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choose(items) {
  return items[randomInt(0, items.length - 1)];
}

function makeFunctionCall(functionInfo, availableParams) {
  const args = Array.from({ length: functionInfo.params.length }, () => {
    if (availableParams.length && Math.random() < 0.45) return choose(availableParams);
    return String(randomInt(1, 9));
  });
  return {
    source: `${functionInfo.name}(${args.join(", ")})`,
    args,
    functionInfo
  };
}

function generateQuestion() {
  const functions = [];
  const sourceLines = [];

  for (let index = 0; index < randomInt(1, 3); index += 1) {
    const name = functionNames[index];
    const params = ["x", "y"].slice(0, randomInt(0, 2));
    const choices = [...params, String(randomInt(1, 9)), String(randomInt(1, 9)), String(randomInt(1, 9))];
    const terms = [];
    const operators = [];

    if (index > 0 && Math.random() < 0.6) {
      const previous = choose(functions);
      const call = makeFunctionCall(previous, params);
      choices.push(call);
    }

    for (let termIndex = 0; termIndex < randomInt(1, 3); termIndex += 1) {
      const term = choose(choices);
      terms.push(term);
      if (termIndex > 0) operators.push(choose(["+", "*", "-"]));
    }

    const expression = terms.map((term) => typeof term === "string" ? term : term.source)
      .reduce((result, term, termIndex) => termIndex === 0 ? term : `${result} ${operators[termIndex - 1]} ${term}`, "");
    const compiled = new Function(...params, ...functions.map((fn) => fn.name), `return ${expression};`);
    const functionInfo = {
      name,
      params,
      expression,
      call: (...args) => compiled(...args, ...functions.map((fn) => fn.call))
    };
    functions.push(functionInfo);
    sourceLines.push(`def ${name}(${params.join(",")}):\n    return ${expression}\n`);
  }

  const calls = Array.from({ length: randomInt(1, 3) }, () => {
    const functionInfo = choose(functions);
    const args = functionInfo.params.map(() => randomInt(1, 9));
    return { functionInfo, args, source: `${functionInfo.name}(${args.join(", ")})` };
  });
  const source = `${sourceLines.join("\n")}\n${calls.map((call) => `print( ${call.source} )`).join("\n")}`;
  const expected = calls.map((call) => String(call.functionInfo.call(...call.args)));

  return { source, expected };
}

function renderQuestions() {
  const list = document.querySelector("#question-list");
  list.innerHTML = questions.map((question, questionIndex) => `
    <article class="question-card">
      <div class="question-heading">
        <p class="question-number">QUESTION ${String(questionIndex + 1).padStart(2, "0")}</p>
        <span class="output-count">${question.expected.length} 行輸出</span>
      </div>
      <pre><code>${question.source}</code></pre>
      <div class="answer-grid">
        ${question.expected.map((_, answerIndex) => `
          <div class="answer-row">
            <label for="answer-${questionIndex}-${answerIndex}">第 ${answerIndex + 1} 行</label>
            <input id="answer-${questionIndex}-${answerIndex}" data-question="${questionIndex}" data-answer="${answerIndex}" type="text" autocomplete="off">
          </div>`).join("")}
      </div>
    </article>`).join("");
}

function answersMatch(answer, expected) {
  const numericAnswer = Number(answer);
  const numericExpected = Number(expected);
  return answer.trim() !== "" && Number.isFinite(numericAnswer) && Number.isFinite(numericExpected)
    ? numericAnswer === numericExpected
    : answer.trim() === expected;
}

function grade(event) {
  event.preventDefault();
  let correct = 0;
  let total = 0;

  document.querySelectorAll(".answer-row").forEach((row) => {
    const input = row.querySelector("input");
    const expected = questions[Number(input.dataset.question)].expected[Number(input.dataset.answer)];
    const isCorrect = answersMatch(input.value, expected);
    total += 1;
    correct += isCorrect ? 1 : 0;
    row.classList.toggle("correct", isCorrect);
    row.classList.toggle("wrong", !isCorrect);
    let feedback = row.querySelector(".answer-feedback");
    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "answer-feedback";
      row.append(feedback);
    }
    feedback.className = `answer-feedback ${isCorrect ? "correct" : "wrong"}`;
    feedback.textContent = isCorrect ? "正確" : `正確答案：${expected}`;
  });

  const panel = document.querySelector("#result-panel");
  panel.hidden = false;
  panel.classList.toggle("is-perfect", correct === total);
  document.querySelector("#result-title").textContent = `答對 ${correct} / ${total} 題`;
  document.querySelector("#result-detail").textContent = correct === total ? "全部答對，做得很好。" : "紅色列是需要再檢查的答案。";
  document.querySelector("#result-detail").textContent += `批改時間：${new Date().toLocaleString()}`;
  document.querySelector("#progress-text").textContent = `本次得分：${correct} / ${total}`;
  panel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function startRound() {
  questions = Array.from({ length: QUESTION_COUNT }, generateQuestion);
  renderQuestions();
  document.querySelector("#result-panel").hidden = true;
  document.querySelector("#progress-text").textContent = "尚未送出";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector("#quiz-form").addEventListener("submit", grade);
document.querySelector("#new-round-button").addEventListener("click", startRound);
startRound();