let cradlerCrawler;

let theta = 0;

function preload() {
  cradlerCrawler = loadImage("cradlerScripts/assets/cradlerCrawler.png");
}

function setup() {
  let cnv = createCanvas(420, 315);
  let cnvdiv = createDiv();
  cnv.parent(cnvdiv);
  cnvdiv.style('position', "fixed");
  cnvdiv.style('top', "50%");
  cnvdiv.style('left', "50%");
  cnvdiv.style('transform', "translate(-50%, -50%)");

  frameRate(12);
}

function draw() {
  background(255);
  let oscillateValue = sin(theta) * 0.005;
  theta += 0.3;
  scale(1 + oscillateValue);
  image(cradlerCrawler, 0, 0, width, height);
}
