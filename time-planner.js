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
    var taskStart = document.getElementById("taskStart").value;
    var taskEnd = document.getElementById("taskEnd").value;

  
    // Display task text and time
    if (inputValue === '') {
      alert("You must describe your task.");
      return; 
    } 
    if (taskStart === '') {
      alert("You must set a start time.");
      return;
    }
    if (taskEnd === '') {
        alert("You must set an end time.");
        return; 
      }
  
    var t = document.createTextNode(inputValue + "  Start: " + taskStart + "  End: " + taskEnd);
    li.appendChild(t);
    
    document.getElementById("myUL").appendChild(li);
    
    // Create close button for the new list item
    createCloseButton(li);
    
    // Timer icon
    var alarmIcon = document.createElement("span");
    alarmIcon.className = "material-symbols-outlined alarm-icon";
    alarmIcon.textContent = "alarm";
    li.appendChild(alarmIcon);
    
    // Start Timer
  
    // Clear input fields
    document.getElementById("myInput").value = "";
    document.getElementById("taskStart").value = "";
    document.getElementById("taskEnd").value = "";
  }
  
  