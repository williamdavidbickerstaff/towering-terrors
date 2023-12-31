//general functions;

const zeroPad = (num, places) => String(num).padStart(places, '0')

async function TypeWriter(element, text) {
    for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        element.html(text.charAt(i), true);
    }
}

//navmesh functions

let jsonPointsJSON = [];
let clickPointsJSON = [];
let vanishingPointsJSON = [];
let json = {};

function checkPoint(verts, pt) {
    let intersections = [];
    let c = false;

    // for each edge of the polygon
    for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
        // Compute the slope of the edge
        let slope = (verts[j].y - verts[i].y) / (verts[j].x - verts[i].x);

        // If the mouse is positioned within the vertical bounds of the edge
        if (((verts[i].y > pt.y) != (verts[j].y > pt.y)) &&
            // And it is far enough to the right that a horizontal line from the
            // left edge of the screen to the mouse would cross the edge
            (pt.x > (pt.y - verts[i].y) / slope + verts[i].x)) {

            // To help visualize the algorithm.
            intersections.push({ x: (pt.y - verts[i].y) / slope + verts[i].x, y: mouseY });
            // Flip the flag
            c = !c;
        }
    }
    return c;
}

function addVertex() {
    jsonPointsJSON.push(createVector(mouseX, mouseY));
}

function addVanishingPoint() {
    vanishingPointsJSON.push(createVector(mouseX, mouseY));
}

function addClickPoint()
{
    clickPointsJSON.push(createVector(mouseX, mouseY));
}

function savePoints() {
    json.points = jsonPointsJSON;
    json.clickPoints = clickPointsJSON;
    json.vanishingPoints = vanishingPointsJSON;
    saveJSON(json, 'vertexPoints.json')
}

class customSprite
{
    constructor(spriteImg, x, y)
    {
        this.image = spriteImg;
        this.position = createVector(x,y);
        this.animations = {};
        this.moving = false;
    }

    update()
    {
        imageMode(CENTER);
        image(this.image, this.position.x, this.position.y);
    }

    //making a lerp function that actually reaches its target;
    //requires a bit more effort, but that's okay.
    async moveTo(x, y, speed)
    {
        let timeElapsed = 0;
        let lerpDuration = this.position.dist(createVector(x,y)) / speed;

        while (timeElapsed < lerpDuration)
        {
            this.moving = true;
            this.position.lerp(x, y, timeElapsed / lerpDuration);
            timeElapsed = deltaTime;
        }

        this.position = createVector(x,y);
        this.moving = false;
    }

    //animation stuff;

    addAnimation(imageList, name)
    {
        this.animations[name] = [imageList, false];
    }

    async playAnimation(name)
    {
        //starting animation;
        //the boolean is so i can have a while loop that stops;
        this.animations[name][1] = true;
        if (this.animations[name][1])
        {
            for (let i = 0; i <= this.animations[name][0]; i ++)
            {
                this.image = this.animations[name][0][i];
                await new Promise(resolve => setTimeout(resolve, 20));
            }
        }
    }

    stopAnimation(name)
    {
        //changing the boolean therefore stopping the animation;
        this.animations[name][1] = false;
    }
}