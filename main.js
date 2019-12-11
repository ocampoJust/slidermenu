const slider = document.querySelector('.slider');

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul');


var sectionIndex = 0;

document.querySelectorAll('.controls li').forEach(function (indicator, ind) {
  indicator.addEventListener('click', function () {
    sectionIndex = ind;
    document.querySelector('.controls .selected').classList.remove('selected');
    indicator.classList.add('selected');
    slider.style.transform = 'translate(' + (ind) * -25+'%)';
  });
});

rightArrow.addEventListener('click', function() {
  sectionIndex = (sectionIndex < 3) ? sectionIndex + 1: 0;
  document.querySelector('.controls .selected').classList.remove('selected');
  indicatorParents.children[sectionIndex].classList.add('selected');
  slider.style.transform = 'translate('+(sectionIndex) * -25+'%)';
});

leftArrow.addEventListener('click', function() {
  sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 3;
  document.querySelector('.controls .selected').classList.remove('selected');
  indicatorParents.children[sectionIndex].classList.add('selected');
  slider.style.transform = 'translate('+(sectionIndex) * -25+'%)';
});

function myFunction() {
  setInterval(function(){ 
    
sectionIndex = (sectionIndex < 3) ? sectionIndex + 1: 0;
    if (sectionIndex == 4) {

    } else {
    document.querySelector('.controls .selected').classList.remove('selected');
  indicatorParents.children[sectionIndex].classList.add('selected');
  slider.style.transform = 'translate('+(sectionIndex) * -25+'%)';
    }
  }, 8000);
}



let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = (e) => {
  initialPosition = e.pageX;
  moving = true;
  const transformMatrix = window.getComputedStyle(slider).getPropertyValue('transform');
  if (transformMatrix !== 'none') {
    transform = parseInt(transformMatrix.split(',')[4].trim());
  }
}

const gestureMove = (e) => {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    console.log(diff);
    slider.style.transform = `translateX(${transform + diff}px)`;  
    if (diff < -25) {
      //slider.style.transform = `translateX(-25%)`;
       sectionIndex = (sectionIndex < 3) ? sectionIndex + 1: 0;
      document.querySelector('.controls .selected').classList.remove('selected');
      indicatorParents.children[sectionIndex].classList.add('selected');
      slider.style.transform = 'translate('+(sectionIndex) * -25+'%)';
    } else if (diff > 27) {
      sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 3;
  document.querySelector('.controls .selected').classList.remove('selected');
  indicatorParents.children[sectionIndex].classList.add('selected');
  slider.style.transform = 'translate('+(sectionIndex) * -25+'%)';
    }
  }
};

const gestureEnd = (e) => {
  moving = false;
}

if (window.PointerEvent) {
  slider.addEventListener('pointerdown', gestureStart);

  slider.addEventListener('pointermove', gestureMove);

  slider.addEventListener('pointerup', gestureEnd);  
} else {
  slider.addEventListener('touchdown', gestureStart);

  slider.addEventListener('touchmove', gestureMove);

  slider.addEventListener('touchup', gestureEnd);  
  
  slider.addEventListener('mousedown', gestureStart);

  window.addEventListener('mousemove', gestureMove);

  window.addEventListener('mouseup', gestureEnd);  

}