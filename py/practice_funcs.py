import random
import textwrap
import io
import contextlib


def generate_problem():
    funcs = []
    src_lines = []
    n_funcs = random.randint(1, 3)
    names = ["a", "b", "c", "d", "e"]
    used_names = names[:n_funcs]

    for i, name in enumerate(used_names):
        params_n = random.randint(0, 2)
        # params = [f"x{j}" for j in range(params_n)]
        params = ["x","y"]

        # Build an expression using params, constants, and possibly earlier functions
        choices = []
        if params:
            choices += params
        choices += [str(random.randint(1, 9)) for _ in range(3)]
        # maybe call a previous function
        if i > 0 and random.random() < 0.6:
            prev = random.choice(used_names[:i])
            arg = random.choice(choices)
            choices.append(f"{prev}({arg})")

        # build a simple expression combining 1-3 terms with + or *
        terms = random.randint(1, 3)
        expr = ""
        for t in range(terms):
            term = random.choice(choices)
            op = random.choice(["+", "*", "-"])
            if t == 0:
                expr = term
            else:
                expr = f"{expr} {op} {term}"

        params_src = ",".join(params)
        src_lines.append(f"def {name}({params_src}):")
        src_lines.append(f"    return {expr}\n")
        funcs.append(name)

    # Add print calls
    n_calls = random.randint(1, 3)
    calls = []
    for _ in range(n_calls):
        fn = random.choice(funcs)
        # choose argument list according to function signature by introspecting src
        # simpler: detect params by searching the def line
        for ln in src_lines:
            if ln.startswith(f"def {fn}("):
                sig = ln
                break
        params_part = sig[sig.find("(")+1:sig.find(")")]
        if params_part.strip() == "":
            call = f"{fn}()"
        else:
            args = []
            for p in params_part.split(","):
                p = p.strip()
                if not p:
                    continue
                # pick either small constant or call previous
                if random.random() < 0.5:
                    args.append(str(random.randint(1, 9)))
                else:
                    prev = random.choice(funcs)
                    args.append(f"{prev}({random.randint(1,9)})")
            call = f"{fn}({', '.join(args)})"
        calls.append(call)

    src = "\n".join(src_lines) + "\n\n"
    for c in calls:
        src += f"print( {c} )\n"

    # Compute expected outputs by executing the source in a clean namespace
    ns = {}
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(src, ns)
    except Exception as e:
        # Fallback: regenerate if generation produced invalid code
        return generate_problem()

    out = buf.getvalue().strip().splitlines()
    out = [line.rstrip() for line in out]

    return src, out


def ask_problem():
    src, expected = generate_problem()
    print("\n--- 請閱讀下面的程式並預測輸出 ---\n")
    print(src)
    answers = []
    for i in range(len(expected)):
        resp = input(f"輸出 第 {i+1} 行 是？ ")
        answers.append(resp.strip())

    correct = 0
    for i, (ans, exp) in enumerate(zip(answers, expected)):
        # compare numerically if possible
        ok = False
        try:
            if str(int(ans)) == str(int(exp)):
                ok = True
        except Exception:
            if ans == exp:
                ok = True

        if ok:
            print(f"第 {i+1} 行： ✅ (你的答案: {ans}，正確答案: {exp})")
            correct += 1
        else:
            print(f"第 {i+1} 行： ❌ (你的答案: {ans}，正確答案: {exp})")

    return correct, len(expected) - correct


def main():
    total_correct = 0
    total_wrong = 0
    print("函式輸出練習器。輸入 q 結束。")
    while True:
        cmd = input("按 Enter 出題，或輸入 q 離開：").strip().lower()
        if cmd == "q":
            break
        correct, wrong = ask_problem()
        total_correct += correct
        total_wrong += wrong
        print(f"\n目前累計：正確 ✅  {total_correct}，錯誤 ❌  {total_wrong}\n")

    print(f"練習結束。總計：正確 ✅  {total_correct}，錯誤 ❌  {total_wrong}")


if __name__ == "__main__":
    main()
