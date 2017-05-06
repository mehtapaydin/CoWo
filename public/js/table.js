// CHANGE THE SERVER URL WITH INTERNAL NETWORK PUBLIC ADDRESS
var serverURL = "192.168.0.5:3000";
var tableId = generateID();
var idCounter = 0;
var cardsOnTheTable = [];
var connectedDeviceCount = 0;

// on ready
document.addEventListener('DOMContentLoaded', function () {

  // connect to websocket server
  var socket = io(serverURL);

  // register card table socket
  socket.emit('table-connect', tableId);

  // listen to phone movements
  socket.on('phone-move', phoneMoved);

  // listen to phone connections
  socket.on('phone-connect', phoneConnected);

  // listen to card arrivals
  socket.on('phone-throw-card', throwCard);

  // and the URL
  document.getElementById("url").innerHTML = "http://" + serverURL + "/device?id=" + tableId;

  // set the qrcode
  qrCodeGenerator("http://" + serverURL + "/device?id=" + tableId, "placeholder");


}, false);


// CALLBACK FUNCTIONS

function phoneMoved(angle) {
  // change angle of the phone direction indicator
  var path = document.querySelector("#phone-move.path");
  path.style = `transform: rotate(${angle}deg)`;
}

function throwCard(card) {

  var cardId = 'card' + idCounter;

  // add card to table
  injectCardToHtml(cardId, card.angle, card.type);
  checkTableStatusForAnimation(card);

  // little hack to trigger the animation
  setTimeout(function () {
    var cardElement = document.getElementById(cardId);
    // add 'thrown' class to start animation
    cardElement.className += " thrown";
    // set thrown strength
    cardElement.style = "transform: translateY(" + (100 - card.strength) + "vh) scale(1)";
  }, 100);
}

function phoneConnected() {
  connectedDeviceCount++;
  // remove banner when 2 phone connects
  if (connectedDeviceCount === 2) {
    document.getElementById("waiting-for-device").remove();
  }
}


// AUX METHODS

function checkTableStatusForAnimation(card) {

  cardsOnTheTable[idCounter] = card;

  if (idCounter === 0) { // this is the first card just added to the table above, so just increment counter

    idCounter++;

  } else if (idCounter === 1) { // this card is the second one, there is already one on the table.

    var firstCard = cardsOnTheTable[0];

    if (firstCard.type === 'cloud' && card.type === 'cloud') {

      openCloseWindow("/cloudy");

    } else if (firstCard.type === 'rain' && card.type === 'rain') {

      openCloseWindow("/rainy");

    } else if (firstCard.type === 'snow' && card.type === 'snow') {

      openCloseWindow("/snowy");

    } else if ((firstCard.type === 'cloud' && card.type === 'flash') || (firstCard.type === 'flash' && card.type === 'cloud')) {

      runAnimationWithData("rainAnimation");

    } else if ((firstCard.type === 'snow' && card.type === 'flash') || (firstCard.type === 'flash' && card.type === 'snow')) {

      runAnimationWithData("rainAnimation");  

    } else if ((firstCard.type === 'water' && card.type === 'fish') || (firstCard.type === 'fish' && card.type === 'water')) {

      runAnimationWithData("aquariumAnimation");

    } else if ((firstCard.type === 'cloud' && card.type === 'ice') || (firstCard.type === 'ice' && card.type === 'cloud')) {

      runAnimationWithData("snowAnimation");

    } else if ((firstCard.type === 'snow' && card.type === 'ice') || (firstCard.type === 'ice' && card.type === 'snow')) {

      runAnimationWithData("snowAnimation");  

    } else if ((firstCard.type === 'carrot' && card.type === 'snow') || (firstCard.type === 'snow' && card.type === 'carrot')) {

      runAnimationWithData("snowmanAnimation");

    } else {
      runAnimationWithData("cowoAnimation");
    }

    // clean the table for the next round after 1.3 seconds
    setTimeout(function () {
      cleanTable();
    }, 1300);
  }

}

function openCloseWindow(endpoint) {
  var newWindow;
  setTimeout(function () {
    newWindow = window.open(endpoint);
  }, 1300);

  setTimeout(function () {
    newWindow.close();
  }, 6000);
}

function injectCardToHtml(id, angle, type) {
  // inject card html to the page body
  document.body.innerHTML +=
    `<div class="path" style="transform: rotate(${angle}deg)">
            <div id="${id}" class="card ${type}">
                <div class="face"/>
            </div>
        </div>`;
}

function cleanTable() {
  // clean the table for the next round
  cardsOnTheTable = [];
  idCounter = 0;
  document.getElementById("card0").remove();
  document.getElementById("card1").remove();
}

function generateID() {
  // generate random 5 character id for the session
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }
  var uuid = 'xxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

function qrCodeGenerator(address, elementId) {
  // generates a qrcode based on a value inside an html element
  var qrcode = new QRCode(elementId);
  qrcode.makeCode(address);
}