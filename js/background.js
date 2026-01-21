const backgroundsImages = [
    "pexels-1.jpg",
    /* "pexels-2.jpg", */
    "pexels-3.jpg",
    "pexels-4.jpg",
    "pexels-5.jpg",
    "pexels-6.jpg",
    "pexels-7.jpg",
]

const chosenImage = backgroundsImages[Math.floor(Math.random() * backgroundsImages.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;
document.body.appendChild(bgImage);
bgImage.classList.add("background-img-style");



