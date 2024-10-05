// COUNTDOWN CODE:
let interval;

function startCountdown() {
  // Clear existing interval
  if (interval) {
    clearInterval(interval);
  }

  // Get the user input value
  const dateInput = document.getElementById("dateInput").value;

  if (!dateInput) {
    alert("Please enter a valid date and time.");
    return;
  }

  countdownTimer(dateInput);
}

// Countdown
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
      clearInterval(interval);
      return;
    }


    // Time Calculations
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  interval = setInterval(updateTimer, 1000);
  updateTimer(); 
}
