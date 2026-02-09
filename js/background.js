const backgroundsImages = [
    /* "pexels-1.jpg",
    //"pexels-2.jpg",
    "pexels-3.jpg",
    "pexels-4.jpg",
    "pexels-5.jpg",
    "pexels-6.jpg",
    "pexels-7.jpg", */
    "pexels-01.jpg",
    "pexels-02.jpg",
    "pexels-03.jpg",
    "pexels-04.jpg",
]



const chosenImage = backgroundsImages[Math.floor(Math.random() * backgroundsImages.length)];

const bgImage = document.createElement("img");

bgImage.src = `${chosenImage}`;
document.body.appendChild(bgImage);
bgImage.classList.add("bg-image");



