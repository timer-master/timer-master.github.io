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
    };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
      }
    },
    false
);

// Convert time string (24-hour) to 12-hour format with AM/PM
function convertTo12HourFormat(timeString) {
    var [hour, minute] = timeString.split(":");
    hour = parseInt(hour);

    var period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return hour + ":" + minute + " " + period;
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var taskStart = document.getElementById("taskStart").value; // Date and Time
    var taskEnd = document.getElementById("taskEnd").value;     // Date and Time

    // Validate input fields
    if (inputValue === "") {
      alert("You must describe your task.");
      return;
    }
    if (taskStart === "") {
      alert("You must set a start date and time.");
      return;
    }
    if (taskEnd === "") {
      alert("You must set an end date and time.");
      return;
    }

    // Convert the date and time strings into Date objects
    var startDateTime = new Date(taskStart);
    var endDateTime = new Date(taskEnd);

    // Check if the end time is after the start time
    if (endDateTime <= startDateTime) {
      alert("The end date and time must be after the start date and time.");
      return;
    }

    // Calculate the duration in hours
    var durationInMilliseconds = endDateTime - startDateTime;
    var durationInHours = durationInMilliseconds / (1000 * 60 * 60);

    // Check if the duration is less than 24 hours
    if (durationInHours > 24) {
      alert("Tasks should generally be completed in less than 24 hours. To set long-term tasks, use our To Do feature.");
      return;
    }

    // Convert the times to 12-hour format
    var taskStart12Hour = convertTo12HourFormat(startDateTime.toTimeString().slice(0, 5));
    var taskEnd12Hour = convertTo12HourFormat(endDateTime.toTimeString().slice(0, 5));

    // Display task with start and end times (without date)
    var t = document.createElement("span");
    t.innerHTML =
      "<b>" +
      inputValue +
      "</b>" +
      '<span style="margin-left: 30px;"><b>Start: </b>' +
      taskStart12Hour +
      "</span>" +
      '<span style="margin-left: 30px;"><b>End: </b>' +
      taskEnd12Hour +
      "</span>";
    li.appendChild(t);

    // Timer icon
    var timerIcon = document.createElement("span");
    timerIcon.className = "material-symbols-outlined timer-icon";
    timerIcon.textContent = "timer";
    li.appendChild(timerIcon);
    document.getElementById("myUL").appendChild(li);

    // Assign countdown function to the alarm icon click event
    timerIcon.onclick = function() {
        timer();
    };

    //Timer Function
    function timer() {
        
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
        let TIME_LIMIT = 0; // Initialize TIME_LIMIT
        let isPaused = false;
        // HTML Setup
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
        <span id="base-timer-label" class="base-timer__label">${formatTime(
            timeLeft
        )}</span>
        </div>
        `;

        // Timer Functions
        function startTimer() {
            timerInterval = setInterval(() => {
            timeLeft = TIME_LIMIT - timePassed;
            // Only increment timePassed if not paused
            if (!isPaused) {
            timePassed += 1;
            }
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
        
            // Add event listener for "Pause" button after the timer is started
            document.getElementById("pauseTimer").addEventListener("click", function () {
            clearInterval(timerInterval); // Pause the timer
            isPaused = true; // Set pause state flag
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

            // Submit Time and Initialize Timer
            function submitTime() {
                // Use the previously calculated duration
                TIME_LIMIT = durationInMilliseconds / 1000; // Convert milliseconds to seconds
                timeLeft = TIME_LIMIT; // Update timeLeft
                startTimer(); // Start the timer
    }
                // // Change this part so that it gets the time from the above code (duration)
                // var hours = parseInt(document.getElementById("inputBoxHours").value) || 0;
                // var minutes = parseInt(document.getElementById("inputBoxMinutes").value) || 0;
                // var seconds = parseInt(document.getElementById("inputBoxSeconds").value) || 0;
                // // Calculate total seconds
                // var totalSeconds = hours * 3600 + minutes * 60 + seconds;
                // document.getElementById("base-timer-label").innerHTML =
                // formatTime(totalSeconds);
                // console.log("Total seconds:", totalSeconds);
                // // Update TIME_LIMIT
                // TIME_LIMIT = totalSeconds; // Update TIME_LIMIT
                
                // timeLeft = TIME_LIMIT; // Update timeLeft
                // startTimer(); // Start timer

            }
            // Pause Timer
            document.getElementById("pauseTimer").addEventListener("click", function () {
            clearInterval(timerInterval);
            isPaused = true; // Set pause state flag
            });

            // Form Event Listener
            document.getElementById("submitInputBox").addEventListener("click", function () {
            isPaused=false;
            if(timeLeft==0){
                submitTime(); // Call submitTime directly without preventing default
            }
            else{
                startTimer();
            }
            
            });
            // Update Timer Display
            function updateTimerDisplay() {
            // Add the updateTimerDisplay function
            document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
            }
    }

    // Create close button for the new list item
    createCloseButton(li);

    // Clear input fields
    document.getElementById("myInput").value = "";
    document.getElementById("taskStart").value = "";
    document.getElementById("taskEnd").value = "";
}
