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

    // Create close button for the new list item
    createCloseButton(li);

    // Clear input fields
    document.getElementById("myInput").value = "";
    document.getElementById("taskStart").value = "";
    document.getElementById("taskEnd").value = "";
}
