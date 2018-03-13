function Building(tempX, tempY, tempH) {
 //passed in digit of pi
 this.pi = tempH;

 this.x = tempX;
 this.y = tempY;

 //starting height
 this.height = 0;

 // console.log("Window for value: " + this.pi);
 // console.log(this.windows);
 this.windows = [];
 this.randWindows = [];

 //set targetHeight (for animating), mapping the input values (digits of pi) to heights between 0 and half of window height
 this.targetHeight = map(tempH, 0, 9, 0, windowHeight/2);

 //random speed at which building 'grows', so each building can animate at different rate
 this.growthRate = random(5, 9);

 this.show = function() {
    stroke(0);
    fill(0);
    //draw building, sizing building width to number of buildings specified in main sketch
    rect(this.x, this.y, windowWidth/buildingCount, this.height);
    //animate building height
    if (this.height > -this.targetHeight) {
        this.height -= this.growthRate;
        //constrain height to the target height (in case growth rate pushes it out of bounds)
        this.height = constrain(this.height, -this.targetHeight, 0);
    } else {
        //If windows haven't been made yet, make them and add lights
        if (this.windows.length == 0) {
          this.createWindows();
          this.lightWindows();
        }
        //show the windows
        for (var i = 0; i < this.windows.length; i++) {
          this.windows[i].show();
        }
    }


 }

 this.createWindows = function() {
   //loop through, and create as many rows of 3 lights as the digit of pi it represents, spacing out positioning
   for (var i = 0; i < this.pi * 3; i++) {
      for (var j = 1 ; j <= 3; j++) {
        var windowX = this.x + ( ((windowWidth/buildingCount) / 5) * j );
        var windowY = this.y - (-this.height) + (i * 12)+ 6;

        this.windows.push(new Window(windowX, windowY));
      }

   }
 }

 //loop through, and assign a lit color to random windows (the number of lit windows is the digit of pi represented)
 this.lightWindows = function() {
   for (var i = 0; i < this.pi; i++) {
     var randIndex = floor(random(0,this.windows.length-1));
     //if the random index picked is already in the array, pick another until it's a new one
     while (this.randWindows.includes(randIndex)) {
       randIndex = floor(random(0,this.windows.length-1));
     }
     //add the random number to the list
     this.randWindows.push(randIndex);
   }

   //Go through the random numbers, adding the lit color to the window matching the random indexes
   for (var j = 0; j < this.randWindows.length; j++) {
     this.windows[this.randWindows[j]].c = color(242, 221, 36);
   }
 }

}
