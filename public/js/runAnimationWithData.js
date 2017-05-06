function runAnimationWithData(targetAnimation) {

  var targetAnimationData;
  if (targetAnimation === "snowAnimation") {
    targetAnimationData = snowAnimationData; // snowAnimationData coming from snowAnimation.js
  } else if (targetAnimation === "rainAnimation") {
    targetAnimationData = rainAnimationData;
  } else if (targetAnimation === "aquariumAnimation") {
    targetAnimationData = aquariumAnimationData;
  } else if (targetAnimation === "snowmanAnimation") {
    targetAnimationData = snowmanAnimationData;
  } else if (targetAnimation === "cowoAnimation") {
    targetAnimationData = cowoAnimationData;
  }

  var animData = {
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: targetAnimationData
  };

  var animation;
  setTimeout(function () {
    animation = bodymovin.loadAnimation(animData);
  }, 1000);

  setTimeout(function () {
    document.getElementById('animation-container').innerHTML = "";
  }, 7000);
}