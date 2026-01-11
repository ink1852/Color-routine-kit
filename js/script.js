const colorPalette_colors = document.querySelectorAll(".colors__color");
const colorBoxs = document.querySelectorAll(".color-box");

/** 컬러 dots*/
const colorDots = document.querySelectorAll(".color-box div");

/** 컬러 리스트 */
let colorList = [];

/** 로컬저장소 key값: current color */
const KEY_CURRENT_COLOR = "current color";
/** 로컬저장소 key값: colorList */
const KEY_COLOR_LIST = "colorList";

function handleClickedCurrentColor(colorPalette) {
    // 컬러 팔레트에서 클릭한 색상 저장
    const currentColor = colorPalette.style.backgroundColor;
    localStorage.setItem(KEY_CURRENT_COLOR, currentColor);


    /* console.log(`current color: ${currentColor}`); */
}
function handleClickedColorBox(colorDot) {
    // 선택한 colorDot의 색깔은 current color
    colorDot.style.backgroundColor = localStorage.getItem(KEY_CURRENT_COLOR);

    /* 선택한 색깔을 colorList에 추가할 때마다 모든 colorDot의 색깔이 semiColorList에 저장,
    semiColorList의 값으로 colorList를 교체한다. */
    const semiColorList = [];
    colorDots.forEach((colorDot) => {
        semiColorList.push(colorDot.style.backgroundColor);
    });
    colorList = semiColorList;
    localStorage.setItem(KEY_COLOR_LIST, JSON.stringify(colorList));


    /* console.log(`colorList: ${JSON.stringify(colorList)}`); */
}

colorPalette_colors.forEach((colorPalette_color) => {
    colorPalette_color.addEventListener("click", () => {
        handleClickedCurrentColor(colorPalette_color);
    });
});
colorBoxs.forEach((colorBox) => {
    const colorDot = colorBox.querySelector("div");
    colorBox.addEventListener("click", () => {
        handleClickedColorBox(colorDot);
    });
});

const savedColorList = JSON.parse(localStorage.getItem(KEY_COLOR_LIST));
if (savedColorList !== null) {
    for (let i = 0; i < 6; i++) {
        colorDots[i].style.backgroundColor = savedColorList[i];
    }
}