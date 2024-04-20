/* -------------------------------------------------------------------------- */
/*                                   TOGGLE                                   */
/* -------------------------------------------------------------------------- */
const body = document.querySelector('body');
const toggle = document.querySelector('.toggle-input');
const calc = document.querySelector('.calculator');
const triangle = document.querySelector('.expandToggle > svg #triangle');
const initialState = localStorage.getItem('toggleState') == 'true';
let boxShadowColor = document.querySelector('.calculator-grid').dataset.boxShadowColor;
toggle.checked = initialState;
calc.classList.toggle('light', !initialState); // Invert the initialState for light mode
body.classList.toggle('light', !initialState);

if(calc.classList.contains('light')){
  document.querySelector('#backlit-image').innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><title>sun_line</title><g id='sun_line' fill='none' fill-rule='nonzero'><path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z'/><path fill='#09244BFF' d='M12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm6.364-2.05.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-12.728 0a1 1 0 0 1 1.497 1.32l-.083.094-.707.707a1 1 0 0 1-1.497-1.32l.083-.094.707-.707ZM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-8 3a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM4.929 4.929a1 1 0 0 1 1.32-.083l.094.083.707.707a1 1 0 0 1-1.32 1.497l-.094-.083-.707-.707a1 1 0 0 1 0-1.414Zm14.142 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z'/></g></svg>";  
}

toggle.addEventListener('change', function() {
  const isChecked = toggle.checked;
  localStorage.setItem('toggleState', isChecked);
  
  calc.classList.toggle('light', !isChecked);
  body.classList.toggle('light', !isChecked);

  buttonColorElements.forEach(element => {
    if(document.querySelector('.calculator-grid').classList.contains('backlit-switch')){
      element.style.color = document.querySelector('.calculator-grid').dataset.boxShadowColor;
      document.querySelector('.calculator svg path:nth-of-type(2)').style.fill = document.querySelector('.calculator-grid').dataset.boxShadowColor;
    }
    else{
      if(document.querySelector('.calculator').classList.contains('light')){
        element.style.color = 'black';
        document.querySelector('.calculator svg path:nth-of-type(2)').style.fill = 'black';
      }
      else{
        element.style.color = 'white';
        document.querySelector('.calculator svg path:nth-of-type(2)').style.fill = 'white';
      }
    }
  })


});

let isToggleActive = false;
function setToggleHeight() {
  var viewportHeight = window.innerHeight;
  var wrapper = document.querySelector('.wrapper');
  var customizer = document.querySelector('.customizer');
  if (isToggleActive) {
     // Set the height when the toggle is active
     wrapper.style.height = viewportHeight - 150 + 'px';
     customizer.style.maxHeight = viewportHeight - 475 + 'px';
  } else {
     // Reset the height when the toggle is not active
     wrapper.style.height = '50px'; // Or set to a specific height if needed
     customizer.style.maxHeight = 'none';
  }
 }
 
 // Event listener for the toggle
 document.querySelector('.expandToggle > svg #triangle').addEventListener('click', function() {
  isToggleActive = !isToggleActive; // Toggle the flag
  setToggleHeight(); // Adjust the height immediately
 
  // Conditionally add or remove the window resize listener
  if (isToggleActive) {
     window.addEventListener('resize', setToggleHeight);
  } else {
     window.removeEventListener('resize', setToggleHeight);
  }
 });

 /* ------------------------------------------------------------------------- */
 /*                                 CATEGORIES                                */
 /* ------------------------------------------------------------------------- */
function clearAllCategories(){
  const categoryContents = document.querySelectorAll('.customizer > nav');
  categoryContents.forEach(category => {
    category.style.display = 'none';
  })
}
clearAllCategories();
const categories = document.querySelectorAll('.category');
categories.forEach((category,index) => {
  category.addEventListener('click', () => {
    clearAllCategories();
    const targetCategory = document.querySelector(`.customizer > nav:nth-child(${index+1})`);
    targetCategory.style.display = 'flex';
  })
})
/* -------------------------------------------------------------------------- */
/*                              CALCULATOR COLORS                             */
/* -------------------------------------------------------------------------- */

