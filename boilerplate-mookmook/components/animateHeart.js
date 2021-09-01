import Lottie from "lottie-web";

const animateHeart = () => {
  const animation = Lottie.loadAnimation({
    container: document.getElementById("like-container"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets5.lottiefiles.com/packages/lf20_sXVZLv.json",
  });
  setTimeout(() => {
    animation.stop();
    const heart = document.getElementById("like-container");
    heart.innerHTML = null;
    heart.style.display = "none";
  }, 3000);
};

export default animateHeart;
