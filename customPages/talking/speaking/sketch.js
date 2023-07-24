let face;
let colour;
let fadeInDuration = 4;
 
let text;

function preload()
{
}

function setup()
{
	frameRate(12);
	let cnv = createCanvas(300,300);
	cnv.id('canvas');
	face = loadImage('speaking/assets/faceBlue.png');
	text = createP('');
	//text.style('position', 'absolute');
	text.position(40,40);
	textAnimationStarted = false;
}

function draw()
{
	background(255);
	if (frameCount <= frameRate() * fadeInDuration)
	{
		loadPixels();
		pixelDensity(lerp(0,1,map(frameCount,0, frameRate() * fadeInDuration, 0.01,1)));
		//print(pixelDensity());
		updatePixels();
	}

	image(face, 0, 0, 300, 300);

	if (frameCount >= frameRate() * fadeInDuration && text.html() == '')
	{
		text.html(text.html() + '<br>');
		TypeWriter(text, 'speak');
	}
}
