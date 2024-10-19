//COUNTDOWN TIMER

// Timer Constants
const FULL_DASH_ARRAY = 283;
// Timer State Thresholds
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
// Timer Color Codes
const COLOR_CODES = {
  normal: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};
// Timer Variables
let timePassed = 0;
let timeLeft = 0;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.normal.color;
let TIME_LIMIT = 1200; // Initialize TIME_LIMIT
// HTML Setup
document.getElementById("screenTimeTimer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

document.getElementById("breakTimeTimer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

// Timer Functions
function startTimer() {
    timerInterval = setInterval(() => {
    timeLeft = TIME_LIMIT - timePassed;
    timePassed += 1;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
     setCircleDasharray();
    if (timeLeft <= ALERT_THRESHOLD) {
      setRemainingPathColor(timeLeft); // Call setRemainingPathColor only when necessary
      if (timeLeft === 0) {
        onTimesUp();
      }
     } else if (timeLeft <= WARNING_THRESHOLD) {
      setRemainingPathColor(timeLeft);
     }
  }, 1000);
  
  
    // Add event listener for "Reset" button after the timer is started
    document.getElementById("resetTime").addEventListener("click", function () {
      window.location.reload();
    });
  }
var audio = document.getElementById("alarmAudio"); 

function onTimesUp() {
  audio.play();
  clearInterval(timerInterval);
}
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
function setRemainingPathColor(timeLeft) {
  const { alert, warning, normal } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(normal.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
// Error Alerts  
function screenTooLong() {
  alert("ERROR. It is not advise to have a screen time more than 60 minutes at a time.");
}
function minutesTooShort() {
  alert("ERROR. Please do not input a negative number.");
}
function breakTooLong() {
  alert("ERROR. Please input a number from 0 to 59.");
}

// Submit Time and Initialize Timer
function submitTime() {
  // Get values from input
  if (document.getElementById("inputScreenTime").value > 59) {
    screenTooLong();
  }
  else if (document.getElementById("inputScreenTime").value < 0) {
    minutesTooShort();
  }
  else if (document.getElementById("inputBreakTime").value < 0) {
    minutesTooShort();
  }
  else if (document.getElementById("inputBreakTime").value > 59) {
    breakTooLong();
  }

  else {
    var screenMinutes = parseInt(document.getElementById("inputScreenTime").value) || 0;
    var breakMinutes = parseInt(document.getElementById("inputBreakTime").value) || 0;
    // Calculate total seconds
    var totalSeconds = screenMinutes * 60;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(totalSeconds);
    console.log("Total seconds:", totalSeconds);
    // Update TIME_LIMIT
    TIME_LIMIT = totalSeconds; // Update TIME_LIMIT
    timeLeft = TIME_LIMIT; // Update timeLeft
    startTimer(); // Start timer
  // }
}
// Reset Timer
document.getElementById("resetTime").addEventListener("click", function () {
  window.location.reload();
});
// Form Event Listener
document.getElementById("submitTime").addEventListener("click", function () {
  if(timeLeft==0){
    submitTime(); 
  }
  else{
    startTimer();
  }
  
});
// Update Timer Display
function updateTimerDisplay() {
  // Add the updateTimerDisplay function
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
}}