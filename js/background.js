const backgroundsImages = [
/*     "pexels-01.jpg",
    "pexels-02.jpg",
    "pexels-03.jpg", */
    "pexels-04.jpg",
    "img/pexels-4.jpg",
]



const chosenImage = backgroundsImages[Math.floor(Math.random() * backgroundsImages.length)];

const bgImage = document.createElement("img");

bgImage.src = `${chosenImage}`;
document.body.appendChild(bgImage);
bgImage.classList.add("bg-image");



