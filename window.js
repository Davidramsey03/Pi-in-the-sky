function Window(tempX, tempY) {
  this.x = tempX;
  this.y = tempY;

  //set the default window color
  this.c = color(10, 10, 10);

  this.show = function() {
    stroke(0);
    strokeWeight(2);
    fill(this.c);
    rect(this.x, this.y, 10, 10);
  }
}
