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
  var t = document.createTextNode(inputValue + " - Complete by: " + deadlineValue);
  li.appendChild(t);

  if (inputValue === '') {
    alert("You must describe your task.");
  } else if (deadlineValue === '') {
    alert("You must set a deadline. This helps you stay on track.");
  } else {
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
      countdown(deadlineValue);
    };
    // Countdown function
  function countdown(targetDate) {
    alert("You will recieve an alarm reminder at your task deadline.");
    let interval;

    // Start countdown
    function startCountdown() {
      // Clear existing interval
      if (interval) {
        clearInterval(interval);
      }

      countdownTimer(targetDate);
    }

    // Countdown timer
    function countdownTimer(targetDate) {
      var countdownElement = document.getElementById("countdown");
      var target = new Date(targetDate).getTime();

      function updateTimer() {
        var now = new Date().getTime();
        var distance = target - now;

        var audio = document.getElementById("alarmAudio");
        // When Time's up
        if (distance <= 0) {
          countdownElement.innerHTML = "It's already " + targetDate + "!";
          audio.play();
          alert("Deadline Reached!");
          clearInterval(interval);
          return;
        }

        // Time calculations
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      interval = setInterval(updateTimer, 1000);
      updateTimer(); 
    }

    // Start the countdown
    startCountdown();
    }
  }

  document.getElementById("myInput").value = "";
  document.getElementById("taskTime").value = "";
}


