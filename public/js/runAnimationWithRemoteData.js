function runAnimationWithRemoteData() {

  var animData = {
    container: document.getElementById('animation-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://labs.nearpod.com/bodymovin/demo/2016/data.json'
  };

  var animation;
  setTimeout(function () {
    animation = bodymovin.loadAnimation(animData);
  }, 1000);

  setTimeout(function () {
    document.getElementById('animation-container').innerHTML = "";
  }, 7000);

}