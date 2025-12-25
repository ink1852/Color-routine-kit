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


function handleSelectColor(colorinput, colorBox) {
    const chosenColor = colorinput.value;
    const colorDot = colorBox.querySelector("div");
    colorDot.classList.add("color-dot");
    colorDot.style.backgroundColor = chosenColor;
}
chosenColorInput_01.addEventListener("change",()=>{ handleSelectColor(chosenColorInput_01, chosenColorBox_01); });
chosenColorInput_02.addEventListener("change",()=>{ handleSelectColor(chosenColorInput_02, chosenColorBox_02); });
chosenColorInput_03.addEventListener("change",()=>{ handleSelectColor(chosenColorInput_03, chosenColorBox_03); });
chosenColorInput_04.addEventListener("change",()=>{ handleSelectColor(chosenColorInput_04, chosenColorBox_04); });
chosenColorInput_05.addEventListener("change",()=>{ handleSelectColor(chosenColorInput_05, chosenColorBox_05); });
chosenColorInput_06.addEventListener("change",()=>{ handleSelectColor(chosenColorInput_06, chosenColorBox_06); });


/* ====  ==== */