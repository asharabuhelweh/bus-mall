'use strict';

let productsArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const rightImage = document.getElementById( 'rightImage' );

const middleImage = document.getElementById( 'middleImage' );



let leftProductIndex = 0;
let middleProductIndex = 0;
let rightProductIndex = 0;

const clickCounter = 25;

function Products( name, nameExtension ) {
  this.name = name;
  this.nameExtension = nameExtension;
  this.image = `./img/${this.nameExtension}.jpg`;
  this.clicks = 0;
  this.shown = 0;
  Products.all.push( this );
}


Products.all = [];
Products.counter = 0;

//////////

for ( let i = 0; i < productsArray.length; i++ ) {
  new Products( productsArray[i],productsArray[i] );
}

function renderNewProducts() {
  let leftIndex = randomNumber( 0, Products.all.length - 1 );
  leftImage.src = Products.all[leftIndex].image;
  leftImage.alt = Products.all[leftIndex].name;
  leftProductIndex = leftIndex;

  let rightIndex;

  do {
    rightIndex = randomNumber( 0, Products.all.length - 1 );

  } while ( leftIndex === rightIndex );
  rightImage.src = Products.all[rightIndex].image;
  rightImage.alt = Products.all[rightIndex].name;
  rightProductIndex = rightIndex;


  let middleIndex;
  do {
    middleIndex = randomNumber( 0, Products.all.length - 1 );
  } while ( middleIndex === rightIndex || middleIndex === leftIndex );
  middleImage.src = Products.all[middleIndex].image;


  middleImage.alt = Products.all[middleIndex].name;


  middleProductIndex = middleIndex;






  Products.all[leftIndex].shown++;
  Products.all[middleIndex].shown++;
  Products.all[rightIndex].shown++;



  // rightImage.src = Product.all[0].image;

}


let button = document.getElementById( 'result' );
button.style.visibility = 'hidden';

function handelClick( event ) {

  if ( Products.counter <= clickCounter ) {
    const clickedElement = event.target;
    if ( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'middleImage' ) {
      if ( clickedElement.id === 'leftImage' ) {
        Products.all[leftProductIndex].clicks++;
      }

      if ( clickedElement.id === 'middleImage' ) {
        Products.all[rightProductIndex].clicks++;
      }

      if ( clickedElement.id === 'rightImage' ) {
        Products.all[middleProductIndex].clicks++;
      }

      Products.counter++;
      renderNewProducts();
    }
  }
  else {
    button.style.visibility = 'visible';
    console.log( Products.all );
  }
}

imageSection.addEventListener( 'click', handelClick );

function displayResult() {
  const parentElement = document.getElementById( 'result' );
  const ulElement = document.createElement( 'ul' );
  parentElement.appendChild( 'ulElement' );

  for ( let i = 0; i < Products.all.length; i++ ) {

    const liElement = document.createElement( 'li' );
    ulElement.appendChild( 'liElement' );
    liElement.textContent = Products.all[i].name + ' had ' + Products.all[i].clicks + ' voted, and was seen ' + Products.all[i].shown + ' times.';

  }

}

function removeListener() {
  document.getElementById( 'imageSection' ).removeEventListener( 'click', handelClick );
}

// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
renderNewProducts();



















