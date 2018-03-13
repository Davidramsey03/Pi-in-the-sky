var stars = [];
//number of stars in background
var starCount = 20;

var buildings = [];
//Supports values up to length of piDigits array;
var buildingCount;

//input for changing number of buildings on the fly
var inp;

//text greeting
var greeting;

//digits of pi to pull from
var piDigits = [3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0,2,8,8,5,1,9,7,1,6,9,3,9,9,3,7,5,1,0,5,8,2,0,9,7,4,9,4];

function setup() {
  //make canvas size of browser window
  createCanvas(windowWidth, windowHeight);

  buildingCount = floor(windowWidth/55);
  //Create DOM input for adjusting building count
  inp = createInput(buildingCount);
  //assign id to input (used for validation and constraining later)
  inp.id('buildings');

  //Reset buildings when changing input value
  inp.input(resetBuildings);

  //create star objects by pushing into stars array
  for (var i = 0; i < starCount; i++) {
      //star objects create randomly across top half of window
      stars.push(new Star(random(windowWidth), random(windowHeight/2)));
  }

  // Reset/Intialize buildings
  resetBuildings();

  setTimeout(makeGreeting, 5000);
}

function draw() {
  //Draw the sunset
  sunset();

  //Show the stars, star flicker contained within star's show function
  for (var i = 0; i < stars.length; i++) {
    stars[i].show();
  }

  //Show the buildings
  for (var i = 0; i < buildings.length; i++) {
    buildings[i].show();
  }

  fill(255);
  textFont("Righteous");
  textAlign(LEFT);
  textSize(20);
  text("Buildings / Digits", 90, 70);

  if (greeting) { greeting.show(); }
}


function windowResized() {
  //Resize canvas to match window size
  resizeCanvas(windowWidth, windowHeight);
  //Reset and redraw buildings at new window size
  resetBuildings();
  //Re-center the text greeting
  greeting.x = windowWidth / 2;
}


function makeGreeting() {
  //create the greeting text object
  greeting = new Greeting();
}



function resetBuildings() {

  if (isNaN(inp.value())) {
    //If input value isn't a number, give it the default one
    document.querySelector('#buildings').value = 40;
  } else if (inp.value() > piDigits.length) {
    //If input value is greater than digits we have, max the value out
    document.querySelector('#buildings').value = piDigits.length;
  } else if (inp.value() < 1) {
    //If input value is less than 1, make it 1
    document.querySelector('#buildings').value = 1;
  }
  //Update the building count to the input value
  buildingCount = inp.value();

  //Dump the buildings array to rebuild
  buildings.length = 0;

  //Add the buildings
  for (var i = 0; i < buildingCount; i++) {

    //set building height to next digit of pi
    var b1height = piDigits[i];
    //Create new buildings, spacing apart x values by width of building, and passing in the height
    buildings.push(new Building((windowWidth/buildingCount) * i, windowHeight, b1height));
  }

}

//Take 4 colors, and make a gradient sunset out of them
function sunset() {
  c1 = color(0, 7, 43);
  c2 = color(24, 32, 94);
  c3 = color(68, 74, 134);
  c4 = color(228, 87, 3);
  setGradient(0, 0, windowWidth, windowHeight/4, c1, c2);
  setGradient(0, windowHeight/4, windowWidth, windowHeight/4, c2, c3);
  setGradient(0, (windowHeight/4) * 2, windowWidth, windowHeight/2, c3, c4);
}

//Build gradient line by line
function setGradient(x, y, w, h, c1, c2) {

  noFill();

  for (var i = y; i <= y+h; i++) {
    var inter = map(i, y, y+h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x+w, i);
  }

}
