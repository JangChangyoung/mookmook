import Lottie from "lottie-web";

const animateHeart = (targetNodeId) => {
  const animation = Lottie.loadAnimation({
    container: document.getElementById("like-container"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets5.lottiefiles.com/packages/lf20_sXVZLv.json",
  });
  setTimeout(() => {
    animation.stop();
    // document.getElementById("like-container").innerHTML = null;
  }, 3000);
};

export default animateHeart;
