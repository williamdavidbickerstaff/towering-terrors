const debug = false;

let village;
let rain;

let faceWindowEnabled;

let churchInteractionPoints = [];
let roadtocastleInteractionPoints = [];
let roadtobeachInteractionPoints = [];
let alleyInteractionPoints = [];

function preload() {
  loadJSON("./assets/vertexPoints.json", villageJSONLoaded);
}

function villageJSONLoaded(loadedJSON) {
  churchInteractionPoints = loadedJSON.clickPointNamespace.church;
  roadtocastleInteractionPoints = loadedJSON.clickPointNamespace.roadtocastle;
  roadtobeachInteractionPoints = loadedJSON.clickPointNamespace.roadtobeach;
  alleyInteractionPoints = loadedJSON.clickPointNamespace.alley;  
}

function setup() {
  village = createImg("./assets/village.png", () => {
    village.size(AUTO, 1000);
    //adding event listener;
    village.mouseClicked(villageClicked);
  });

  rain = createImg("./assets/rain.png", () => {
    rain.size(AUTO, 1000);
    rain.position(0, 0);
    
    rain.style("pointer-events", "none");

    rain.addClass("rellax");
    rain.attribute("data-rellax-speed", "25"); //defining the speed of the effect.
  
    let rellax = new Rellax(".rellax", {
      horizontal: true,
      //Disable vertical Parallax Scrolling
      vertical: false,
    });
  });

  let villageDiv = select("#village");
  village.parent(villageDiv);


  faceWindowEnabled = false;

  //adding all interaction point catagories;
  if (debug) {
    addClickPointList("church");
    addClickPointList("roadtocastle");
    addClickPointList("roadtobeach");
    addClickPointList("alley");
  }
}

function draw() {}

function windowResized() {
  rain.position(0, 0);
}

function keyPressed() {
  //debug commands;
  if (debug) {
    if (keyCode == ENTER) {
      savePoints();
    }

    //if keycode = c (church)
    if (keyCode == 67) {
      addClickPoint("church");
    }

    //if keycode = r (roadtocastle)
    if (keyCode == 82) {
      addClickPoint("roadtocastle");
    }

    //if keycode = b (beach)
    if (keyCode == 66) {
      addClickPoint("roadtobeach");
    }

    //if keycode = a (alley)
    if (keyCode == 65) {
      addClickPoint("alley");
    }
  }
}

function villageClicked() {
  let mousePosition = createVector(mouseX, mouseY);
  if (!debug) {
    if (checkPoint(churchInteractionPoints, mousePosition)) {
      print("church clicked");
    } else if (checkPoint(roadtocastleInteractionPoints, mousePosition)) {
      print("roadtocastle clicked");
      location.href = "https://homeisnota.house/toweringterrors/index.php/House_Road";
    } else if (checkPoint(roadtobeachInteractionPoints, mousePosition)) {
      print("roadtobeach clicked");
    } else if (checkPoint(alleyInteractionPoints, mousePosition)) {
      print("alley clicked");
      window.open(
        "https://homeisnota.house/toweringterrors/customPages/walkingScenes/alley/alley.html",
        "talkingPage",
        `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
							width=320,height=320,left=100,top=100`
      );
    } else if (!faceWindowEnabled) {
      window.open(
        "https://homeisnota.house/toweringterrors/customPages/talking/talking.html",
        "talkingPage",
        `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
							width=320,height=320,left=100,top=100`
      );
      faceWindowEnabled = true;
    }
  }
}
