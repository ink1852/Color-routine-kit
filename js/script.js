"use strict";

const colors = [
    "#086e6e",
    "#b4b2b2",
    "#82b9ce",
    "#ffafb9",
    "#90e691",
    "#e4c599",
    "#a46dbc",
    "#e4e4a4",
    "#ed9428",
    "#4577d6",
    /* "#2E6666",
    "#A6A4A4",
    "#6F98A5",
    "#C79AA1",
    "#7FAE86",
    "#BFA782",
    "#876B93",
    "#B8B48A",
    "#9A6A3A",
    "#5A74A3", */
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


/** 컬러 박스들 */
const colorBoxs = document.querySelectorAll(".color-box");
/** 컬러 박스 안에 있는, 실제 색상을 드러낼 컬러dot들*/
const colorDots = document.querySelectorAll(".color-box div");
/** 컬러 박스 옆에 있는 인풋 제출용 폼 */
const listForms = document.querySelectorAll(".color-list-form");
/** list 인풋들 */
const colorListInputs = document.querySelectorAll(".color-component__input--text");


/** 루틴 행(row)들 */
const colorRoutineKitRows = document.querySelectorAll(".color-routine-kit-row.routine-row");
/** 루틴 박스들 */
const routine_boxs = document.querySelectorAll(".routine-box");



function 판별식(색깔) {
    if (색깔 == colors[0]) {
        return "초록색"
    } else if (색깔 == colors[1]) {
        return "회색"
    }
    else if (색깔 == colors[2]) {
        return "하늘색"
    }
    else if (색깔 == colors[3]) {
        return "분홍색"
    }
    else if (색깔 == colors[4]) {
        return "연두색"
    }
    else if (색깔 == colors[5]) {
        return "살구색"
    }
    else if (색깔 == colors[6]) {
        return "보라색"
    }
    else if (색깔 == colors[7]) {
        return "노란색"
    }
    else if (색깔 == colors[8]) {
        return "주황색"
    }
    else if (색깔 == colors[9]) {
        return "파란색"
    }
    else if (색깔 == colors[10]) {
        return "지우개"
    }
    else {
        return "지우개"
    }
}

/* ===============================================
    현재 색깔(내가 선택한, 또는 선택했던 색깔) 표시하기
=============================================== */
function showCurrentColor() {
    const currentColorText = document.querySelector("#current-color span");
    currentColorText.innerText = `${판별식(localStorage.getItem(KEY_CURRENT_COLOR))}`;
}

/* ==================================
    요소 내부 색깔을 current color로 칠하기
================================== */
function paintCurrentColor(element) {
    element.style.backgroundColor = `${localStorage.getItem(KEY_CURRENT_COLOR)}`;
}

function saveCurrentColor(index) {
    localStorage.setItem(KEY_CURRENT_COLOR, colors[index]);
}
function handleClicked_colorBox(colorDot) {
    paintCurrentColor(colorDot);

    /* 내가 선택했던 모든 colorDot의 색깔을 colorList에 담고 로컬에 저장.*/
    const array = [];
    colorDots.forEach((colorDot) => {
        array.push(colorDot.style.backgroundColor);
    });
    localStorage.setItem(KEY_COLOR_LIST, JSON.stringify(array));
}

/* =============================
    루틴 저장
============================= */
function saveRoutineRow() {
    localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, false);
    colorRoutineKitRows.forEach((colorRoutineKitRow, colorRoutineKitRow_index) => {
        const routineList = [];
        const colorRoutineKitRow_routineBoxs = colorRoutineKitRow.querySelectorAll(".color-routine-kit-row__routine-boxs .routine-box");
        colorRoutineKitRow_routineBoxs.forEach((routineBox) => {
            if (routineBox.style.backgroundColor == "") {
                routineList.push(""); // ""(지우개)로 저장
            } else {
                routineList.push(routineBox.style.backgroundColor); //선택한 색깔로 저장
            }
        });
        localStorage.setItem(`day${colorRoutineKitRow_index}`, JSON.stringify(routineList));
    });
}


