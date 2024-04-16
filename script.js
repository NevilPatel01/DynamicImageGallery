
// @Author: Nevil Patel, 000892482

window.addEventListener('load', function() {
  // Arrays is created to store all three themes images
  // Image Source: https://pngtree.com/
  var themeImage = [
    ['images/food1.png', 'images/food2.png', 'images/food3.png'],
    ['images/animal1.png', 'images/animal2.png', 'images/animal3.png'],
    ['images/cartoon1.png', 'images/cartoon2.png', 'images/cartoon3.png']
  ];

  // imgContainer is selected bu Id and store in the same name variable
  var imgContainer = document.getElementById('imgContainer');
  
  // Function 'showRandomImages' is created to choose randomly image from the array (themeImage)
  function showRandomImages() {
    var randomImg = [];
    var i = 0;
    while (i < 3) {
      var selectedTheme = Math.floor(Math.random() * themeImage.length);
      var selectedImage = Math.floor(Math.random() * themeImage[selectedTheme].length);
      randomImg.push(themeImage[selectedTheme][selectedImage]);
      i++;
    }
    var imageTags = '';
    var j = 0;
    while (j < randomImg.length) {
      imageTags += '<img src="' + randomImg[j] + '" onclick="doAnimation(event)">';
      j++;
    }
    imgContainer.innerHTML = imageTags;
  }
  
  
  // It will show Random Images
  showRandomImages();
  
  // Function 'doAnimation' to handle the image click event and animate when clicked
  function doAnimation(event) {
    var target = event.target.closest('img');
    if (target) {
      target.classList.remove('round');
      setTimeout(function() {
        target.classList.add('round');
        var randomselectedTheme = Math.floor(Math.random() * themeImage.length);
        var randomselectedImage = Math.floor(Math.random() * themeImage[randomselectedTheme].length);
        target.src = themeImage[randomselectedTheme][randomselectedImage];
        resetTimer();
        updateCounter();
      }, 0);
    }
  }

  // It will Update the event listener for image click using event delegation
  imgContainer.addEventListener('click', doAnimation);

  
  // It will update Input Time 
  var renewTimeInput = document.getElementById('renewTime');
  
  // Function 'inputChange' to change the input box between integer 500 to 10000
  function inputChange() {
    var renewTime = parseInt(renewTimeInput.value);
    if (!isNaN(renewTime) && renewTime >= 500 && renewTime <= 10000) {
      resetTimer();
    } else {
      renewTimeInput.value = '5000';
      alert('Please enter a number between 500 and 10000.');
    }
  }
  
  // It will Update the event listener to change Input using event delegation
  renewTimeInput.addEventListener('change', inputChange);
  
  // Variable is created to store the interval timer
  var timerInterval;
  
  // Function 'startTimer' to start the timer 
  function startTimer() {
    var time = parseInt(renewTimeInput.value);
    timerInterval = setInterval(function() {
      time -= 100;
      if (time < 0) {
        showRandomImages();
        time = parseInt(renewTimeInput.value);
      }
      updateTime(time);
    }, 100);
  }
  
  // Function 'resetTimer' to reset the timer
  function resetTimer() {
    clearInterval(timerInterval);
    updateTime(parseInt(renewTimeInput.value));
    startTimer();
  }
  
  // It will store timer id in timer 
  var timer = document.getElementById('timer');
  
  // Function to update the timer display
  function updateTime(time) {
    timer.textContent = (time / 1000).toFixed(1);
    updateTimeColor(time);
  }
  
  // Function to update the timer color based on remaining time
  function updateTimeColor(time) {
    if (time >= 2500) {
      timer.style.color = 'white';
      timer.style.backgroundColor = 'green';
    } else if (time >= 1000) {
      timer.style.color = 'black';
      timer.style.backgroundColor = 'yellow';
    } else {
      timer.style.color = 'white';
      timer.style.backgroundColor = 'red';
    }
  }
  
  // imgchange id is stored in counterUpdate variable
  var counterUpdate = document.getElementById('imgchange');
  
  // Variable to store the image change counter
  var imageChangeCounter = 0;
  
  // Function 'updateCounter' to update the image change counter
  function updateCounter() {
    imageChangeCounter++;
    counterUpdate.textContent = 'Image Changes: ' + imageChangeCounter;
  }
  
  // randomButton id is stored in randomButton variable 
  var randomButton = document.getElementById('randomButton');
  
  // Function 'randomizeButton' to handle randomize button click event
  function randomizeButton() {
    showRandomImages();
    resetTimer();
    imageChangeCounter += 3;
    counterUpdate.textContent = 'Image Changes: ' + imageChangeCounter;
  }
  
  // Add event listener for randomize button click using event delegation
  randomButton.addEventListener('click', randomizeButton);
  
  // Start the initial timer
  startTimer();
});
