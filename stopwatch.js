// Dropdown Menu
function reveal(id) {
    const element = document.getElementById(id);
    element.style.display = element.style.display == "none" ? "" : "none";
  }
  
  //STOPWATCH
  //variables
  let timePassed = 0;
  let timerInterval = null;
  let isPaused = false;
  // HTML Setup
  document.getElementById("stopwatch").innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    )}</span>
  </div>
  `;
  
  // Timer Functions
  function startTimer() {
    timerInterval = setInterval(() => {
      // Only increment timePassed if not paused
      if (!isPaused) {
        timePassed += 1;
      }
      document.getElementById("base-timer-label").innerHTML =
        formatTime(timePassed);
      setCircleDasharray();
    }, 1000);
  
    // Add event listener for "Pause" button after the timer is started
    document.getElementById("pauseTimer").addEventListener("click", function () {
      clearInterval(timerInterval); // Pause the timer
      isPaused = true; // Set pause state flag
    });
  
    // Add event listener for "Reset" button after the timer is started
    document.getElementById("resetTimer").addEventListener("click", function () {
      clearInterval(timerInterval);
      timePassed = 0;
      isPaused = false; // Reset pause state
      updateTimerDisplay(); // Update the display with the initial timeLeft
    });
  }
  function onTimesUp() {
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
  // Pause Timer
  document.getElementById("pauseTimer").addEventListener("click", function () {
    clearInterval(timerInterval);
    isPaused = true; // Set pause state flag
  });
  // Resume Timer
  document.getElementById("resumeTimer").addEventListener("click", function () {
    isPaused = false;
    startTimer(); // Restart the timer
  });
  // Reset Timer
  document.getElementById("resetTimer").addEventListener("click", function () {
    clearInterval(timerInterval);
    timePassed = 0;
    isPaused = false;
    updateTimerDisplay(); // Update the display with the initial timeLeft
  });
  // Form Event Listener
  document.getElementById("frm1").addEventListener("submit", function (event) {
    submitTime(); // Call submitTime directly without preventing default
  });
  // Update Timer Display
  function updateTimerDisplay() {
    // Add the updateTimerDisplay function
    document.getElementById("base-timer-label").innerHTML = formatTime(timePassed);
  }
