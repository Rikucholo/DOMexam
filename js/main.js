function Calc() {
    this.a;
    this.b;
    this.winCnt = 0;
}
Calc.prototype.init = () => {
    a = Math.floor(Math.random() * 10) + 1;
    b = Math.floor(Math.random() * 10) + 1;
};
Calc.prototype.printQuiz = () => document.getElementById("proto").textContent = `${this.a}+${this.b}=?`;
Calc.prototype.isAns = (value) => (this.a + this.b) == value;
Calc.prototype.cntIncrement = function() { this.winCnt++; };
Calc.prototype.removeCnt = function() { this.winCnt = 0; };
Calc.prototype.getCnt = function() { return this.winCnt; };

class Time {
    constructor() {
        this.time = 0;
    }

    start() {
        this.timer = setInterval(() => { this.time++ }, 1000);
    }

    stop() {
        clearInterval(this.timer);
    }
    reset() {
        this.time = 0;
    }

    printTime() {
        const result = document.getElementById('fin');
        result.textContent = `結果は${this.time}秒でした！`;
        document.getElementById('box').appendChild(result);
    }
}

const calc = new Calc();
const time = new Time();
const len = 3;

const start = () => {
    time.start();
    const box = document.getElementById('box');
    document.querySelector('input[name="num"]').disabled = false;
    box.removeChild(btn);
    box.removeChild(text);
    calc.init();
    calc.printQuiz();
}
const isNum = (num) => {
    const regExp = new RegExp(/^[+,-]?([1-9]\d*|0)(\.\d+)?$/);
    return regExp.test(num);
}

const pushButton = () => {
    calc.init();
    calc.printQuiz();
    document.querySelector('input[name="num"]').disabled = false;
    const fin = document.getElementById('fin');
    if (fin) restartQuiz(fin);
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    result.removeChild(btn);
    result.textContent = "";

}
const restartQuiz = (fin) => {
    fin.textContent = '';
    time.reset();
    time.start();
}
const addButton = (value) => {
    setTimeout(() => {
        const addButton = document.createElement('input');
        addButton.type = 'button';
        addButton.id = 'btn';
        addButton.value = value;
        addButton.onclick = pushButton;
        document.getElementById('result').appendChild(addButton);
    }, 500);
}

const check = () => {
    if (!(isNum(ans.num.value))) {
        document.getElementById("result").textContent = '数値で入力してください';
        ans.num.value = "";
        return false;
    }
    if (calc.isAns(ans.num.value)) {
        calc.cntIncrement();
        if (calc.getCnt() % 3 === 0) {
            time.stop();
            time.printTime();
            addButton('再挑戦！');
        } else {
            document.getElementById("result").textContent = '正解！！';
            document.querySelector('input[name="num"]').disabled = true;
            addButton('次へ');
        }
        ans.num.value = "";
        return false;
    } else {
        document.getElementById("result").textContent = 'ブッブー';
        calc.removeCnt();
        ans.num.value = "";

        return false;
    }
}