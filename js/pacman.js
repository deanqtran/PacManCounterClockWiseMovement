// pos is the PacMan image position variable- it is set to 0 initially
var posX = 0;
var posY = 0;
//pageWidth is the width of the webpage. This is later used to calculate when Pac-Man needs to turn around. 
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;
//This array contains all the PacMan movement images
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

// this variable defines what horizontal direction should PacMan go into:
//  0 = left to right
//  1 = right to left (reverse)
// -1 = same x-position
var directionX = 0;

// this variable defines what horizontal direction should PacMan go into:
//  0 = top to bottom
//  1 = bottom to top (reverse)
// -1 = same y-position
var directionY = -1;

// This variable helps determine which PacMan image should be displayed. It flips between values 0 and 1
var focus = 0;

// This function is called on mouse click. Every time it is called, it updates the PacMan image, position and direction on the screen.
function Run() {
  let img = document.getElementById('PacMan');
  let imgWidth = img.width;
  let imgHeight = img.height;
  
  focus = (focus + 1) % 2;
  directionX = checkPageBoundsLeftRight(directionX, imgWidth, posX, pageWidth);
  directionY = checkPageBoundsTopBottom(directionY, imgHeight, posY, pageHeight);
  if (directionX === 0 || directionX === 1) {
	img.src = pacArray[directionX][focus];
  } else if (directionY === 0 || directionY === 1) {
	img.src = pacArray[directionY][focus];
  }
  
  // recalculate width, height of new image
  imgWidth = img.width;
  imgHeight = img.height;
  
  if (directionX === 1) {
    posX -= 20;
	posY = pageHeight-imgHeight;

	img.className = "rotated_zero";
	img.style.left = posX + 'px';
    img.style.top = posY + 'px'; // y-position is fixed value
  } else if (directionX === 0) {
    posX += 20;
	posY = 0;

	img.className = "rotated_zero";
    img.style.left = posX + 'px';
	img.style.top = posY + 'px'; // y-position is fixed value
  }
  if (directionY === 1) {
    posX = 0;
    posY -= 20;

	img.className = "rotated_90";
	img.style.left = posX + 'px'; // x-position is fixed value
    img.style.top = posY + 'px';
  } else if (directionY === 0) {
	posX = pageWidth-(imgHeight); // imgHeight is used because the first pairs of images are rotated 90 degrees
    posY += 20;

	img.className = "rotated_90";
	img.style.left = posX + 'px'; // x-position is fixed value
    img.style.top = posY + 'px';
  }
  setTimeout(Run, 200);
}
// TODO: Add a Javascript setInterval() method that will call the Run() function above every 200 milliseconds. Note: in the video, Dr. Williams uses the setTimeout() method, but here we are going to use a slightly different
// method called setInterval(), so that you can have practice using this method.
// Inside of the Run() function you will also have to add an extra argument "pageWidth", which is declared on line 4 when you call the checkPageBounds() function below. 
//setInterval(Run, 200);
Run();

// This function determines the direction of PacMan based on screen edge detection. 
function checkPageBoundsLeftRight(directionX, imgWidth, posX, pageWidth) {
  //
  // TODO: Complete this to reverse direction upon hitting screen edge
  //
  if ((directionX === 0) && (posX+imgWidth > pageWidth)) {
    directionX = -1;
	directionY = 0;
  } else if ((directionX === 1) && (posX < 0)) {
    directionX = -1;
	directionY = 1;
  }

  return directionX;
}

function checkPageBoundsTopBottom(directionY, imgHeight, posY, pageHeight) {
  //
  // TODO: Complete this to reverse direction upon hitting screen edge
  //
  if ((directionY === 0) && (posY+imgHeight > pageHeight)) {
    directionY = -1;
	directionX = 1;
  }
  if ((directionY === 1) && (posY < 0)) {
    directionY = -1;
	directionX = 0;
  }

  return directionY;
}
