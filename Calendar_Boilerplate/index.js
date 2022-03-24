// TO DO
// [x] 1. 오늘의 현재 요일 표기
// [x] 2. 오늘의 현재 날짜 표기
// [x] 3. 오늘의 현재 월 표기
// [x] 4. 오늘의 현재 연도 표기
// [x] 5. 일, 월, 화, 수, 목, 금, 토 요일 라벨링 표기
// [x] 6. 현재 월의 1일이 무슨 요일인지 판별하고, 해당 요일 라벨링에 1일 표기하기
// [x] 7. 현재 월의 마지막 날짜까지 달력에 표기하기
// [x] 8. 우측 화살표를 클릭 했을때, 다음 달의 요일 및 날짜 표기
// [x] 9. 좌측 화살표를 클릭 했을때, 이전 달의 요일 및 날짜 표기
// [x] 10. 특정 날짜를 클릭 했을때, 상단의 요일 및 날짜 반영하기
// [x] 11. 오늘날짜 빨간색표시

const $ = (selector) => document.querySelector(selector);

const today = new Date(); // 고정
const date = new Date(); // 계산 or 이벤트 발생시 변동

const currentDay = $('.current-day p:nth-child(1)');
const currentDate = $('.current-day p:nth-child(2)');
const currentMonth = $('#current-month');
const tbody = $('tbody');
const tableThs = document.querySelectorAll('tbody th');
const prevBtn = $('#prev-btn');
const nextBtn = $('#next-btn');

// 1,2,3,4
displayDay(date);

// 6,7,11
displayCalendar(date);

// 8
prevBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth())
        date.setDate(today.getDate());
    else date.setDate(1);
    displayDay(date);
    displayCalendar(date);
});

// 9
nextBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth())
        date.setDate(today.getDate());
    else date.setDate(1);
    displayDay(date);
    displayCalendar(date);
});

// 10
tbody.addEventListener('click', (e) => {
    if (e.target.tagName != 'TH' || e.target.textContent === '') return;
    let day = Number(e.target.textContent);
    date.setDate(day);
    displayDay(date);
})


function displayDay(dateObj) {
    currentDay.textContent = customGetDay(dateObj);
    currentDate.textContent = dateObj.getDate();
    currentMonth.textContent = `${customGetMonth(dateObj)} ${dateObj.getFullYear()}`;
}

function displayCalendar(dateObj) {
    const tempDate = dateObj.getDate();

    dateObj.setMonth(dateObj.getMonth() + 1);
    dateObj.setDate(0);
    const lastDate = dateObj.getDate();//현재월의 마지막일이 몇일인지 저장

    dateObj.setDate(1);
    const firstDay = date.getDay(); //현재월의 1일이 무슨요일인지 저장

    dateObj.setDate(tempDate);  // dateObj 원상복구

    // 달력 초기화
    for (let i = 0; i < tableThs.length; i++) {
        tableThs[i].textContent = '';
        tableThs[i].style.color = 'black';
    }

    // 일 기록
    for (let i = 0; i < lastDate; i++) {
        tableThs[firstDay + i].textContent = i + 1;
    }

    //오늘날짜에 빨간색표시
    if (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth())
        for (let i = 0; i < tableThs.length; i++) {
            if (tableThs[i].textContent === date.getDate().toString()) tableThs[i].style.color = 'red';
        }
}





function customGetDay(dateObj) {
    switch (dateObj.getDay()) {
        case 0:
            return 'SUN'
        case 1:
            return 'MON'
        case 2:
            return 'TUE'
        case 3:
            return 'WED'
        case 4:
            return 'THU'
        case 5:
            return 'FRI'
        case 6:
            return 'SAT'
    }
}

function customGetMonth(dateObj) {
    switch (dateObj.getMonth()) {
        case 0:
            return 'JAN'
        case 1:
            return 'FEB'
        case 2:
            return 'MAR'
        case 3:
            return 'APR'
        case 4:
            return 'MAY'
        case 5:
            return 'JUN'
        case 6:
            return 'JUL'
        case 7:
            return 'AUG'
        case 8:
            return 'SEP'
        case 9:
            return 'OCT'
        case 10:
            return 'NOV'
        case 11:
            return 'DEC'
    }
}