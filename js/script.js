"use strict";

const colors = [
    "rgb(0, 140, 140)",
    "rgb(180, 178, 178)",
    "rgb(135, 206, 235)",
    "rgb(255, 175, 185)",
    "rgb(144, 230, 145)",
    "rgb(255, 230, 195)",
    "rgb(153, 50, 204)",
    "rgb(255, 255, 150)",
    "rgb(255, 140, 0)",
    "rgb(75, 135, 250)",
    "", //지우개
];

/** 로컬저장소 key값: current color */
const KEY_CURRENT_COLOR = "current color";
/** 로컬저장소 key값: colorList */
const KEY_COLOR_LIST = "colorList";
/** 로컬저장소 key값: routine-box mousedown */
const KEY_ROUTINE_BOX_MOUSEDOWN = "routine-box mousedown";
/** ".routine-box" */
const CSS_SECLECTOR_ROUTINE_BOX = ".routine-box";
/** 컬러 팔레트에 있는 색깔들 */
const colorPalette_colors = document.querySelectorAll(".color-palette__color");


/** list 옆에 있는 컬러 박스들 */
const colorBoxs = document.querySelectorAll(".color-box");
/** 컬러 박스에 있는, 실제 색상을 드러낼 컬러dot들*/
const colorDots = document.querySelectorAll(".color-box div");


/** 루틴 행(row)들 */
const colorRoutineKitRows = document.querySelectorAll(".color-routine-kit-row");
/** 루틴 박스들 */
const routine_boxs = document.querySelectorAll(".routine-box");
// 각 행의 루틴 박스들, colorRoutineKitRows[0]는 시간 행
const colorRoutineKitRow_01_routineBoxs = colorRoutineKitRows[1].querySelectorAll(".color-routine-kit-row__routine-boxs .routine-box");
const colorRoutineKitRow_02_routineBoxs = colorRoutineKitRows[2].querySelectorAll(".color-routine-kit-row__routine-boxs .routine-box");



function 판별식(색깔) {
    if(색깔 == colors[0]){
        return "초록색"
    }
    if(색깔 == colors[1]){
        return "회색"
    }
    if(색깔 == colors[2]){
        return "하늘색"
    }
    if(색깔 == colors[3]){
        return "분홍색"
    }
    if(색깔 == colors[4]){
        return "연두색"
    }
    if(색깔 == colors[5]){
        return "살구색"
    }
    if(색깔 == colors[6]){
        return "보라색"
    }
    if(색깔 == colors[7]){
        return "노란색"
    }
    if(색깔 == colors[8]){
        return "주황색"
    }
    if(색깔 == colors[9]){
        return "파란색"
    }
    if(색깔 == colors[10]){
        return "지우개"
    }
}


/* =============================
    선택한 색깔 표시하기
============================= */
function showCurrentColor() {
    const currentColorText = document.querySelector("#current-color span");
    currentColorText.innerText = `${판별식(localStorage.getItem(KEY_CURRENT_COLOR))}`;
}
/* =============================
    current color로 칠하기
============================= */
function paintCurrentColor(container) {
    container.style.backgroundColor = `${localStorage.getItem(KEY_CURRENT_COLOR)}`;
}

function saveCurrentColor(index) {
    localStorage.setItem(KEY_CURRENT_COLOR, colors[index]);
}
function handleClickedColorBox(colorDot) {
    paintCurrentColor(colorDot);

    // 내가 선택했던 모든 colorDot의 색깔을 colorList에 담고 로컬에 저장.
    const colorList = [];
    colorDots.forEach((colorDot) => {
        colorList.push(colorDot.style.backgroundColor);
    });
    localStorage.setItem(KEY_COLOR_LIST, JSON.stringify(colorList));
}

/* =============================
    루틴 저장
============================= */
function saveRoutineRow(day, colorRoutineKitRow_num_routineBoxs) {
    const semiRoutineList = [];
    colorRoutineKitRow_num_routineBoxs.forEach((routineBox) => {
        //선택한 색깔이 지우개가 아니라면 색깔 저장
        if(routineBox.style.backgroundColor !== ""){
            semiRoutineList.push(routineBox.style.backgroundColor);
        }else{
            semiRoutineList.push("0");
        }
        /* if (routineBox.style.backgroundColor) {
            semiRoutineList.push("1");
        }else{
            semiRoutineList.push("0");
        } */
    });
    

    localStorage.setItem(`${day}`, JSON.stringify(semiRoutineList));
    /* console.log(`${day}: ${semiRoutineList}`); */
}


/* =============================
    컬러 팔레트 클릭할 때
============================= */
colorPalette_colors.forEach((colorPalette_color, colorPalette_color_index) => {
    colorPalette_color.addEventListener("click", () => {
        saveCurrentColor(colorPalette_color_index);
        showCurrentColor();
    });
});


/* =============================
    컬러 박스 클릭할 때
============================= */
colorBoxs.forEach((colorBox) => {
    const colorDot = colorBox.querySelector("div");
    colorBox.addEventListener("click", () => {
        handleClickedColorBox(colorDot);
    });
});


/* ================================
    컬러루틴 - 루틴 기능
================================ */
routine_boxs.forEach((routine_box) => {

    routine_box.addEventListener("mousedown", () => {
        console.log("루틴 시작");
        paintCurrentColor(routine_box);
        localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, true);
    });
    routine_box.addEventListener("mouseenter", () => {
        const routineBoxMousedown = JSON.parse(localStorage.getItem(KEY_ROUTINE_BOX_MOUSEDOWN));
        if (routineBoxMousedown == true) {
            console.log("루틴 그리는 중");
            paintCurrentColor(routine_box);
        }
    });
    routine_box.addEventListener("mouseup", () => {
        const routineBoxMousedown = JSON.parse(localStorage.getItem(KEY_ROUTINE_BOX_MOUSEDOWN));
        if (routineBoxMousedown == true) {
            console.log("루틴 끝");
            localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, false);

            saveRoutineRow("day1", colorRoutineKitRow_01_routineBoxs);
            saveRoutineRow("day2", colorRoutineKitRow_02_routineBoxs);
        }
    });
});


/* =====================================================
    컬러루틴 - 루틴 그리는 중 다른 행으로 이동시 드래그 취소
===================================================== */
colorRoutineKitRows.forEach((colorRoutineKitRow) => {
    colorRoutineKitRow.addEventListener("mouseleave", () => {
        const routineBoxMousedown = JSON.parse(localStorage.getItem(KEY_ROUTINE_BOX_MOUSEDOWN));
        if (routineBoxMousedown == true) {
            console.log("현재 행을 벗어남");
            localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, false);
        }
    });
});


/* =============================
    새로고침 할 때
============================= */
localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, false);
const savedColorList = JSON.parse(localStorage.getItem(KEY_COLOR_LIST));
if (savedColorList !== null) {
    // 저장된 컬러 리스트와 일대일대응 시키기
    for (let i = 0; i < savedColorList.length; i++) {
        colorDots[i].style.backgroundColor = savedColorList[i];
    }
}
showCurrentColor();
colorPalette_colors.forEach((colorPalette_color, index)=>{
    colorPalette_color.style.backgroundColor = colors[index];
});

const savedColorRoutineKitRow_01_routineBoxs = JSON.parse(localStorage.getItem("day1"));
for (let i = 0; i < savedColorRoutineKitRow_01_routineBoxs.length; i++) {
    colorRoutineKitRow_01_routineBoxs[i].style.backgroundColor = savedColorRoutineKitRow_01_routineBoxs[i];
}
/* savedColorRoutineKitRow_01_routineBoxs.forEach((routineBox) => {
    
}); */


