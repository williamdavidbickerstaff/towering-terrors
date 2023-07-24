const debug = false;

//navmesh tools;
let loadedJSON;
let points = [];
let interactions = [];
let vanishingPoints = [];

let backgroundImage;

//these variables are important so that sizes are kept standardized alongside the navmesh;
const canvasWidth = 320;
const canvasHeight = 240;
const scale = 3;

//character variables;
let clickedPosition;
let character;
let characterWalkAnimation;
let characterPosition;

//states
let state;

//text
let text;

function preload() {
  backgroundImage = loadImage('../p5scripts/home/Assets/templeOfTime.jpg');

  character = new Sprite(128, 160);
  character.addAni('../p5scripts/home/Assets/walkingAnimation/walkingSprite_01.png', 14);

  //scale part is to make sure that the json loaded is standardized with the scale;
  loadJSON('../p5scripts/home/Assets/vertexPoints.json', homeJSONLoaded);

  //changing pointer to hand thingy so that the user knows how to click;
  document.getElementById("canvas").style.cursor = "url(../cursor2.png), auto";
}

function homeJSONLoaded(loadedJSON) {
  points = loadedJSON.points;
  interactions = loadedJSON.clickPoints;
  vanishingPoints = loadedJSON.vanishingPoints;
}

function setup() {
  let canvas = createCanvas(canvasWidth * scale, canvasHeight * scale);
  canvas.parent(select('#canvas'));

  text = createP();
  text.parent(select('#text'));
  text.style('color', 'red');

  allSprites.pixelPerfect = true;

  character.ani.stop();
  character.pos = points[0];

  //load up state, and execute first state;
  state = 0;
}

function draw() {
  background(220);
  backgroundImage.resize(width, height);
  image(backgroundImage, 0, 0);

  if (abs(character.vel.x) >= 0.0125 || abs(character.vel.y) >= 0.0125) {
    character.ani.play();
  }
  else {
    character.ani.frame = 0;
    character.ani.stop();
  }

  //creating navmesh;
  if (points.length > 1) {
    if (!debug) noStroke();
    if (debug) stroke(255);
    noFill();
    beginShape();
    points.forEach(pt => vertex(pt.x, pt.y));
    endShape(CLOSE);
  }

  if (interactions.length > 1) {
    if (!debug) noStroke();
    if (debug) stroke(255,0,0);
    noFill();
    beginShape();
    interactions.forEach(pt => vertex(pt.x, pt.y));
    endShape(CLOSE);
  }

  characterPosition = createVector(character.x, character.y);

  //scaling, for perspective;
  let vanishingPointOne = createVector(vanishingPoints[0].x, vanishingPoints[0].y);
  let vanishingPointTwo = createVector(vanishingPoints[1].x, vanishingPoints[1].y);
  let meanDistance = (vanishingPointOne.dist(characterPosition) + vanishingPointTwo.dist(characterPosition))/2;
  let mappedDistance = map(meanDistance,400, 600, .7, 1.5);
  character.scale = mappedDistance;
  //

  //moving text to be on top of cursor.
  text.position(mouseX, mouseY);
}

function mousePressed() {
  clickedPosition = createVector(mouseX, mouseY);

  let moveToPosition = createVector(clickedPosition.x - character.width * .125, clickedPosition.y - character.height * .75);

  
  if (checkPoint(points, clickedPosition)) {
    character.moveTo(moveToPosition);
  }

  //clicked interaction point
  if (checkPoint(interactions, clickedPosition))
  {
    window.location.href = "https://homeisnota.house/toweringterrors/index.php/Castle_of_time";
  }
  
  //this is debug tools to add vertexes for the navmesh;
  if (debug) addVertex();
}

function keyPressed() {
  //this is debug tools to add vertexes for the navmesh;
  if (keyCode == ENTER) {
    if (debug) savePoints();
  }

  if (keyCode == BACKSPACE) {
    if (debug) addVanishingPoint();
  }

  if (keyCode == SHIFT) {
    if (debug) addClickPoint();
  }
}