const raisedKeyboard = document.querySelector('#keycapType #raised');
const flatKeyboard = document.querySelector('#keycapType #flat');
console.log(raisedKeyboard);
raisedKeyboard.addEventListener('click', () => {
  calc.classList.add('raised');
})
flatKeyboard.addEventListener('click', () => {
  calc.classList.remove('raised');
})
function clearColorClasses(colorTarget){
  calc.classList.forEach(calcClass => {
    // Check if colorTarget is provided and if the class is not the same as the clicked color's class
    if (!colorTarget || (colorTarget && calcClass !== colorTarget.className)) {
      // Also ensure the class is not 'calculator' or 'light'
      if (calcClass !== 'calculator' && calcClass !== 'light' && calcClass !== 'raised') {
        calc.classList.remove(calcClass);
      }
    }
  });
}

const calculatorColors = document.querySelectorAll('#calculator-colors > div:not(:first-child)');
calculatorColors.forEach(colors => {
  colors.addEventListener('click', () => {
    clearColorClasses(colors);
    calc.classList.toggle(colors.className);
  })
})
document.querySelector('#calculator-colors > .reset').addEventListener('click', () => {
  clearColorClasses();
})

/* -------------------------------------------------------------------------- */
/*                                   MASCOTS                                  */
/* -------------------------------------------------------------------------- */
const mascots = document.querySelectorAll('#mascots > svg');
mascots.forEach(mascot => {
  mascot.addEventListener('click', () => {
    document.querySelector('#backlit-image').innerHTML = mascot.outerHTML; 
    //remember you are replacing the entire svg element, so you must querySelect the new svg
    if(document.querySelector('.calculator-grid').classList.contains('backlit-switch')){
      document.querySelector('.calculator svg path:nth-of-type(2)').style.fill = document.querySelector('.calculator-grid').dataset.boxShadowColor;
    }
    else if(document.querySelector('.calculator').classList.contains('light')){
      document.querySelector('.calculator svg path:nth-of-type(2)').style.fill = 'black';
    }
    else{
      document.querySelector('.calculator svg path:nth-of-type(2)').style.fill = 'white';
    }
  })
})

/* -------------------------------------------------------------------------- */
/*                               BACKLIT COLORS                               */
/* -------------------------------------------------------------------------- */
const backlit = document.querySelectorAll('#backlit-colors > div');
const backlitElements = document.querySelectorAll('.backlit-color');
const buttonColorElements = document.querySelectorAll('button i');

backlit.forEach(color => {
  color.addEventListener('click', () => {
    const colorName = getComputedStyle(color).backgroundColor;
    backlitElements.forEach(element => { //setting our box shadow color
      if(document.querySelector('.calculator-grid').classList.contains('backlit-switch')){
        element.style.boxShadow = `0 0 9px 6px ${colorName}`;
        buttonColorElements.forEach(element => {
          element.style.color = colorName;
        })
        document.querySelector('.calculator svg path:nth-of-type(2)').style.fill = colorName;
      }
      document.querySelector('.calculator-grid').dataset.boxShadowColor = colorName;
      let boxShadowColor = document.querySelector('.calculator-grid').dataset.boxShadowColor;
    })
  })
})

/* -------------------------------------------------------------------------- */
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

// Get the current year
const currentYear = new Date().getFullYear();

// Update the year in the footer
document.getElementById("current-year").textContent = currentYear;


/* -------------------------------------------------------------------------- */
/*                                MISCELLANEOUS                               */
/* -------------------------------------------------------------------------- */
window.onerror = function() {
  localStorage.clear();
  // Optionally, reload the page or handle the error in another way
};