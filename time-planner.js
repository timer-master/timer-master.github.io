// Create a "close" button and append it to each list item
function createCloseButton(listItem) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    listItem.appendChild(span);

    // Click on a close button to hide the current list item
    span.onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
        document.getElementById("countdownTimer").style.display="none";
    };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener("click", function (ev) {
    if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
    }
}, false);

// Convert time string (24-hour) to 12-hour format with AM/PM
function convertTo12HourFormat(timeString) {
    var [hour, minute] = timeString.split(":");
    hour = parseInt(hour);
    var period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return hour + ":" + minute + " " + period;
}

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
let TIME_LIMIT = 0;

// HTML Setup for Timer
function setupTimer() {
    document.getElementById("countdownTimer").style.display="block";
    document.getElementById("countdownTimer").innerHTML = `
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
      <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
    </div>
  `;
  
}

// Timer Functions
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft = TIME_LIMIT - timePassed;

        if (timeLeft <= 0) {
            onTimesUp();
            return;
        }

        timePassed += 1;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();

        if (timeLeft <= ALERT_THRESHOLD) {
            setRemainingPathColor(timeLeft);
        } else if (timeLeft <= WARNING_THRESHOLD) {
            setRemainingPathColor(timeLeft);
        }
    }, 1000);
}

function onTimesUp() {
    var audio = document.getElementById("alarmAudio");
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
    const remainingPath = document.getElementById("base-timer-path-remaining");

    if (timeLeft <= ALERT_THRESHOLD) {
        console.log("Setting color to red");
        remainingPath.classList.remove("orange", "green");
        remainingPath.classList.add("red");
    } else if (timeLeft <= WARNING_THRESHOLD) {
        console.log("Setting color to orange");
        remainingPath.classList.remove("green");
        remainingPath.classList.add("orange");
    } else {
        console.log("Setting color to green");
        remainingPath.classList.remove("orange", "red");
        remainingPath.classList.add("green");
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var taskStart = document.getElementById("taskStart").value; // Date and Time
    var taskEnd = document.getElementById("taskEnd").value; // Date and Time

    // Clear input fields
    document.getElementById("myInput").value = "";
    document.getElementById("taskStart").value = "";
    document.getElementById("taskEnd").value = "";

    
    // Close button
    createCloseButton(li);

    // Validate input fields
    if (!inputValue || !taskStart || !taskEnd) {
        alert("All fields are required.");
        return;
    }

    var startDateTime = new Date(taskStart);
    var endDateTime = new Date(taskEnd);

    if (endDateTime <= startDateTime) {
        alert("The end date and time must be after the start date and time.");
        return;
    }

    var durationInMilliseconds = endDateTime - startDateTime;
    const duration = durationInMilliseconds / 1000; // In seconds

    if (duration > 86400) { // 24 hours in seconds
        alert("Tasks should generally be completed in less than 24 hours.");
        return;
    }

    var taskStart12Hour = convertTo12HourFormat(startDateTime.toTimeString().slice(0, 5));
    var taskEnd12Hour = convertTo12HourFormat(endDateTime.toTimeString().slice(0, 5));

    var t = document.createElement("span");
    t.innerHTML = `<b>${inputValue}</b><span style="margin-left: 30px;"><b>Start: </b>${taskStart12Hour}</span><span style="margin-left: 30px;"><b>End: </b>${taskEnd12Hour}</span>`;
    li.appendChild(t);

    // Timer icon
    var timerIcon = document.createElement("span");
    timerIcon.className = "material-symbols-outlined timer-icon";
    timerIcon.textContent = "timer";
    li.appendChild(timerIcon);
    document.getElementById("myUL").appendChild(li);

    // Timer icon click event
    timerIcon.onclick = function () {
        TIME_LIMIT = duration;
        timePassed = 0; // Reset time passed for each new timer
        setupTimer(); // Setup the timer interface
        startTimer();
    };
}
