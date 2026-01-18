const colorPalette_colors = document.querySelectorAll(".color-palette__color");
const colorBoxs = document.querySelectorAll(".color-box");
const routine_boxs = document.querySelectorAll(".time-row__routine");

/** 컬러 dots*/
const colorDots = document.querySelectorAll(".color-box div");

/** 컬러 리스트 */
let colorList = [];

/** 로컬저장소 key값: current color */
const KEY_CURRENT_COLOR = "current color";
/** 로컬저장소 key값: colorList */
const KEY_COLOR_LIST = "colorList";
/** 로컬저장소 key값: routine-box mousedown */
const KEY_ROUTINE_BOX_MOUSEDOWN = "routine-box mousedown";

function savingCurrentColor(colorPalette) {
    const currentColor = colorPalette.style.backgroundColor;
    localStorage.setItem(KEY_CURRENT_COLOR, currentColor);
}
function showCurrentColor() {
    const currentColorText = document.querySelector("#current-color span");
    const currentColor = localStorage.getItem(KEY_CURRENT_COLOR);
    currentColorText.innerText = `current color: ${currentColor}`;
}
function painting(container) {
    container.style.backgroundColor = localStorage.getItem(KEY_CURRENT_COLOR);
}
function handleClickedColorBox(colorDot) {
    painting(colorDot);

    // 선택한 색깔을 colorList에 추가할 때마다 모든 colorDot의 색깔이 semiColorList에 저장, semiColorList의 값으로 colorList를 교체하고 로컬에 저장.
    const semiColorList = [];
    colorDots.forEach((colorDot) => {
        semiColorList.push(colorDot.style.backgroundColor);
    });
    colorList = semiColorList;
    localStorage.setItem(KEY_COLOR_LIST, JSON.stringify(colorList));

    //console.log(`colorList: ${JSON.stringify(colorList)}`);
}


/* =============================
    컬러 팔레트 클릭할 때
============================= */
colorPalette_colors.forEach((colorPalette_color) => {
    colorPalette_color.addEventListener("click", () => {
        savingCurrentColor(colorPalette_color);
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


/* =============================
    새로고침 할 때
============================= */
localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, false);
const savedColorList = JSON.parse(localStorage.getItem(KEY_COLOR_LIST));
if (savedColorList !== null) {
    // 저장된 컬러 리스트와 일대일대응 시키기
    for (let i = 0; i < 6; i++) {
        colorDots[i].style.backgroundColor = savedColorList[i];
    }
    showCurrentColor();
}


/* =============================
    컬러루틴
============================= */
routine_boxs.forEach((routine_box) => {

    routine_box.addEventListener("mousedown", () => {
        console.log("!");
        localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, true);
        painting(routine_box);
    });

    routine_box.addEventListener("mouseup", () => {
        console.log("!!!");
        localStorage.setItem(KEY_ROUTINE_BOX_MOUSEDOWN, false);
        painting(routine_box);
    });

    /* =============================
        컬러루틴 - 이 부분 코드 리뷰좀
    ============================= */
    routine_box.addEventListener("mouseenter", () => {
        const routineBoxMousedown = JSON.parse(localStorage.getItem(KEY_ROUTINE_BOX_MOUSEDOWN));
        if (routineBoxMousedown) {
            console.log("!!");
            painting(routine_box);
        }
    });

});

