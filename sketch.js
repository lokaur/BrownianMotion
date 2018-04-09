var points = [];
var threshold = 5;
var canvasWidth = 300;
var canvasHeight = 300;
var speed = 5;
var radius = 8;
var moveThreshold = 3;

function setup() {
  createCanvas(displayWidth, displayHeight);
  canvasWidth = displayWidth;
  canvasHeight = displayHeight;
  for (var i = 0; i < 100; i++) {
    points[i] = new Point(-1, -1);
  }
}

function draw() {
  background(0);

  for (var i = 0; i < points.length; i++) {
    points[i].drawPoint();
    points[i].movePoint();
  }

  tryCreateNewPoints();
}

function tryCreateNewPoints() {
//  if (points.length >= 500)
  //  return;

  for (var i = 0; i < points.length; i++) {
    for (var j = i; j < points.length; j++) {
      if (i == j)
        continue;

      var point1 = points[i];
      var point2 = points[j];

      if (isPointsNearEnough(point1, point2)) {
        if (random(0, 1) <= 0.1)
        {
          console.clear();
          console.log('new born: ' + points.length);
         // points[points.length] = new Point(point1.x + 2 * threshold, point1.y + 2 * threshold);
          points[points.length] = new Point(-1, -1);
        }
      }
    }
  }
}

function isPointsNearEnough(point1, point2) {
  return abs(point1.x - point2.x) < threshold && abs(point1.y - point2.y) < threshold;
}

function Point(x, y)
{
  this.x = x == -1 ? random(0, canvasWidth) : x;
  this.y = y == -1 ? random(0, canvasHeight) : y;
  this.r = radius;
  this.color = getRandomColor();

  this.drawPoint = function() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  };

  this.movePoint = function() {
    var newPosition = getRandomPosition(this.x, this.y);
    if (isPositionOccupied(newPosition[0], newPosition[1]))
      return;

    this.x = newPosition[0];
    this.y = newPosition[1];
  };
}

function isPositionOccupied(x, y)
{
  for (var i = 0; i < points.length; i++) {
    if (abs(points[i].x - x) < moveThreshold && abs(points[i].y - y) < moveThreshold)
      return true;
  }

  return false;
}

function getRandomPosition(currentX, currentY)
{
  var newX = currentX + random(-speed, speed);
  var newY = currentY + random(-speed, speed);

  return newX >= 0 && newX <= canvasWidth && newY >= 0 && newY <= canvasHeight
    ? [newX, newY]
    : [currentX, currentY];
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
