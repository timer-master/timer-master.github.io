// Create a "close" button and append it to each list item
function createCloseButton(listItem) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  listItem.appendChild(span);

  // Click on a close button to hide the current list item
  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var deadlineValue = document.getElementById("taskTime").value;

  // Display task text and time
  if (inputValue === '') {
    alert("You must describe your task.");
    return; // Exit if input is invalid
  } 
  if (deadlineValue === '') {
    alert("You must set a deadline. This helps you stay on track.");
    return; // Exit if input is invalid
  }

  var t = document.createTextNode(inputValue + " - Complete by: " + deadlineValue);
  li.appendChild(t);
  
  document.getElementById("myUL").appendChild(li);
  
  // Create close button for the new list item
  createCloseButton(li);
  
  // Alarm icon
  var alarmIcon = document.createElement("span");
  alarmIcon.className = "material-symbols-outlined alarm-icon";
  alarmIcon.textContent = "alarm";
  li.appendChild(alarmIcon);
  
  // Assign countdown function to the alarm icon click event
  alarmIcon.onclick = function() {
    countdown(deadlineValue, inputValue); // Pass inputValue to countdown
  };

  // Clear input fields
  document.getElementById("myInput").value = "";
  document.getElementById("taskTime").value = "";
}

// Countdown function, modified to accept deadlineValue and task description
function countdown(deadlineValue, inputValue) {
  alert("Alarm set. You will receive an alarm reminder at your task deadline.");
  let interval;
  let alertShown = false; 

  // Get the alarm icon element
  const alarmIcon = document.querySelector('.alarm-icon'); // Assuming it's the same icon for the task
  
  // Add the active class to the alarm icon
  alarmIcon.classList.add('active');

  // Start countdown
  function startCountdown() {
    // Clear existing interval
    if (interval) {
      clearInterval(interval);
    }

    countdownTimer(deadlineValue);
  }

  // Countdown timer
  function countdownTimer(deadlineValue) {
    var target = new Date(deadlineValue).getTime();

    updateTimer();

    // Set an interval to update the timer every second
    interval = setInterval(updateTimer, 1000); // Update every second

    function updateTimer() {
      var now = new Date().getTime();
      var distance = target - now;

      var audio = document.getElementById("alarmAudio");

      // When Time's up
      if (distance <= 0 && !alertShown) { // Check if alert has not been shown yet
        audio.play();
        clearInterval(interval);
        alert("Task deadline reached for: " + inputValue); // Include task description
        alertShown = true; // Set the flag to true after showing the alert
        
        // Remove the active class when the countdown ends
        alarmIcon.classList.remove('active'); // Remove active class after deadline
        return;
      }
    }
  }

  // Start the countdown
  startCountdown();
}
