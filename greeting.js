function Greeting() {
  //center horizontally
  this.x = windowWidth / 2;
  //start above the screen
  this.y = -200;
  //end in the top quarter of the screen
  this.targetY = windowHeight / 4;
  //start and end fontsize for effect
  this.tSize = 10;
  this.targetTextSize = 100;

  this.show = function() {
    //animate down onto screen
    if (this.y < this.targetY) {
      this.y += 5;
    }
    //animate font size up to target size
    if (this.tSize < this.targetTextSize) {
      this.tSize *= 1.02;
    }

    noStroke();
    fill(255,255,255,80);
    textAlign(CENTER);
    textFont("Righteous");
    textSize(this.tSize);
    text("Happy π Day!", this.x, this.y);
  }
}
