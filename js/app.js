'use strict';

let productsArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let button = document.getElementById( 'noor' );
const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const rightImage = document.getElementById( 'rightImage' );

const middleImage = document.getElementById( 'middleImage' );



let leftProductIndexMemory = 0;
let middleProductIndexMemory = 0;
let rightProductIndexMemory = 0;
let previous = [];

const clickCounter = 25;

function Products( name ) {
  this.name = name.split( '.' )[0];
  this.image = `./img/${name}`;
  this.clicks = 0;
  this.shown = 0;
  Products.all.push( this );
}


Products.all = [];
Products.counter = 0;

//////////

for ( let i = 0; i < productsArray.length; i++ ) {
  new Products( productsArray[i] );
}

function renderNewProducts() {
  button.style.visibility = 'hidden';


  // find a random left image
  let leftIndex;
  do {
    leftIndex = randomNumber( 0, Products.all.length - 1 );
  }
  while ( previous.indexOf( leftIndex ) !== -1 );
  // } while ( leftIndex === leftProductIndexMemory && ( leftIndex===rightProductIndexMemory|| leftIndex=== rightIndex ) && ( leftIndex===middleIndex||leftIndex===middleProductIndexMemory ) );
  leftImage.src = Products.all[leftIndex].image;
  leftImage.alt = Products.all[leftIndex].name;
  // remember the left image
  leftProductIndexMemory = leftIndex;

  // find a random right image , that is not the same as before and not the same as the left image
  let rightIndex;
  do {

    rightIndex = randomNumber( 0, Products.all.length - 1 );
  }
  while ( rightIndex === leftIndex || previous.indexOf( rightIndex ) !== -1 );

  // } while ( rightIndex === rightProductIndexMemory && ( rightIndex===leftProductIndexMemory|| rightIndex ===leftIndex ) && ( rightIndex===middleIndex||rightIndex===middleProductIndexMemory ) );
  rightImage.src = Products.all[rightIndex].image;
  rightImage.alt = Products.all[rightIndex].name;
  // remember the right image
  rightProductIndexMemory = rightIndex;


  // find a random middle image, that is not the same as before, and not the same as the right and the left image
  let middleIndex;
  do {
    middleIndex = randomNumber( 0, Products.all.length - 1 );
  }
  while ( leftIndex === middleIndex || rightIndex === middleIndex || previous.indexOf( middleIndex ) !== -1 );

  // } while ( middleIndex === middleProductIndexMemory && ( middleIndex===rightProductIndexMemory|| middleIndex=== rightIndex ) && ( middleIndex===leftIndex || middleIndex===middleProductIndexMemory ) );
  middleImage.src = Products.all[middleIndex].image;
  middleImage.alt = Products.all[middleIndex].name;
  // remember the middle image
  // middleProductIndexMemory = middleIndex;
  previous[0] = leftIndex;
  previous[1] = rightIndex;
  previous[2] = middleIndex;

  Products.all[leftIndex].shown++;
  Products.all[middleIndex].shown++;
  Products.all[rightIndex].shown++;

}




function handelClick( event ) {
  event.preventDefault();


  if ( Products.counter <= clickCounter ) {
    const clickedElement = event.target;
    if ( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'middleImage' ) {
      if ( clickedElement.id === 'leftImage' ) {
        Products.all[leftProductIndexMemory].clicks++;
      }

      if ( clickedElement.id === 'middleImage' ) {
        Products.all[rightProductIndexMemory].clicks++;
      }

      if ( clickedElement.id === 'rightImage' ) {
        Products.all[middleProductIndexMemory].clicks++;
      }

      Products.counter++;
      renderNewProducts();
      localStorage.setItem( 'result', JSON.stringify( Products.all ) );
      console.log( Products.prototype );
    }

  }


  else {
    noora();
  }

}


imageSection.addEventListener( 'click', handelClick );

