//already have library for first person camera movement called "rovercam", going to extend it to fit what I need.
class Player extends RoverCam {
  //constructor involves using the super command to access the RoverCam variables, and making all the seperate variables i'll need, like gravity or grounded.
  //not 100 percent sure what some of the variables in rovercam do, like sensitivity, but i'm setting it to default value.
  //btw you can fly. I could make it so you can only move if you're grounded but its kind of a pain.
  constructor() {
      super();
      this.dimensions = createVector(1, 3, 1);
      this.velocity = createVector(0, 0, 0);
      this.gravity = createVector(0, 0.03, 0);
      this.grounded = false;
      this.speed = 0.02;
      this.sensitivity = 0.01;
  }

  //I would just like to say that the way that p5 handles vectors is bad
  //i dont blame them for it but hey ho, you should know.
  update() {
      this.velocity.add(this.gravity);
      this.position.add(this.velocity);
  }
}

//creating the plane object, which will handle all collisions. this is the hard part. got an energy drink.
class Plane {
  //plane colour can be changed with "Plane.fillColour = color(x,y,z);" at runtime.
  constructor(x, y, z, w, h, d) {
      this.position = createVector(x, y, z);
      this.dimensions = createVector(w, h, d);
      this.fillColour = color(0, 0, 0);
  }
  update() {
      //here we go, this is the code for all the collisions.
      //defining the 6 points which define the faces of the PLAYER colision box.
      let playerLeft = player.position.x - player.dimensions.x / 2;
      let playerRight = player.position.x + player.dimensions.x / 2;
      let playerTop = player.position.y - player.dimensions.y / 2;
      let playerBottom = player.position.y + player.dimensions.y / 2;
      let playerFront = player.position.z - player.dimensions.z / 2;
      let playerBack = player.position.z + player.dimensions.z / 2;

      //doing the same for the PLANE.
      let planeLeft = this.position.x - this.dimensions.x / 2;
      let planeRight = this.position.x + this.dimensions.x / 2;
      let planeTop = this.position.y - this.dimensions.y / 2;
      let planeBottom = this.position.y + this.dimensions.y / 2;
      let planeFront = this.position.z - this.dimensions.z / 2;
      let planeBack = this.position.z + this.dimensions.z / 2;

      // checking for overlap on any of the points.
      let planeLeftOverlap = playerRight - planeLeft;
      let planeRightOverlap = planeRight - playerLeft;
      let planeTopOverlap = playerBottom - planeTop;
      let planeBottomOverlap = planeBottom - playerTop;
      let planeFrontOverlap = playerBack - planeFront;
      let planeBackOverlap = planeBack - playerFront;

      //if the player is not inside the plane -->
      if (
          ((playerLeft > planeLeft && playerLeft < planeRight) ||
              (playerRight > planeLeft && playerRight < planeRight)) &&
          ((playerTop > planeTop && playerTop < planeBottom) ||
              (playerBottom > planeTop && playerBottom < planeBottom)) &&
          ((playerFront > planeFront && playerFront < planeBack) ||
              (playerBack > planeFront && playerBack < planeBack))
      ) {
          //gets the smaller value of each, then returns it if its over 0, if it is not, then return 0;
          let xOverlap = max(min(planeLeftOverlap, planeRightOverlap), 0);
          let yOverlap = max(min(planeTopOverlap, planeBottomOverlap), 0);
          let zOverlap = max(min(planeFrontOverlap, planeBackOverlap), 0);

          //this is handling all the collisions.
          //if the overlaps don't match up, then change the player positions.
          if (xOverlap < yOverlap && xOverlap < zOverlap) {
              if (planeLeftOverlap < planeRightOverlap) {
                  player.position.x = planeLeft - player.dimensions.x / 2;
              } else {
                  player.position.x = planeRight + player.dimensions.x / 2;
              }
          } else if (yOverlap < xOverlap && yOverlap < zOverlap) {
              if (planeTopOverlap < planeBottomOverlap) {
                  player.position.y = planeTop - player.dimensions.y / 2;
                  player.velocity.y = 0;
                  player.grounded = true;
              } else {
                  player.position.y = planeBottom + player.dimensions.y / 2;
              }
          } else if (zOverlap < xOverlap && zOverlap < yOverlap) {
              if (planeFrontOverlap < planeBackOverlap) {
                  player.position.z = planeFront - player.dimensions.x / 2;
              } else {
                  player.position.z = planeBack + player.dimensions.x / 2;
              }
          }
      }
  }

  //translate to plane position specified, fill the colour, and and spawn the plane!
  display() {
      push();
      translate(this.position.x, this.position.y, this.position.z);
      noStroke();
      fill(this.fillColour);
      box(this.dimensions.x, this.dimensions.y, this.dimensions.z);
      pop();
  }

  //put player on top of the plane.
  setPlayerAtStart(player) {
      player.reset();
      player.position = createVector(0, -3, 0);
  }
}

let canvasDiv;

function setup()
{
  canvasDiv.getElementById("canvas");
  let canvas = createCanvas(800, 800, WEBGL);
  canvas.parent(canvasDiv);

  player = new Player();
  player.usePointerLock();
  plane = new Plane(0, 0, 0, 10, 1, 10);
  plane.fillColour = color(255, 0, 0);
  plane.setPlayerAtStart(player);
}

function draw()
{
  background(0);
  player.update();
  plane.update();
  plane.display();
}