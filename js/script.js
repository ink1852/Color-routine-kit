/*================================
List 기능
=================================*/

const colorComponents = document.querySelectorAll(".color-list__color-component");
const chosenColorInput_01 = colorComponents[0].querySelector("label input[type=color]");
const chosenColorBox_01 = colorComponents[0].querySelector("label div.color-box");

const chosenColorInput_02 = colorComponents[1].querySelector("label input[type=color]");
const chosenColorBox_02 = colorComponents[1].querySelector("label div.color-box");

const chosenColorInput_03 = colorComponents[2].querySelector("label input[type=color]");
const chosenColorBox_03 = colorComponents[2].querySelector("label div.color-box");

const chosenColorInput_04 = colorComponents[3].querySelector("label input[type=color]");
const chosenColorBox_04 = colorComponents[3].querySelector("label div.color-box");

const chosenColorInput_05 = colorComponents[4].querySelector("label input[type=color]");
const chosenColorBox_05 = colorComponents[4].querySelector("label div.color-box");

const chosenColorInput_06 = colorComponents[5].querySelector("label input[type=color]");
const chosenColorBox_06 = colorComponents[5].querySelector("label div.color-box");

const KEY_COLORS = "colors";
const KEY_CURRENT_COLOR = "current color";

let defaultColors = ["", "", "", "", "", ""];
localStorage.setItem(KEY_CURRENT_COLOR, "#00000067");

function showColor(color, colorLocation) {
    /*  const chosenColor = colorinput.value; */
    const colorDot = colorLocation.querySelector("div");
    colorDot.classList.add("color-dot");
    colorDot.style.backgroundColor = color;
}

function handleSelectColor(colorinput, colorLocation) {

    const chosenColor = colorinput.value;

    if (colorinput == chosenColorInput_01) {
        defaultColors[0] = chosenColor;
    }
    if (colorinput == chosenColorInput_02) {
        defaultColors[1] = chosenColor;
    }
    if (colorinput == chosenColorInput_03) {
        defaultColors[2] = chosenColor;
    }
    if (colorinput == chosenColorInput_04) {
        defaultColors[3] = chosenColor;
    }
    if (colorinput == chosenColorInput_05) {
        defaultColors[4] = chosenColor;
    }
    if (colorinput == chosenColorInput_06) {
        defaultColors[5] = chosenColor;
    }
    localStorage.setItem(KEY_CURRENT_COLOR, chosenColor);

    showColor(chosenColor, colorLocation);

    localStorage.setItem(KEY_COLORS, JSON.stringify(defaultColors));


}

function chooseColor(colorinput, colorLocation) {
    colorinput.addEventListener("click", () => {
        localStorage.setItem(KEY_CURRENT_COLOR, colorinput.value);
        colorinput.addEventListener("change", () => {
            handleSelectColor(colorinput, colorLocation);
        });
    });
}

chooseColor(chosenColorInput_01, chosenColorBox_01);
chooseColor(chosenColorInput_02, chosenColorBox_02);
chooseColor(chosenColorInput_03, chosenColorBox_03);
chooseColor(chosenColorInput_04, chosenColorBox_04);
chooseColor(chosenColorInput_05, chosenColorBox_05);
chooseColor(chosenColorInput_06, chosenColorBox_06);

const savedColors = JSON.parse(localStorage.getItem(KEY_COLORS));

if (savedColors !== null) {
    showColor(savedColors[0], chosenColorBox_01);
    showColor(savedColors[1], chosenColorBox_02);
    showColor(savedColors[2], chosenColorBox_03);
    showColor(savedColors[3], chosenColorBox_04);
    showColor(savedColors[4], chosenColorBox_05);
    showColor(savedColors[5], chosenColorBox_06);
    defaultColors = savedColors;
    localStorage.setItem(KEY_COLORS, JSON.stringify(savedColors));

}
else {
    localStorage.setItem(KEY_COLORS, JSON.stringify(defaultColors));
}

const routineBoxs = document.querySelectorAll(".time-row__routine");

routineBoxs.forEach((routineBox) => {

    routineBox.addEventListener("mouseenter", () => {
        const currentColor = localStorage.getItem(KEY_CURRENT_COLOR);
        routineBox.style.backgroundColor = currentColor;
    });

});
