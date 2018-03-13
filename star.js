function Star(tempX, tempY) {
  this.x = tempX;
  this.y = tempY;

  this.sizeX = random(4, 12);
  this.sizeY = random(4, 12);

  //Incrementing counter, used to make repeating flicker
  this.counter = 0;

  //Each star has randomly assigned interval between flickers
  this.flickerTime = floor(random(240, 960));

  this.show = function() {
    noStroke();

    //fluctuating brightness
    if (this.counter % this.flickerTime <= 1) {
      this.alpha = 20;
    } else {
      this.alpha = 128;
    }
    fill(255, this.alpha);
    ellipseMode(CENTER);
    //Ellipses are drawn to appear as crosses, based on random size values on creation
    ellipse(this.x, this.y, this.sizeX, this.sizeX/8);
    ellipse(this.x, this.y, this.sizeY/8, this.sizeY);

    //Increment the counter
    this.counter += 1;
  }
}
