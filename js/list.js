/* ==== List 기능 ==== */

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

let defaultColors = ["", "", "", "", "", ""];

function showColor(color, colorLocation) {
    /* const chosenColor = colorinput.value; */
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

    showColor(chosenColor, colorLocation);

    localStorage.setItem(KEY_COLORS, JSON.stringify(defaultColors));
}
chosenColorInput_01.addEventListener("change", () => { handleSelectColor(chosenColorInput_01, chosenColorBox_01); });
chosenColorInput_02.addEventListener("change", () => { handleSelectColor(chosenColorInput_02, chosenColorBox_02); });
chosenColorInput_03.addEventListener("change", () => { handleSelectColor(chosenColorInput_03, chosenColorBox_03); });
chosenColorInput_04.addEventListener("change", () => { handleSelectColor(chosenColorInput_04, chosenColorBox_04); });
chosenColorInput_05.addEventListener("change", () => { handleSelectColor(chosenColorInput_05, chosenColorBox_05); });
chosenColorInput_06.addEventListener("change", () => { handleSelectColor(chosenColorInput_06, chosenColorBox_06); });



const savedChosenColor = JSON.parse(localStorage.getItem(KEY_COLORS));

if (savedChosenColor !== null) {
    showColor(savedChosenColor[0], chosenColorBox_01);
    showColor(savedChosenColor[1], chosenColorBox_02);
    showColor(savedChosenColor[2], chosenColorBox_03);
    showColor(savedChosenColor[3], chosenColorBox_04);
    showColor(savedChosenColor[4], chosenColorBox_05);
    showColor(savedChosenColor[5], chosenColorBox_06);
    defaultColors = savedChosenColor;
    localStorage.setItem(KEY_COLORS, JSON.stringify(savedChosenColor));




}
else {
    localStorage.setItem(KEY_COLORS, JSON.stringify(defaultColors));
}