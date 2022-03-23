const $ = (selector) => {
    return document.querySelector(selector);
}


const startBtn = $('#start-btn');
const strikeBall = $('#strike-ball');
const remainCount = $('#remain-count');
const checkBtn = $('#check-btn');
const inputTag = $('.input-box input');
const resultBox = $('.result-box');
const inputBox = $('.input-box');
let inputValue = 0;
let inputArray = [];

let count = 10;
let answer = [];
let strike = 0;
let ball = 0;


startBtn.addEventListener('click', () => {
    resultBox.style.display = 'flex';
    inputBox.style.display = 'flex';
    clear();
    startBtn.textContent = 'Restart'
    inputTag.value = '';
    for (let i = 0; i < 3; i++) {
        let temp = Math.floor(Math.random() * 10);
        if (answer.includes(temp)) { //랜덤숫자 중복제거
            i--;
            continue;
        }
        else { answer[i] = temp; }
    }

    console.log('answer : ' + answer);
});

checkBtn.addEventListener('click', () => {
    inputValue = inputTag.value;
    if (inputTag.value === '' || inputValue < 0 || inputValue > 1000) {
        alert(`입력값이 세자리숫자가 아닙니다. (입력값 : ${inputTag.value})`);
        inputTag.value = '';
        return;
    }

    count--;

    remainCount.textContent = `${count}회 남았습니다.`;
    inputArray = [];
    for (let i = 0; i < 3; i++) {
        inputArray.unshift(inputValue % 10);
        inputValue = Math.floor(inputValue / 10);
    }
    checkResult(answer, inputArray);

    if (count <= 0 && strike != 3) {
        alert('실패😢');
        location.reload();
    }

    inputTag.value = '';
})

inputBox.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return;
    inputValue = inputTag.value;
    if (inputTag.value === '' || inputValue < 0 || inputValue > 1000) {
        alert(`입력값이 세자리숫자가 아닙니다. (입력값 : ${inputTag.value})`);
        inputTag.value = '';
        return;
    }

    count--;

    remainCount.textContent = `${count}회 남았습니다.`;
    inputArray = [];
    for (let i = 0; i < 3; i++) {
        inputArray.unshift(inputValue % 10);
        inputValue = Math.floor(inputValue / 10);
    }
    checkResult(answer, inputArray);

    if (count <= 0 && strike != 3) {
        alert('실패😢');
        location.reload();
    }

    inputTag.value = '';
})

function clear() {
    count = 10; strike = 0; ball = 0;
    strikeBall.textContent = '0 Strike 0 Ball';
    remainCount.textContent = '10회 남았습니다.';
    inputValue = 0;
}

function checkResult(answer, inputArray) {
    strike = 0; ball = 0;
    for (let i = 0; i < inputArray.length; i++) {
        if (answer.includes(inputArray[i]) && answer[i] === inputArray[i]) strike++;
        else if (answer.includes(inputArray[i]) && !(answer[i] === inputArray[i])) ball++;
    }
    if (strike === 0 && ball === 0) strikeBall.textContent = `OUT (입력 : ${inputArray.join('')})`;
    else strikeBall.textContent = `${strike} Strike ${ball} Ball (입력 : ${inputArray.join('')})`;

    if (strike === 3) {
        alert(`🎉정답! 입력값 : ${answer.join('')}`)
        location.reload();
    }
}