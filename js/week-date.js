"use strict";

/* ================================
   일주일 날짜 자동 계산
================================ */

// 루틴 행들 (하루 1줄)
const routineRows = document.querySelectorAll(".color-routine-kit-row.routine-row");

// 오늘 날짜
const today = new Date();

// 요일 (0:일 ~ 6:토)
const dayOfWeek = today.getDay();

// 월요일이 시작:
const monday = new Date(today);
monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

routineRows.forEach((row, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateSpan = row.querySelector(".color-routine-kit-row__date span");
    dateSpan.innerText = `${month}/${day}`;
});