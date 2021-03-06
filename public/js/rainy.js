// The amount of circles we want to make:
var count = 50;

function SVGSymbol(file) {
  var sym = null;

  $.ajax({
    type: "GET",
    async: false,
    url: file,
    dataType: "xml",
    success: function (xml) {
      // import "svg/cloud.svg" file to the <svg> tag element in the html
      sym = new Symbol(project.importSVG(xml.getElementsByTagName("svg")[0]));
    }
  });

  return sym;

}

var svgSymbol = SVGSymbol("paperjs_svg/raindrop.svg");

// remove svg field from html after loaded.
var elem = document.getElementById('mySvg');
elem.parentNode.removeChild(elem);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
  // The center position is a random point in the view:
  var center = Point.random() * view.size;
  var placedSymbol = svgSymbol.place(center);
  placedSymbol.scale(i / count);
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
  // Run through the active layer's children list and change
  // the position of the placed symbols:
  for (var i = 0; i < count; i++) {
    var item = project.activeLayer.children[i];

    // Move the item 1/20th of its width to the right. This way
    // larger circles move faster than smaller circles:
    item.position.y += item.bounds.width / 10;

    // If the item has left the view on the right, move it back
    // to the left:
    if (item.bounds.top > view.size.height) {
      item.position.y = -item.bounds.height;
    }
  }
}
