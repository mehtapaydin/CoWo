
var data = {
  container: document.getElementById('animation-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: myData // coming from mehtap_data.js file to define all data as a js object

  // works when data is at remote server
  //path: 'https://labs.nearpod.com/bodymovin/demo/2016/data.json'

  // path not worked for local hosted files
  //path: 'http://localhost:8000/public/animation_data/2016.json'
};

var animation = bodymovin.loadAnimation(data);