/* =============================
    컬러 팔레트 클릭할 때
============================= */
colorPalette_colors.forEach((colorPaletteColor, colorPaletteColor_index) => {
    colorPaletteColor.addEventListener("click", () => {
        saveCurrentColor(colorPaletteColor_index);
        showCurrentColor();
    });
});
/* =============================
    컬러 박스 클릭할 때
============================= */
colorBoxs.forEach((colorBox) => {
    const colorDot = colorBox.querySelector("div");
    colorBox.addEventListener("click", () => {
        handleClicked_colorBox(colorDot);
    });
});


/* ================================
    컬러루틴 - 루틴 기능
================================ */
routine_boxs.forEach((routineBox) => {

    routineBox.addEventListener("mousedown", () => {
        console.log("루틴 시작");
        paintCurrentColor(routineBox);
        localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, true);
    });
    routineBox.addEventListener("mouseenter", () => {
        const routineBoxMousedown = JSON.parse(localStorage.getItem(KEY_ROUTINE_BOX_MOUSEDOWN));
        if (routineBoxMousedown == true) {
            console.log("루틴 그리는 중");
            paintCurrentColor(routineBox);
        }
    });
    routineBox.addEventListener("mouseup", () => {
        const routineBoxMousedown = JSON.parse(localStorage.getItem(KEY_ROUTINE_BOX_MOUSEDOWN));
        if (routineBoxMousedown == true) {
            console.log("루틴 끝");
            saveRoutineRow();
        }
    });
});
/* =============================================================================
    컬러루틴 - 루틴 그리는 중 다른 행으로 이동시 드래그 취소, 현재 그렸던 루틴까지 저장
============================================================================= */
colorRoutineKitRows.forEach((colorRoutineKitRow) => {
    colorRoutineKitRow.addEventListener("mouseleave", () => {
        const routineBoxMousedown = JSON.parse(localStorage.getItem(KEY_ROUTINE_BOX_MOUSEDOWN));
        if (routineBoxMousedown == true) {
            console.log("현재 행을 벗어남");
            saveRoutineRow();
        }
    });
});


/* =========================================
    list input이 submit됐거나 focus를 잃을 때
========================================= */
function handleSubmitOrBlur_saveColorListInput(e) {
    e.preventDefault();
    const list_inputsList = [];
    colorListInputs.forEach((colorListInput) => {
        list_inputsList.push(colorListInput.value);
    });
    localStorage.setItem("list inputs", JSON.stringify(list_inputsList));
}
listForms.forEach((colorListForm) => {
    colorListForm.addEventListener("submit", handleSubmitOrBlur_saveColorListInput);
});
colorListInputs.forEach((colorListInput) => {
    colorListInput.addEventListener("blur", handleSubmitOrBlur_saveColorListInput);
});




/* =============================
    새로고침 할 때
============================= */
localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, false);
const savedColorList = JSON.parse(localStorage.getItem(KEY_COLOR_LIST));
const savedList_inputsList = JSON.parse(localStorage.getItem("list inputs"));

showCurrentColor();
if (savedColorList !== null) {
    /* 저장된 컬러 리스트와 일대일대응 시키기 */
    for (let i = 0; i < savedColorList.length; i++) {
        colorDots[i].style.backgroundColor = savedColorList[i];
        colorListInputs[i].value = savedList_inputsList[i];
    }
}
/* 루틴 색깔로 칠하기 */
for (let i = 0; i < 7; i++) {
    const savedColorRoutineKitRow = JSON.parse(localStorage.getItem(`day${i}`));
    if (savedColorRoutineKitRow !== null) {
        const colorRoutineKitRow_routineBoxs = colorRoutineKitRows[i].querySelectorAll(".color-routine-kit-row__routine-boxs .routine-box");
        colorRoutineKitRow_routineBoxs.forEach((routineBox, routineBox_index) => {
            routineBox.style.backgroundColor = savedColorRoutineKitRow[routineBox_index];
        })
        console.log(`day${i} 그리기 성공`);
    }
}
/* 컬러 팔레트 색깔들 보여주기 */
colorPalette_colors.forEach((colorPaletteColor, colorPaletteColor_index) => {
    colorPaletteColor.style.backgroundColor = colors[colorPaletteColor_index];
});

