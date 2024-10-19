// Timer Constants
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
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
let screenTimeLeft = 0;
let breakTimeLeft = 0;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.normal.color;
let SCREEN_TIME_LIMIT = 1200; 
let BREAK_TIME_LIMIT = 300; 
let isBreakTime = false; // Track whether it's break time

// HTML Setup for Screen Time Timer
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
    screenTimeLeft
  )}</span>
</div>
`;

// HTML Setup for Break Time Timer
document.getElementById("breakTimeTimer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="break-timer-path-remaining"
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
  <span id="break-timer-label" class="base-timer__label">${formatTime(
    breakTimeLeft
  )}</span>
</div>
`;

// Format time function
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

// Set remaining path color based on thresholds
function setRemainingPathColor(timeLeft, elementId) {
  const { alert, warning, normal } = COLOR_CODES;
  const element = document.getElementById(elementId);
  if (timeLeft <= alert.threshold) {
    element.classList.remove(warning.color);
    element.classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    element.classList.remove(normal.color);
    element.classList.add(warning.color);
  }
}

// Calculate time fraction for circle dasharray
function calculateTimeFraction(timeLeft, limit) {
  const rawTimeFraction = timeLeft / limit;
  return rawTimeFraction - (1 / limit) * (1 - rawTimeFraction);
}

// Set circle dasharray based on time remaining
function setCircleDasharray(timeLeft, elementId) {
  const circleDasharray = `${(calculateTimeFraction(timeLeft, isBreakTime ? BREAK_TIME_LIMIT : SCREEN_TIME_LIMIT) * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document.getElementById(elementId).setAttribute("stroke-dasharray", circleDasharray);
}

// Start Timer for Screen Time and Break Time
function startTimer() {
  if (timerInterval !== null) {
    // If a timer is already running, do nothing to prevent double speed
    return;
  }

  timerInterval = setInterval(() => {
    if (!isBreakTime) {
      // SCREEN TIME CODE
      screenTimeLeft = SCREEN_TIME_LIMIT - timePassed;
      timePassed += 1;
      document.getElementById("base-timer-label").innerHTML = formatTime(screenTimeLeft);
      setCircleDasharray(screenTimeLeft, "base-timer-path-remaining");

      if (screenTimeLeft <= ALERT_THRESHOLD) {
        setRemainingPathColor(screenTimeLeft, "base-timer-path-remaining");
        if (screenTimeLeft === 0) {
          clearInterval(timerInterval);
          timerInterval = null; // Reset timerInterval
          onScreenTimeUp();
          startBreakTimeTimer(); // Switch to break time
        }
      } else if (screenTimeLeft <= WARNING_THRESHOLD) {
        setRemainingPathColor(screenTimeLeft, "base-timer-path-remaining");
      }
    } else {
      // BREAK TIME CODE
      breakTimeLeft = BREAK_TIME_LIMIT - timePassed;
      timePassed += 1;
      document.getElementById("break-timer-label").innerHTML = formatTime(breakTimeLeft);
      setCircleDasharray(breakTimeLeft, "break-timer-path-remaining");

      if (breakTimeLeft <= ALERT_THRESHOLD) {
        setRemainingPathColor(breakTimeLeft, "break-timer-path-remaining");
        if (breakTimeLeft === 0) {
          clearInterval(timerInterval);
          timerInterval = null; // Reset timerInterval
          onBreakTimeUp(); // End break time
        }
      } else if (breakTimeLeft <= WARNING_THRESHOLD) {
        setRemainingPathColor(breakTimeLeft, "break-timer-path-remaining");
      }
    }
  }, 1000);

  // Add event listener for "Reset" button after the timer is started
  document.getElementById("resetTime").addEventListener("click", function () {
    window.location.reload();
  });
}

// When break time starts
function startBreakTimeTimer() {
  isBreakTime = true;
  timePassed = 0; // Reset time passed
  startTimer(); // Start BREAK TIME
}

const audio = document.getElementById("alarmAudio");
// When break time is over
function onBreakTimeUp() {
  audio.play();
  alert("Break time is over! Time to resume screen time or rest.");
}

// When screen time is over
function onScreenTimeUp() {
  audio.play();
  alert("Screen time is over! Help your eyes out by taking a break.");
}

// Submit Time Function 
function submitTime() {
  const screenTimeInput = parseInt(document.getElementById("inputScreenTime").value) || 0;
  const breakTimeInput = parseInt(document.getElementById("inputBreakTime").value) || 0;

  function screenTooLong() {
    alert("It is unhealthy to have a screen time of more than 60 minutes at a time. Consider having multiple rounds of screen time instead.");
  }

  function minutesTooShort() {
    alert("Please enter a positive number for minutes.");
  }

  // Validation
  if (screenTimeInput > 59) {
    screenTooLong();
  } else if (screenTimeInput < 0 || breakTimeInput < 0) {
    minutesTooShort();
  } else {
    // Convert times to seconds
    SCREEN_TIME_LIMIT = screenTimeInput * 60;
    BREAK_TIME_LIMIT = breakTimeInput * 60;
    screenTimeLeft = SCREEN_TIME_LIMIT;
    breakTimeLeft = BREAK_TIME_LIMIT;

    // Update initial timer displays
    document.getElementById("base-timer-label").innerHTML = formatTime(screenTimeLeft);
    document.getElementById("break-timer-label").innerHTML = formatTime(breakTimeLeft);

    // Start the timer
    startTimer();
  }
}
