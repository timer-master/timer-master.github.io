// Target Date
var countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();

// Update Count
var x = setInterval(function() {

  var now = new Date().getTime();
  var distance = countDownDate - now;

  // Time calculations 
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display result
  document.getElementById("christmas").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If time's up:
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("christmas").innerHTML = "EXPIRED";
  }
}, 1000);
