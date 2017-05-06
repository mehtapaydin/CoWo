var elementsArr = ['ambulance','apple','atoms','bandaid','bicycle','bottle','cross','eye','female_doctor','female_nurse','male_doctor','male_nurse','dropper','heart','mobile','pills','stethoscope','syringe','thermometer','tubes'];
var currentPage = 0;
var itemsPerPage = 4;
var icons = [];
var navText;

function buildIcons(){
  var element, anim;
  for(var i=0;i<elementsArr.length;i+=1){
    element = document.getElementById('icon-container-'+elementsArr[i]);
    element.style.display = 'none';
    var params = {
      container: document.getElementById('icon-'+elementsArr[i]),
      autoplay:false,
      loop:false,
      animationData:animations[elementsArr[i]],
      renderer:'svg'
    };
    anim = bodymovin.loadAnimation(params);
    icons.push({
      anim:anim,
      element: element
    })
  }
}

function buildNavigation(){
  navText = document.getElementById('navText');
  var nextButton = document.getElementById('nextButton');
  nextButton.addEventListener('click', function(){
    movePage(1);
  })
  var prevButton = document.getElementById('prevButton');
  prevButton.addEventListener('click', function(){
    movePage(-1);
  })
}


function renderPage(){
  var i, len = icons.length;
  for(i=0;i<len;i+=1){
    if(i<currentPage*itemsPerPage || i>=(currentPage+1)*itemsPerPage){
      icons[i].element.style.display = 'none';
      icons[i].anim.goToAndStop(0);
    } else {
      icons[i].element.style.display = 'inline-block';
      icons[i].anim.play();
    }
  }
  navText.innerHTML = (currentPage+1)+'/'+Math.ceil(icons.length/itemsPerPage);
}

function movePage(dir){
  if(currentPage === 0 && dir < 0){
    return;
  } else if((currentPage+1)*itemsPerPage > icons.length - 1 && dir > 0){
    return;
  }
  currentPage += dir;
  renderPage();

}

buildIcons();
buildNavigation();
renderPage();