function displayResult() {
  const parentElement = document.getElementById( 'result' );

  for ( let i = 0; i < Products.all.length; i++ ) {

    const liElement = document.createElement( 'li' );
    parentElement.appendChild( liElement );
    liElement.textContent = Products.all[i].name + ' had ' + Products.all[i].clicks + ' voted, and was seen ' + Products.all[i].shown + ' times.';

  }

}




function noora() {
  button.style.visibility = 'visible';
}

function removeListener() {
  document.getElementById( 'imageSection' ).removeEventListener( 'click', handelClick );
}

//  Helper function
// function randomNumber( min, max ) {
//   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
// }
// renderNewProducts();


function getData() {
  const data = localStorage.getItem( 'result' );
  if ( data ) {
    const objData = JSON.parse( data );
    Products.all = objData;
    renderNewProducts();
  }
}
button.addEventListener( 'noor', handelClick );
getData();


function renderChart() {

  let nameArray = [];
  let clicksArray = [];
  let shownArray = [];

  for ( let i = 0; i < Products.all.length; i++ ) {
    nameArray.push( Products.all[i].name );
    clicksArray.push( Products.all[i].clicks );
    shownArray.push( Products.all[i].shown );


  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [{
        label: '# Clicks ',
        data: clicksArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(191, 138, 244, 0.2)',
          'rgba(244, 138, 221, 0.2)',
          'rgba(244, 244, 208, .2)',
          'rgba(220, 172, 121, .2)',
          'rgba(20, 100, 137, .2)',
          'rgba(153, 230, 75, .2)',
          'rgba(78, 12, 89, .2)',
          'rgba(207, 83, 16, .2)',
          'rgba(207, 16, 45, .2)',
          'rgba(1, 14, 5, .2)',
          'rgba(35, 146, 184, .2)',
          'rgba(174, 184, 35, .2)',
          'rgba(155, 162, 57, .2)',
          'rgba(162, 57, 155, .2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(191, 138, 244, 1)',
          'rgba(244, 138, 221, 1)',
          'rgba(244, 244, 208, 1)',
          'rgba(220, 172, 121, 1)',
          'rgba(20, 100, 137, 1)',
          'rgba(153, 230, 75, 1)',
          'rgba(78, 12, 89, 1)',
          'rgba(207, 83, 16, 1)',
          'rgba(207, 16, 45, 1)',
          'rgba(1, 14, 5, 1)',
          'rgba(35, 146, 184, 1)',
          'rgba(174, 184, 35, 1)',
          'rgba(155, 162, 57, 1)',
          'rgba(162, 57, 155, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# Shown',
        data: shownArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(191, 138, 244, 0.2)',
          'rgba(244, 138, 221, 0.2)',
          'rgba(244, 244, 208, 0.2)',
          'rgba(220, 172, 121, 0.2)',
          'rgba(20, 100, 137, 0.2)',
          'rgba(153, 230, 75, 0.2)',
          'rgba(78, 12, 89, 0.2)',
          'rgba(207, 83, 16, 0.2)',
          'rgba(207, 16, 45, 0.2)',
          'rgba(1, 14, 5, 0.2)',
          'rgba(35, 146, 184, 0.2)',
          'rgba(174, 184, 35, 0.2)',
          'rgba(155, 162, 57, 0.2)',
          'rgba(162, 57, 155, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(191, 138, 244, 1)',
          'rgba(244, 138, 221, 1)',
          'rgba(244, 244, 208, 1)',
          'rgba(220, 172, 121, 1)',
          'rgba(20, 100, 137, 1)',
          'rgba(153, 230, 75, 1)',
          'rgba(78, 12, 89, 1)',
          'rgba(207, 83, 16, 1)',
          'rgba(207, 16, 45, 1)',
          'rgba(1, 14, 5, 1)',
          'rgba(35, 146, 184, 1)',
          'rgba(174, 184, 35, 1)',
          'rgba(155, 162, 57, 1)',
          'rgba(162, 57, 155, 1)',
        ],
        borderWidth: 1
      }
      ]


    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
renderNewProducts();

