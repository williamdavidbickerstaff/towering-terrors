//this is a test for key uploading stuff etc.
const debug = true;

let canvas;
let input;
let inputLabel;

function setup()
{
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("left", "0px");
  canvas.style("top", "0px");

  input = createFileInput(handleFile);
  input.position(10,10);
  input.id("files");
  input.style("visibility", "hidden");

  inputLabel = select("#label");
  inputLabel.html("add to your bag");
  inputLabel.position(20, 20);

  background(255);
}

function handleFile(file)
{
  if (file.type = "json")
  {
    print(file.data);
    if (file.data.crawler)
    {
      print('match');
    }
  }
}

function keyPressed()
{
  if (keyCode == ENTER && debug)
  {
    createStringDict({
      crawler: true
    }).saveJSON('crawler');
  }
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}