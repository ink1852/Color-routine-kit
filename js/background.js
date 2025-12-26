const bgImg = document.getElementById("bg");

// 740 ~ 780 사이 랜덤 높이
const minHeight = 740;
const maxHeight = 780;
const randomHeight =
  Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

// 캐시 방지용 랜덤 값
const randomSeed = Math.floor(Math.random() * 100000);

// Lorem Picsum URL
const imageURL = `https://picsum.photos/1280/${randomHeight}?random=${randomSeed}`;

// 이미지 적용
bgImg.src = imageURL;

// 화면 전체 배경처럼 보이게 스타일 적용
bgImg.style.position = "fixed";
bgImg.style.top = "0";
bgImg.style.left = "0";
bgImg.style.width = "100vw";
bgImg.style.height = "100vh";
bgImg.style.objectFit = "cover";
bgImg.style.zIndex = "-1";
